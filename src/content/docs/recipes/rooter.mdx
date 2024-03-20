---
id: rooter
title: Project Rooter
---

AstroNvim comes with a built in project root detection utility that can be used to update your current working directory manually or automatically. The user can customize the detection methods, configure language servers and directories to be ignored, the scope of the working directory change, as well as toggle automatic directory changing. We also provide a few user commands for interacting with the rooter:

| Command          | Description                                               |
| ---------------- | --------------------------------------------------------- |
| `:AstroRoot`     | Update current working directory to detected project root |
| `:AstroRootInfo` | Check the current root detection information              |

## Default Configuration

```lua title="lua/plugins/astrocore_rooter.lua"
return {
  "AstroNvim/astrocore",
  ---@type AstroCoreOpts
  opts = {
    -- Configure project root detection, check status with `:AstroRootInfo`
    rooter = {
      -- list of detectors in order of prevalence, elements can be:
      --   "lsp" : lsp detection
      --   string[] : a list of directory patterns to look for
      --   fun(bufnr: integer): string|string[] : a function that takes a buffer number and outputs detected roots
      detector = {
        "lsp", -- highest priority is getting workspace from running language servers
        { ".git", "_darcs", ".hg", ".bzr", ".svn" }, -- next check for a version controlled parent directory
        { "lua", "MakeFile", "package.json" }, -- lastly check for known project root files
      },
      -- ignore things from root detection
      ignore = {
        servers = {}, -- list of language server names to ignore (Ex. { "efm" })
        dirs = {}, -- list of directory patterns (Ex. { "~/.cargo/*" })
      },
      -- automatically update working directory (update manually with `:AstroRoot`)
      autochdir = false,
      -- scope of working directory to change ("global"|"tab"|"win")
      scope = "global",
      -- show notification on every working directory change
      notify = false,
    },
  },
}
```
