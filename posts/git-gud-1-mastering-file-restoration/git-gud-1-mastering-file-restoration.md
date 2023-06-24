---
title: 'Git Gud Vol. 1: Mastering File Restoration in Git'
description: Discover how to restore a Git file back to its initial state at a specific commit. This article is the first in a series documenting techniques I've learned during the quest to improve my Git skills.
slug: git-gud-1-mastering-file-restoration
meta: Discover how to restore a Git file back to its initial state at a specific commit. This article is the first in a series documenting techniques I've learned during the quest to improve my Git skills.
date: '2023-05-26 12:00:00'
tags: [Git, Version Control, Tooling]
---

## Introduction:

Welcome to Git Gud Vol. 1, the first article a series where I document techniques I've learned during the quest to improve my Git skills. In this first entry, we'll focus on a particular issue: reverting a file back to its state when a branch was initially created. It's an issue I've encountered recently when wrapping up a branch for a pull request, realizing that some files would be better off in their original state.

This series is as much a personal journey as it is a guide. By no means am I a Git expert, but by documenting new techniques and solutions I discover, I hope to deepen my understanding and help fellow developers on similar paths.

## Finding the Ancestral Commit:

To restore the file, start by locating the commit where your branch was created. The git merge-base command helps you find the common ancestor commit of your current branch and the branch it was created from (typically main or master).

```
git merge-base <current-branch> <parent-branch>
```

Replace `<current-branch>` with your current branch name and `<parent-branch>` with the branch you branched off from. This command will return the commit hash of the common ancestor.

Alternatively, you can use git log to visually inspect the commit history and locate the branch point:

```
git log --graph --decorate --oneline <parent-branch> <current-branch>
```

## Restoring the File:

With the commit hash in hand, you can now restore the file to its state at the branch's creation. Use the git checkout command along with the commit hash and the file path you want to restore.

```
git checkout <commit-hash> -- <file-path>
```

Replace `<commit-hash>` with the hash from step 1 and `<file-path>` with the relative path of the file you want to restore. This will restore the file to the specified commit's state.

## Committing the Restored File:

After restoring the file, you'll have local changes. To keep the restored file in your current branch, commit these changes using the git add and git commit commands.

```
git add <file-path>
git commit -m "Restored <file-path> to its state at branch creation"
```

Replace `<file-path>` with the relative path of the restored file. This will create a new commit in your current branch with the restored file.

## Restoring a File to a Previous Commit:

If you want to restore a file to a specific previous commit instead of the branch creation point, you can use the same git checkout command with the desired commit hash:

```
git checkout <specific-commit-hash> -- <file-path>
```

## Conclusion:

Understanding Git is critical for developers. The steps outlined here let you revert a file back to its original state at branch creation without disrupting other changes. This knowledge helps manage version control more effectively and streamlines your workflow. Stay tuned for more posts in this series where I explore various Git techniques.
