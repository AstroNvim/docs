---
id: globalstatus
title: Disable Global Statusbar
---

By default AstroNvim enables the new global statusbar that comes with Neovim v0.7+. Some users may not like this behavior and prefer the traditional per-buffer status bar. The following code block is a minimal `user/init.lua` that will disable the global statusbar with lualine.

```lua
return {
  plugins = {
    lualine = {
      options = {
        globalstatus = false,
      },
    },
  },
}
```
