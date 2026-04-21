#!/bin/bash
# Restore context after /clear or /compact.
# Outputs the contents of any .agent-restore-context-* files in the project root.
# Each skill manages its own file lifecycle.

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"

for file in "$PROJECT_DIR"/.agent-restore-context-*; do
  [ -f "$file" ] || continue
  cat "$file"
  echo ""
done

exit 0
