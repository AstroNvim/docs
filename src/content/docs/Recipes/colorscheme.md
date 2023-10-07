---
id: colorscheme
title: Custom Colorscheme
---

## Using a Custom Colorscheme

There are only 2 simple steps to change colorscheme of your editor:

1. Add a plugin
2. Specify colorscheme

### Step 1 - Adding a plugin

You can either add a colorscheme plugin directly to your `plugins` as described in the [Custom Plugins Page](../custom_plugins), for example if you wanted to add [Catppuccin](https://github.com/catppuccin/nvim) you would add the following to your `plugins`:

```lua
{
  "catppuccin/nvim",
  name = "catppuccin",
  opts = {
    -- configuration options...
  },
}
```

Or you can install it using [AstroCommunity](https://github.com/AstroNvim/astrocommunity). Navigate to the folder listing the available [community colorscheme plugins](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/colorscheme) and pick a colorscheme that you would like to install. Then make sure you have add the AstroCommunity repository to your `plugins` and then insert the necessary `import` statement as described in the AstroCommunity documentation. For example to add Catppuccin, you would add the following to your `plugins`:

```lua
"AstroNvim/astrocommunity",
{ import = "astrocommunity.colorscheme.catppuccin" }
```

### Step 2 - Specifying colorscheme

Open your `user/init.lua` (usually it's `~/.config/nvim/lua/user/init.lua`), find the line where `colorsheme` property is being set:

```lua
colorscheme = "astrodark"
```

Then change it to the name of the theme you've installed in the step 1:

```lua
colorscheme = "catppuccin"
```

## Using a Custom Colorscheme Configured with Global Variables

Some colorscheme plugins are configured through global variables rather than Lua functions like `setup()` so they require a slightly different setup to get them working correctly. For example if we want to use [Sonokai](https://github.com/sainnhe/sonokai):

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
