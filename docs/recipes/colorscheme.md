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
    init = {
      {
        "catppuccin/nvim",
        as = "catppuccin",
        config = function()
          require("catppuccin").setup {}
        end,
      },
    },
  },
}
```

:::tip

There used to be a recommended trick to check for your colorscheme before setting it. We have improved the base installation to do this checking automatically. So no more need for user side checking.

:::

## Using a Custom Colorscheme Configured with Global Variables

Some colorscheme plugins are configured through global variables rather than Lua functions like `setup()` so they require a slightly different setup in Packer to get them working correctly. For example if we want to use [Sonokai](https://github.com/sainnhe/sonokai):

```lua
return {
  plugins = {
    init = {
      {
        "sainnhe/sonokai",
        config = function()
          vim.g.sonokai_style = "shusia"
          vim.cmd "colorscheme sonokai"
        end,
      },
    },
  },
}
```

:::tip

This approach also handles the case when the colorscheme is not installed yet and AstroNvim will not try to set it.

:::
