---
id: disable_winbar
title: Disable Winbar
---

By default AstroNvim enables the new winbar that comes with Neovim v0.8+. Some users may not like this behavior and prefer to not have a winbar at the top of each window. You can do this by overriding the `heirline` plugin configuration.

```lua
{
  "rebelot/heirline.nvim",
  opts = function(_, opts)
    opts.winbar = nil
    return opts
  end
}
```
