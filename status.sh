#!/bin/bash

for branch in $(git --no-pager branch | cut -c 3-); do
    if [ "$branch" != "master" ]; then
        echo ""
        cd "$branch" && git status && cd ..
    fi
done
