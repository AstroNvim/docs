---
id: globalstatus
title: Disable Global Statusbar
---

By default AstroNvim enables the new global statusbar that comes with Neovim v0.7+. Some users may not like this behavior and prefer the traditional per-buffer status bar. The following code block is a minimal `user/init.lua` that will disable the global statusbar with lualine. If you are using Dashboard.nvim as well you will also need to override the autocommands that we include with this plugin as well which are the changes made to the `polish()` function. If you have disabled or removed the Dashboard.nvim plugin then you can ignore the `polish` function changes below.

```lua
return {
  options = { opt = { laststatus = 2 } }
}
```
