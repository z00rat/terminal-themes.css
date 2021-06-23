#!/bin/bash

# https://stackoverflow.com/a/20983251
tput setaf 5
tput bold
echo "setting up worktree..."
echo ""

#
#
echo "all branches..."
tput sgr0

git --no-pager branch

echo ""

#
#
echo ""
tput setaf 5
tput bold
echo "current worktree:"
tput sgr0

git worktree list

echo ""

#
#
echo ""
tput setaf 5
tput bold
echo "adding other branches..."
tput sgr0

git worktree add json json
git worktree add css-class css-class
git worktree add css-var css-var

echo ""

#
#
echo ""
tput setaf 5
tput bold
echo "now worktree:"
tput sgr0

git worktree list

tput sgr0

tput bel
