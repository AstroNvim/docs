---
id: detached_git_worktrees
title: Detached Git Worktrees
---

Some users prefer tracking their dotfiles in bare git repos which rely on setting a detached worktree to work. However, without a `.git` folder, it's difficult to tell whether a file is being tracked by a bare repo or not. Unfortunately, this also means that while editing dotfiles, it's not possible to see git diffs in the gutter or open lazygit in the correct repository — at least not without further configuration.

AstroNvim provides an easy way to enable git integration when editing files within detached worktrees, allowing gitsigns gutter highlighting, lazygit toggleterm, and telescope mappings to work as you would expect them to.

This functionality is opt-in. To enable it, configure AstroCore and set the `git_worktrees` option to an array-like table, where each entry represents a separate worktree with entries `toplevel` and `gitdir` specifying paths on your system.

## Example

If you have a bare git repo located at `~/.dotfiles` with its working tree set to the home directory, you can enable git integration for it by adding the following plugin specification to your configuration:

```lua title="lua/plugins/astrocore.lua"
return {
  "AstroNvim/astrocore",
  ---@type AstroCoreOpts
  opts = {
    git_worktrees = {
      {
        toplevel = vim.env.HOME,
        gitdir = vim.env.HOME .. "/.dotfiles",
      },
    },
  },
}
```

:::note

This mirrors a similar configuration option in gitsigns (https://github.com/lewis6991/gitsigns.nvim/pull/600).

:::
