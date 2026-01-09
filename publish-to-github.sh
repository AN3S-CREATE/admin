#!/bin/bash

# This script is designed to publish your project to GitHub.
# IMPORTANT: This script is intended to be run from your LOCAL machine
# after you have downloaded the project code. It will not work inside
# the Firebase Studio environment.

# --- Configuration ---
GITHUB_USERNAME="AN3S-CREATE"
REPO_NAME="Veralogix_Smart_Mining"
GIT_REMOTE_URL="https://github.com/AN3S-CREATE/Veralogix_Smart_Mining.git"

# --- Steps ---

echo "--- Initializing Git Repository ---"
# Check if .git directory exists
if [ -d ".git" ]; then
  echo "Git repository already initialized."
else
  git init
  echo "Initialized a new Git repository."
fi

echo "--- Setting Remote URL ---"
# Check if a remote named 'origin' already exists
if git remote get-url origin > /dev/null 2>&1; then
  echo "Remote 'origin' already exists. Setting URL to the correct one."
  git remote set-url origin "${GIT_REMOTE_URL}"
else
  echo "Adding new remote 'origin'."
  git remote add origin "${GIT_REMOTE_URL}"
fi

echo "--- Preparing to Commit ---"
git add .
git branch -M main

# Check if there's anything to commit
if git diff-index --quiet HEAD --; then
    echo "No changes to commit. Working tree is clean."
else
    echo "Committing all files..."
    git commit -m "Initial commit of Veralogix Smart Mining project"
fi

echo "--- Pushing to GitHub ---"
echo "Pushing code to ${GIT_REMOTE_URL}..."
git push -u origin main

echo "--- Done! ---"
echo "Your project should now be available at https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
