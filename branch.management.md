# branch.management.md

## list of branches without less
```sh
git --no-pager branch
```

<!-- https://stackoverflow.com/a/34100189 -->
## open empty branch on git
```sh
# new branch without any commit 
git checkout --orphan branchNameHere
# delete all files
git rm -rf .
# commit without any file
git commit --allow-empty -m "init commit of branchNameHere branch"
# go back to master 
git checkout master
```

<!-- https://www.freecodecamp.org/news/how-to-delete-a-git-branch-both-locally-and-remotely/ -->
## delete branch
```sh
# delete branch locally
git branch -d localBranchName

# delete branch remotely
git push origin --delete remoteBranchName
```

<!-- https://stackoverflow.com/a/6866485 -->
## delete last commit 
```sh
git reset --hard HEAD~1
```
