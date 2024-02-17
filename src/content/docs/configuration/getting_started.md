---
id: getting_started
title: Getting started with AstroNvim
---
# Get Started with AstroNvim

TODO: some preamble text here.

## A Starter Template

A [configuration template](https://github.com/AstroNvim/template) is an easy way to going with AstroNvim. The template provides a directory structure with the required files in place. Within the files some indication, through commented out code, of how to configure the feature.

The template structure:

```txt
astronvim_v4/
├── README.md
├── init.lua
└── lua
    ├── community.lua
    ├── lazy_setup.lua
    ├── plugins
    │   ├── astrocore.lua
    │   ├── astrolsp.lua
    │   ├── astroui.lua
    │   ├── mason.lua
    │   ├── none-ls.lua
    │   ├── treesitter.lua
    │   ├── user.lua
    │   └── vim-sandwich.lua
    └── polish.lua
```

::: note

The list of files in the template may change over time, so the files above may be slightly different from the actual template.

:::

At the top level is `init.lua`. This code bootstraps the configuration by installing `lazy.nvim` if it is not already installed and then calling `lua/lazy_setup.lua` to install and configure the AstroNvim and user plugins.

Looking a bit deeper, the `plugins` directory is where all, except AstroCommunity, plugins are setup. The first three plugins are for the AstroNvim configuration. The next four plugins modify the configuration of a plugin that is part of AstroNvim (e.g.: `treesitter.lua`). The last file is not a part of the template. `vim-sandwich` specifies the installation and configuration a plugin of a user specified (i.e.: one that is not a part of AstroNvim distribution).

Each file in the plugins directory can specify the installation and configuration of one or more plugins. The template generally installs and configures a single plugin per `lua` file. Further, the name of the file generally matches the name of the plugin. The one exception is `user.lua` which has multiple plugins in it - but they could be split into separate files if you wish!

There is nothing special about the template! It's merely a quick way to get started, and, well, recommended to get you up and running quicker. Once you have a working configuration that may be the time when you start to move things around.

## AstroCommunity

[AstroCommunity](https://github.com/AstroNvim/astrocommunity) is a plugin specification repository on GitHub. The specifications found there are configurations for many popular plugins that can be used to augment your configuration. There are also "language packs" that are specifications for many programming lanaguages. These are a good way to get setup with a set of tools for the languages that you are using.

The AstroCommunity setup is in the template file `lua/community.lua`.

See the astrocommunity documentation for details of using the plugin specifications that it offers.

## `lazy.nvim` and AstroNvim - Bringing it all together

`lazy.nvim` (referred to as just *Lazy* from now on) is a plugin manager. A plugin manager helps to manage the installation and configuration of plugins. AstroNvim is built around plugins, and hence around Lazy.

The power of AstroNvim is that it selects the "best" plugins that help to make `nvim` a great environment for editing, and, more importantly configures those plugins with "reasonable" defaults.

Many people find great value in having the plugins selected and configured for them. AstroNvim:
- Encapsulates the complexity of plugin configuration
- Takes care of the interactions among plugins
- Takes care of the interactions with `nvim`
- Provides "sane" defaults for plugins

Another win is that you are not locked in to the plugins that are part of AstronNvim. Many, but not all, of the plugins can be disabled if they are not to your liking. Additional plugins can be added if they suit your needs better. Finally, all of the plugins can have their configuration tuned to your liking.

Lazy is particularly feature rich in that it helps with plugin life cycle management. A few of the life cycle features are:
- Installation of plugins from different sources, such as from GitHub or from a local directory.
- Uninstalling plugins when they are no longer referenced in your configuration.
- Lazily loading plugins meaning that plugins can be loaded only when needed, such as on some editor event happening, benefiting `nvim` startup time.
- Compiles plugin `lua` code into native code for your system, helping with execution speed of plugin code.

### Adding a Plugin of Your Choosing

To install and configure a plugin, a *plugin specification* is required. Here is an example of a specification for the `catppuccin` theme:
```lua
return {
  {
    "catppuccin/nvim",
    name = "catppuccin",
    opts = {
      dim_inactive = { enabled = true, percentage = 0.25 },
      highlight_overrides = {
        mocha = function(c)
          return {
            Normal = { bg = c.mantle },
            Comment = { fg = "#7687a0" },
            ["@tag.attribute"] = { style = {} },
          }
        end,
      },
    },
  },
}
```

The code above resides in a file. The name of the file can be any valid filename, as long as the file's extension is `.lua`. By convention, many people name the file after the plugin that is being installed. So, in the example above, the file would be called `catppuccin.lua` and if you are following the AstroNvim template then the file would be located in the `lua/plugins` directory.

The `return` statement is returning a table of tables. The outer table is a list of *plugin specifications*. Each entry in the list is a single plugin specification.

The first entry in the plugin specification is the name of the plugin to load, specified in short URL form. The next two entries in the table, `name` and `opts` are Lazy recognized keys that direct Lazy on how to configure this plugin. `opts` can be a table or a function (`opts` is a table in the example above) that contains the configuration for the plugin. The structure of what is inside of `opts` is up to each plugin.

To learn more about plugin specifications, see the [Lazy documentation](https://github.com/folke/lazy.nvim#-plugin-spec).

That's it! When `nvim` is started, the `catppuccin` plugin will be downloaded from GitHub, installed, configured, and loaded.

### Configuring an AstroNvim Plugin

TODO: question - how is it decided when plugin config overwrites the existing config vs. merges? Can you control which happens? This entire section depends on those answers and what is here could be entirely wrong!

Configuring a plugin that is a part of AstroNvim is for the most part the same as shown above. The biggest difference is that you are modifying the configuration that AstroNvim created instead of configuring a plugin from scratch. The key point about modifying a configuration is that you have to be aware that you don't overwrite AstroNvim configuration that you want to keep.

Here is an example. One of the plugins installed for you by AstroNvim is `nvim-tree/nvim-web-devicons`. Here is a trimmed down version of that file from the AstroNvim codebase:

```
return {
  "nvim-tree/nvim-web-devicons",
  opts = function()
    return {
      override = {
        deb = { icon = "", name = "Deb" },
        lock = { icon = "󰌾", name = "Lock" },
      },
    }
  end,
}
```

Say, for example, you wanted to add a few more icons. The following would add the icons, but it overwrites AstroNvim's configuration. Returning `override` as it is written below replaces all the override icons and you are left with just `mp3` and `mp4` icons.

```
return {
  "nvim-tree/nvim-web-devicons",
  opts = function()
    return {
      override = {
        mp3 = { icon = "󰎆", name = "Mp3" },
        mp4 = { icon = "", name = "Mp4" },
      },
    }
  end,
}
```

A correct way (hey, it is just code, there are multiple ways) to modify the base configuration and add more icons is: (**TODO**: fix syntax below; what are all the rules for when things need to get merged versus overwriting?)
```
return {
  "nvim-tree/nvim-web-devicons",
  opts = function(_, opts)
    opts.override = require("astrocore").list_insert_unique(
      opts.override,
      mp3 = { icon = "󰎆", name = "Mp3" },
      mp4 = { icon = "", name = "Mp4" },
      },
    }
  end,
}
```

Your modified configuration, like any plugin specification, can be any valid filename with a `.lua` extension and is placed in your `lua/plugins` directory.

Here is a link to all of the AstroNvim [plugin configuration files.](https://github.com/AstroNvim/AstroNvim/tree/v4/lua%2Fastronvim%2Fplugins). This is useful to see all the plugins installed by AstroNvim and see their default configuration.

### Disabling a Plugin

Disabling a plugin is done with a plugin specification. Here is an example of disabling two plugins:

```
return {
  { "goolord/alpha-nvim", enabled = false },
  { "lukas-reineke/indent-blankline.nvim", enabled = false },
}
```
