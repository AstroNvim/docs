---
id: globalstatus
title: Disable Global Statusbar
---

By default AstroNvim enables the new global statusbar that comes with Neovim v0.7+. Some users may not like this behavior and prefer the traditional per-buffer status bar. The following code block is a minimal `user/init.lua` that will disable the global statusbar with lualine. If you are using Dashboard.nvim as well you will also need to override the autocommands that we include with this plugin as well which are the changes made to the `polish()` function. If you have disabled or removed the Dashboard.nvim plugin then you can ignore the `polish` function changes below.

```lua
return {
  plugins = {
    lualine = {
      options = {
        globalstatus = false,
      },
    },
  },
  polish = function()
    vim.api.nvim_del_augroup_by_name "dashboard_settings"
    vim.api.nvim_create_augroup("dashboard_settings", {})
    if require("core.utils").is_available "bufferline.nvim" then
      vim.api.nvim_create_autocmd("FileType", {
        desc = "Disable tabline for dashboard",
        group = "dashboard_settings",
        pattern = "dashboard",
        command = "set showtabline=0",
      })
      vim.api.nvim_create_autocmd("BufWinLeave", {
        desc = "Reenable tabline when leaving dashboard",
        group = "dashboard_settings",
        pattern = "<buffer>",
        command = "set showtabline=2",
      })
    end
    vim.api.nvim_create_autocmd("FileType", {
      desc = "Disable statusline for dashboard",
      group = "dashboard_settings",
      pattern = "dashboard",
      command = "set laststatus=0",
    })
    vim.api.nvim_create_autocmd("BufWinLeave", {
      desc = "Reenable statusline when leaving dashboard",
      group = "dashboard_settings",
      pattern = "<buffer>",
      command = "set laststatus=2",
    })
    vim.api.nvim_create_autocmd("BufEnter", {
      desc = "No cursorline on dashboard",
      group = "dashboard_settings",
      pattern = "*",
      command = "if &ft is 'dashboard' | set nocursorline | endif",
    })
  end,
}
```
