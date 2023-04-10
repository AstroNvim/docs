---
id: colorscheme
title: Custom Colorscheme
---

## Using a Custom Colorscheme

Example setting a custom colorscheme with `catppuccin` in your `user/init.lua`:

```lua
return {
  colorscheme = "catppuccin",

  plugins = {
    {
      "catppuccin/nvim",
      as = "catppuccin",
      config = function()
        require("catppuccin").setup {}
      end,
    },
  },
}
```

## Using a Custom Colorscheme Configured with Global Variables

Some colorscheme plugins are configured through global variables rather than Lua functions like `config()` so they require a slightly different setup to get them working correctly. For example if we want to use [Sonokai](https://github.com/sainnhe/sonokai):

```lua
return {
  colorscheme = "sonokai",
  plugins = {
    {
      "sainnhe/sonokai",
      init = function() -- init function runs before the plugin is loaded
        vim.g.sonokai_style = "shusia"
      end,
    },
  },
}
```

:::tip

This approach also handles the case when the colorscheme is not installed yet and AstroNvim will not try to set it.

:::
