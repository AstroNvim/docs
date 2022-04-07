---
id: colorscheme
title: Custom Colorscheme
---

## Using a Custom Colorscheme Before Plugin Installed

One thing that might be an annoyance is if you are using a custom colorscheme in your user configuration and are trying to set it before the plugin is installed. It is recommended to add a check before setting the colorscheme in your `init.lua` file before setting it. For example if you want to use [Catppuccin](https://github.com/catppuccin/nvim). The typical way to tell AstroNvim to use a colorscheme in your `user/init.lua` file:

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

If this is set up in a clean environment there will be an error when trying to set the `colorscheme` because `catppuccin` has not been installed yet on the initial loading. This can be resolved with something like the following in the `user/init.lua` file:

```lua
local colorscheme = "default_theme"
local theme_installed, _ = pcall(require, "catppuccin")
if theme_installed then
  colorscheme = "catppuccin"
end

return {
  colorscheme = colorscheme,

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

> Note in this approach also handles the case when the colorscheme is not installed yet and AstroNvim will not try to set it.
