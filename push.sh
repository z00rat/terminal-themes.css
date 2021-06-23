#!/bin/bash

msg2 "status of all branches"
git --no-pager branch -v -v -a

msg2 "git push --all origin"
git push --all origin

msg2 "git push --tags"
git push --tags
