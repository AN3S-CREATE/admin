export type RawMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
  topic?: string;
};

export type RepositoryEntry = {
  topic: string;
  date: string;
  query: string;
  response: string;
};

export type RepositoryFile = {
  fileName: string;
  content: string;
  entries: RepositoryEntry[];
};

export type RepoActivityEntry = {
  path: string;
  message: string;
  relativeTime: string;
};

export type MessageProcessingOptions = {
  groupBy?: 'topic' | 'date';
  defaultTopic?: string;
  defaultDate?: string;
  fileNamePrefix?: string;
  tableOfContentsThreshold?: number;
};

export type RepoActivityOptions = {
  fileName?: string;
  heading?: string;
};

const DEFAULT_OPTIONS: Required<MessageProcessingOptions> = {
  groupBy: 'topic',
  defaultTopic: 'Technical Discussion',
  defaultDate: 'Unknown',
  fileNamePrefix: 'project-discussions',
  tableOfContentsThreshold: 4,
};

const SYSTEM_PROMPT_PATTERNS = [
  /you are an ai assistant/i,
  /you are chatgpt/i,
  /system prompt/i,
  /please help me with/i,
  /you are an expert/i,
  /how we built it/i,
];

const GREETING_PATTERNS = [
  /^(hi|hello|hey|thanks|thank you|ok|okay|got it|sounds good|great|cool|bye)\b/i,
];

const TECHNICAL_PATTERNS = [
  /```[\s\S]*?```/,
  /`[^`]+`/,
  /\b(error|exception|stack trace|bug|fix|feature|refactor|test|deploy|build|commit|pr)\b/i,
  /\b(src|lib|components|docs|app)\/[\w\-./]+/i,
  /https?:\/\//i,
];

const TOPIC_KEYWORDS: Array<{ topic: string; pattern: RegExp }> = [
  { topic: 'Bug Fixes', pattern: /\b(bug|error|exception|fix)\b/i },
  { topic: 'Features', pattern: /\b(feature|implement|add|enhance)\b/i },
  { topic: 'Documentation', pattern: /\b(doc|documentation|readme)\b/i },
  { topic: 'Testing', pattern: /\b(test|coverage|spec)\b/i },
  { topic: 'Deployment', pattern: /\b(deploy|release|ci|cd)\b/i },
];

const cleanContent = (content: string): string => {
  const lines = content.split('\n');
  const filtered = lines.filter(line => !SYSTEM_PROMPT_PATTERNS.some(pattern => pattern.test(line)));
  return filtered.join('\n').trim();
};

const stripFiller = (content: string): string =>
  content
    .replace(/\b(i am going to be fired|i needed|i need|now|please)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

const containsTechnicalContent = (content: string): boolean =>
  TECHNICAL_PATTERNS.some(pattern => pattern.test(content));

const isGreetingOnly = (content: string): boolean =>
  GREETING_PATTERNS.some(pattern => pattern.test(content.trim()));

const isRelevantMessage = (content: string): boolean => {
  if (!content) {
    return false;
  }

  if (isGreetingOnly(content) && !containsTechnicalContent(content)) {
    return false;
  }

  return containsTechnicalContent(content) || content.length > 60;
};

const resolveDate = (timestamp: string | undefined, fallback: string): string => {
  if (!timestamp) {
    return fallback;
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return date.toISOString().split('T')[0];
};

const inferTopic = (content: string, fallback: string): string => {
  const match = TOPIC_KEYWORDS.find(({ pattern }) => pattern.test(content));
  return match?.topic ?? fallback;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const buildTableOfContents = (sections: string[]): string => {
  const entries = sections
    .map(section => `- [${section}](#${slugify(section)})`)
    .join('\n');
  return `## Table of Contents\n${entries}\n`;
};

const formatEntry = (entry: RepositoryEntry, index: number): string => {
  return [
    `### Entry ${index + 1}`,
    `**Date**: ${entry.date}`,
    '',
    `**Query**: ${entry.query}`,
    '',
    `**Response**: ${entry.response}`,
  ].join('\n');
};

const formatActivityEntry = (entry: RepoActivityEntry): string =>
  `- \\`${entry.path}\\`: ${entry.message} (_${entry.relativeTime}_)`;

export const prepareRepoActivityLog = (
  raw: string,
  options: RepoActivityOptions = {}
): RepositoryFile => {
  const fileName = options.fileName ?? 'repo-activity.md';
  const heading = options.heading ?? 'Repository Activity';
  const lines = raw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const entries: RepoActivityEntry[] = [];
  for (let index = 0; index < lines.length; index += 3) {
    const path = lines[index];
    const message = lines[index + 1];
    const relativeTime = lines[index + 2];

    if (!path || !message || !relativeTime) {
      continue;
    }

    const cleanedMessage = stripFiller(cleanContent(message));
    if (!cleanedMessage) {
      continue;
    }

    entries.push({
      path,
      message: cleanedMessage,
      relativeTime,
    });
  }

  const content = [
    `## ${heading}`,
    '',
    ...entries.map(formatActivityEntry),
  ]
    .filter(Boolean)
    .join('\n')
    .trim()
    .concat('\n');

  return {
    fileName,
    content,
    entries: entries.map(entry => ({
      topic: entry.path,
      date: entry.relativeTime,
      query: entry.path,
      response: entry.message,
    })),
  };
};

export const prepareMessagesForRepository = (
  messages: RawMessage[],
  options: MessageProcessingOptions = {}
): RepositoryFile[] => {
  const resolvedOptions = { ...DEFAULT_OPTIONS, ...options };
  const cleanedMessages = messages
    .map(message => ({
      ...message,
      content: cleanContent(message.content),
    }))
    .filter(message => message.content.length > 0);

  const entries: RepositoryEntry[] = [];
  for (let index = 0; index < cleanedMessages.length; index += 1) {
    const message = cleanedMessages[index];
    if (message.role !== 'user' || !isRelevantMessage(message.content)) {
      continue;
    }

    const response = cleanedMessages.slice(index + 1).find(next => next.role === 'assistant');
    if (!response || !isRelevantMessage(response.content)) {
      continue;
    }

    const date = resolveDate(message.timestamp ?? response.timestamp, resolvedOptions.defaultDate);
    const topic = message.topic ?? inferTopic(message.content, resolvedOptions.defaultTopic);

    entries.push({
      topic,
      date,
      query: message.content,
      response: response.content,
    });
  }

  const grouped = new Map<string, RepositoryEntry[]>();
  for (const entry of entries) {
    const key = resolvedOptions.groupBy === 'date' ? entry.date : entry.topic;
    const group = grouped.get(key) ?? [];
    group.push(entry);
    grouped.set(key, group);
  }

  return Array.from(grouped.entries()).map(([key, groupEntries]) => {
    const title = resolvedOptions.groupBy === 'date' ? `Date: ${key}` : `Topic: ${key}`;
    const header = `## ${title}`;
    const body = groupEntries.map((entry, index) => formatEntry(entry, index)).join('\n\n');
    const sections = [header, body].filter(Boolean).join('\n\n');
    const shouldIncludeToc = groupEntries.length >= resolvedOptions.tableOfContentsThreshold;
    const toc = shouldIncludeToc
      ? buildTableOfContents(groupEntries.map((_, index) => `Entry ${index + 1}`))
      : '';
    const content = [toc, sections].filter(Boolean).join('\n\n').trim() + '\n';
    const slug = slugify(key);
    const fileName = `${resolvedOptions.fileNamePrefix}-${slug || 'general'}.md`;

    return {
      fileName,
      content,
      entries: groupEntries,
    };
  });
};
