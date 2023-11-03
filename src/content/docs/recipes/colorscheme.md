---
id: colorscheme
title: Custom Colorscheme/Theme
---

This page goes over how to install and configure a custom color scheme or theme in your AstroNvim configuration. By default AstroNvim ships with it's own custom color scheme, [AstroTheme](https://github.com/AstroNvim/astrotheme), but there are many others to choose from to fit your needs. When choosing a colorscheme/theme, make sure to check what plugins they support and compare that with the list of [Plugins used in AstroNvim](https://docs.astronvim.com/acknowledgements/#-plugins-used-in-astronvim). Not every plugin requires custom highlights, but having good support for common plugins helps unify the user interface and keep things looking nice.

## Using a Custom Colorscheme

There are only 2 simple steps to change colorscheme of your editor:

1. Add a plugin
2. Specify colorscheme

### Step 1 - Adding a plugin

You can either add a colorscheme plugin directly to your `plugins` as described in the [Custom Plugins Page](../../configuration/custom_plugins), for example if you wanted to add [Catppuccin](https://github.com/catppuccin/nvim) you would add the following to your `plugins`:

```lua
return {
  "catppuccin/nvim",
  name = "catppuccin",
  opts = {
    -- configuration options...
  },
}
```

Or you can install it using [AstroCommunity](https://github.com/AstroNvim/astrocommunity). Navigate to the folder listing the available [community colorscheme plugins](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/colorscheme) and pick a colorscheme that you would like to install. Then make sure you have add the AstroCommunity repository to your `plugins` and then insert the necessary `import` statement as described in the AstroCommunity documentation. For example to add Catppuccin, you would add the following to your `plugins`:

```lua
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.colorscheme.catppuccin" },
}
```

### Step 2 - Specifying colorscheme

The default colorscheme for AstroNvim can be configured through the [AstroCore](https://github.com/AstroNvim/astrocore) plugin with the `colorscheme` option. This can be added to your user configuration's plugins:

```lua
return {
  "AstroNvim/astrocore",
  opts = {
    colorscheme = "astrodark",
  },
}
```

Then change it to the name of the theme you've installed in the step 1:

```lua
return {
  "AstroNvim/astrocore",
  opts = {
    colorscheme = "catppuccin",
  },
}
```

## Using a Custom Colorscheme Configured with Global Variables

Some colorscheme plugins are configured through global variables rather than Lua functions like `setup()` so they require a slightly different setup to get them working correctly. For example if we want to use [Sonokai](https://github.com/sainnhe/sonokai):

```lua
return {
  {
    "AstroNvim/astrocore",
    opts = {
      colorscheme = "sonokai",
    },
  },
  {
    "sainnhe/sonokai",
    init = function() -- init function runs before the plugin is loaded
      vim.g.sonokai_style = "shusia"
    end,
  },
}
```

:::tip

This approach also handles the case when the colorscheme is not installed yet and AstroNvim will not try to set it.

:::
