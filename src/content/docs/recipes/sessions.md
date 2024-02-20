---
id: sessions
title: Customize Session Management
---

Since AstroNvim v4, we have begun using [resession.nvim](https://github.com/stevearc/resession.nvim) for powering session management. This plugins provides an extensive Lua API for building out the features we want when saving and restoring sessions. This allows us to handle things such as our tab-local buffer management. This is a very powerful Lua API but can take some learning to configure the way you want. This page provides a few common recipes that user's want that can be easily added to your user configuration.

## AstroNvim Defaults

To ease the use of resession we have built a few features into AstroNvim which can be configured. By default AstroNvim is set up to save the previous session as well as the last session for each working directory on exit and has the ability to configure buffers which the user wants to ignore when saving sessions. These options are configured through the `AstroNvim/astrocore` plugin and has the following defaults:

```lua title="lua/plugins/astrocore_sessions.lua"
return {
  "AstroNvim/astrocore",
  ---@type AstroCoreOpts
  opts = {
    -- Configuration table of session options for AstroNvim's session management powered by Resession
    sessions = {
      -- Configure auto saving
      autosave = {
        last = true, -- auto save last session
        cwd = true, -- auto save session for each working directory
      },
      -- Patterns to ignore when saving sessions
      ignore = {
        dirs = {}, -- working directories to ignore sessions in
        filetypes = { "gitcommit", "gitrebase" }, -- filetypes to ignore sessions
        buftypes = {}, -- buffer types to ignore sessions
      },
    },
  },
}
```

## Automatically Restore Previous Session

Some users may want to automatically restore their previous session for a given directory when opening Neovim with no arguments. This can be achieved by setting up an auto command on the `VimEnter` event:

```lua title="lua/plugins/auto_restore_sessions.lua"
return {
  "AstroNvim/astrocore",
  ---@type AstroCoreOpts
  opts = {
    autocmds = {
      -- disable alpha autostart
      alpha_autostart = false,
      restore_session = {
        {
          event = "VimEnter",
          desc = "Restore previous directory session if neovim opened with no arguments",
          callback = function()
            -- Only load the session if nvim was started with no args
            if vim.fn.argc(-1) == 0 then
              -- try to load a directory session using the current working directory
              require("resession").load(
                vim.fn.getcwd(),
                { dir = "dirsession", silence_errors = true }
              )
              -- trigger buffer read auto commands on each opened buffer after load
              vim.tbl_map(vim.cmd.doautoall, { "BufReadPre", "BufReadPost" })
            end
          end,
        },
      },
    },
  },
}
```

## Git Branch Specific Directory Sessions

Some users may want to save sessions not only specific to their directory, but also the current branch checked out in `git` if applicable. This can also be easily configurable.

```lua title="lua/plugins/git_branch_sessions.lua"
-- function for calculating the current session name
local get_session_name = function()
  local name = vim.fn.getcwd()
  local branch = vim.fn.system("git branch --show-current")
  if vim.v.shell_error == 0 then
    return name .. vim.trim(branch --[[@as string]])
  else
    return name
  end
end

return {
  "AstroNvim/astrocore",
  ---@type AstroCoreOpts
  opts = {
    sessions = {
      -- disable the auto-saving of directory sessions
      autosave = { cwd = false },
    },
    mappings = {
      n = {
        -- update save dirsession mapping to get the correct session name
        ["<Leader>SS"] = {
          function()
            require("resession").save(
              get_session_name(),
              { dir = "dirsession" }
            )
          end,
          desc = "Save this dirsession",
        },
        -- update load dirsession mapping to get the correct session name
        ["<Leader>S."] = {
          function()
            require("resession").load(
              get_session_name(),
              { dir = "dirsession" }
            )
          end,
          desc = "Load current dirsession",
        },
      },
    },
    autocmds = {
      -- disable alpha autostart
      alpha_autostart = false,
      git_branch_sessions = {
        -- auto save directory sessions on leaving
        {
          event = "VimLeavePre",
          desc = "Save git branch directory sessions on close",
          callback = vim.schedule_wrap(function()
            if require("astrocore.buffer").is_valid_session() then
              require("resession").save(
                get_session_name(),
                { dir = "dirsession", notify = false }
              )
            end
          end),
        },
        -- auto restore previous previous directory session, remove if necessary
        {
          event = "VimEnter",
          desc = "Restore previous directory session if neovim opened with no arguments",
          callback = function()
            -- Only load the session if nvim was started with no args
            if vim.fn.argc(-1) == 0 then
              -- try to load a directory session using the current working directory
              require("resession").load(
                get_session_name(),
                { dir = "dirsession", silence_errors = true }
              )
              -- trigger buffer read auto commands on each opened buffer after load
              vim.tbl_map(vim.cmd.doautoall, { "BufReadPre", "BufReadPost" })
            end
          end,
        },
      },
    },
  },
}
```
