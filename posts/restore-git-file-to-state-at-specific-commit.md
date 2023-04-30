---
title: Restore Git File to State at Specific Commit
description: Learn how to restore a Git file to its state at a specific commit.
slug: restore-git-file-to-state-at-specific-commit
meta: Learn how to implement clever lazy loading techniques in JavaScript to boost your website's performance.
---

# Restore Git File to State at Specific Commit

In this post, we'll look at how to restore a Git file to its state at a specific commit.

## Table of Contents

- [Restore Git File to State at Specific Commit](#restore-git-file-to-state-at-specific-commit)
  - [Table of Contents](#table-of-contents)
  - [Restore Git File to State at Specific Commit](#restore-git-file-to-state-at-specific-commit-1)
  - [Conclusion](#conclusion)

## Restore Git File to State at Specific Commit

To restore a Git file to its state at a specific commit, you can use the git checkout command:

```
git checkout <commit> <file>
```

For example, to restore the `index.html` file to its state at the `HEAD~1` commit, you can run the following command:

```

git checkout HEAD~1 index.html
```

## Conclusion
