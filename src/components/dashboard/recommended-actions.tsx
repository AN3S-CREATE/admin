"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"
import { ThumbsDown, ThumbsUp, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"

export type SuggestedAction = {
  action: string;
  owner: string;
  impact: string;
  confidence: number;
  evidenceLinks: string[];
}

type RecommendedActionsProps = {
  actions: SuggestedAction[];
}

export function RecommendedActions({ actions }: RecommendedActionsProps) {
  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary"/>
            <CardTitle className="font-headline">Recommended Actions</CardTitle>
        </div>
        <CardDescription>AI-suggested actions based on recent operational data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((item, index) => (
          <div key={index} className="flex flex-col gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
            <div className="space-y-2">
              <p className="font-semibold text-sm">{item.action}</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><span className="font-medium text-foreground">Owner:</span> {item.owner}</p>
                <p><span className="font-medium text-foreground">Impact:</span> {item.impact}</p>
                <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                    <span className="font-medium text-foreground">Evidence:</span>
                    {item.evidenceLinks.map(link => (
                      <Link href={link} key={link} className="text-primary/80 hover:text-primary underline text-xs capitalize">
                        {link.split('/').pop()?.split('?')[0].replace(/-/g, ' ')}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 shrink-0">
                <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                    Confidence: {(item.confidence * 100).toFixed(0)}%
                </Badge>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-7 w-7 border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400">
                        <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7 border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400">
                        <ThumbsDown className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
