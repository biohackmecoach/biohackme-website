#!/bin/bash

# BiohackMe - Easy command runner
# This script loads nvm and runs npm commands

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Run the command passed as argument
if [ $# -eq 0 ]; then
    echo "Usage: ./run.sh <command>"
    echo "Examples:"
    echo "  ./run.sh \"npm run build\""
    echo "  ./run.sh \"npm run dev\""
    echo "  ./run.sh \"npm install\""
else
    eval "$1"
fi