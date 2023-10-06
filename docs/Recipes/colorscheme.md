---
id: colorscheme
title: Custom Colorscheme
---

## Using a Custom Colorscheme

There are only 2 simple steps to change colorscheme of your editor:
1. Add a plugin
2. Specify colorsheme

### Step 1 - Adding a plugin

Go to [community colorscheme plugins](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/colorscheme) and pick a scheme that you would like to install. Each folder will have `init.lua` file containing theme related plugins and configurations. For example `catppuccin`:
```lua
return {
  {
    "catppuccin/nvim",
    name = "catppuccin",
    opts = {
      integrations = {
        alpha = true,
        aerial = true,
        dap = { enabled = true, enable_ui = true },
        mason = true,
        neotree = true,
        notify = true,
        nvimtree = false,
        semantic_tokens = true,
        symbols_outline = true,
        telescope = true,
        ts_rainbow = false,
        which_key = true,
      },
    },
  },
  {
    "nvim-telescope/telescope.nvim",
    optional = true,
    opts = {
      highlight = {
        enable = true,
        additional_vim_regex_highlighting = false,
      },
    },
  },
}
```
Copy content of the file, and paste it into your `user/plugins/user.lua` (usually it's `~/.config/nvim/lua/user/plugins/user.lua`)

### Step 2 - Specifying colorscheme

Open your `user/init.lua` (usually it's `~/.config/nvim/lua/user/init.lua`), find the line where `colorsheme` property is being set:
```lua
colorscheme = "astrodark"
```

Then change it to the name of the theme you've installed in the step 1:
```lua
colorscheme = "catppuccin"
```

Keep in mind that sometimes a single theme plugin provides multiple colorshemes. In order to pick one you need to specify the name of a variation from the theme plugin documentation, for example:
```lua
colorscheme = "catppuccin-mocha"
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
