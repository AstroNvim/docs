---
id: disable_tabline
title: Disable Tabline
---

::::danger

UNVALIDATED: NEED UPDATING FOR V4

::::

By default AstroNvim uses Heirline for generating the tabline for displaying buffers as tabs. Some users may not like this behavior and prefer to not have the bar at the top. You can do this a couple ways. The easiest would be to set `vim.opt.showtabline` to `0` which will hide the bar but still let it be toggled in the UI as well as let the interactive buffer picker with `<leader>b` to function when necessary.

```lua
return {
  options = {
    opt = {
      showtabline = 0
    },
  },
}
```

Another way would be to fully remove the `tabline` definition from Heirline, but this will also break the `<leader>b` functionality as well and not allow you to ever toggle the tabline on:

```lua
return {
  options = {
    opt = {
      showtabline = 0, -- don't show tabline
    },
  },
  mappings = {
    n = { -- disable <leader>b mappings
      ["<leader>b"] = false,
      ["<leader>bb"] = false,
      ["<leader>bd"] = false,
      ["<leader>b\\"] = false,
      ["<leader>b|"] = false,
    },
  },
  plugins = {
    {
      "rebelot/heirline.nvim",
      opts = function(_, opts)
        opts.tabline = nil -- remove tabline
        return opts
      end,
    },
  },
}
```
