---
id: customizing_plugins
title: Customizing Plugins
---

`lazy.nvim` (referred to as just _Lazy_ from now on) is a plugin manager. A plugin manager helps to manage the installation and configuration of plugins. AstroNvim is built around plugins, and hence around Lazy.

The power of AstroNvim is that it selects the "best" plugins that help to make `nvim` a great environment for editing, and, more importantly configures those plugins with "reasonable" defaults.

Many people find great value in having the plugins selected and configured for them. AstroNvim:

- Encapsulates the complexity of plugin configuration
- Takes care of the interactions among plugins
- Takes care of the interactions with `nvim`
- Provides "sane" defaults for plugins

Another win is that you are not locked in to the plugins that are part of AstroNvim. Except for the `AstroNvim/*` plugins, all of the plugins can be disabled if they are not to your liking. Additional plugins can be added if they suit your needs better. Finally, all of the plugins can have their configuration tuned to your liking.

Lazy is particularly feature rich in that it helps with plugin life cycle management. A few of the life cycle features are:

- Installation of plugins from different sources, such as from GitHub or from a local directory.
- Uninstalling plugins when they are no longer referenced in your configuration.
- Lazily loading plugins meaning that plugins can be loaded only when needed, such as on some editor event happening, benefiting `nvim` startup time.
- Compiles plugin `lua` code into native code for your system, helping with execution speed of plugin code.

To see all available options for defining plugins in Lazy.nvim please refer to the [Lazy.nvim Plugin Spec](https://github.com/folke/lazy.nvim#-plugin-spec). Here we will go over examples of defining new plugins, overriding plugins, and disabling plugins.

## Defining Plugins

To install and configure a plugin, a _plugin specification_ is required. Here is an example of a specification for the `catppuccin` theme:

```lua title="lua/plugins/catppuccin.lua"
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

The `return` statement is returning a table of tables. The outer table is a list of _plugin specifications_. Each entry in the list is a single plugin specification.

The first entry in the plugin specification is the name of the plugin to load, specified in short URL form. The next two entries in the table, `name` and `opts` are Lazy recognized keys that direct Lazy on how to configure this plugin. `opts` can be a table or a function (`opts` is a table in the example above) that contains the configuration for the plugin. The structure of what is inside of `opts` is up to each plugin.

To learn more about plugin specifications, see the [Lazy documentation](https://github.com/folke/lazy.nvim#-plugin-spec).

That's it! When `nvim` is started, the `catppuccin` plugin will be downloaded from GitHub, installed, configured, and loaded.

## Configure AstroNvim Plugins

Overriding plugins are as simple as adding a plugin specification for that plugin and add modifications to the plugin specification that you want. Lazy.nvim supports extending many keys (`cmd`, `event`, `ft`, `keys`, `opts`, and `dependencies`) while other keys in the plugin specification will fully overwrite the defaults.

Here are some examples of overwriting some plugins:

```lua title="lua/plugins/overridden.lua" {5-10} {17-23}
return {
  {
    "AstroNvim/AstroLSP",
    ---@type AstroLSPOpts
    opts = { -- extend the plugin options
      diagnostics = {
        -- disable diagnostics virtual text
        virtual_text = false,
      },
    },
  },
  -- customize cmp mappings
  {
    "hrsh7th/nvim-cmp",
    -- override the options table that is used
    -- in the `require("cmp").setup()` call
    opts = function(_, opts)
      -- opts parameter is the default options table
      -- the function is lazy loaded so cmp is able to be required
      local cmp = require("cmp")
      -- modify the mapping part of the table
      opts.mapping["<C-x>"] = cmp.mapping.select_next_item()
    end,
  },
  -- customize treesitter parsers
  {
    "nvim-treesitter/nvim-treesitter",
    opts = function(_, opts)
      -- list like portions of a table cannot be merged naturally and require the user to merge it manually
      -- check to make sure the key exists
      if not opts.ensure_installed then
        opts.ensure_installed = {}
      end
      vim.list_extend(opts.ensure_installed, {
        "lua",
        "vim",
        -- add more arguments for adding more treesitter parsers
      })
    end,
  },
}
```

Here is a link to all of the AstroNvim [plugin configuration files.](https://github.com/AstroNvim/AstroNvim/tree/v4/lua%2Fastronvim%2Fplugins). This is useful to see all the plugins installed by AstroNvim and see their default configuration.

### How `opts` Overriding Works

When configuring plugins the main configuration point is modifying a plugin's setup options through the `opts` key. As plugin specs are loaded in by `lazy.nvim` this field (along with others) is merged with previous settings that `lazy.nvim` has already setup. There are 2 main formats that this `opts` field can be set to. The first is a simple `table` which is directly merged using `vim.tbl_deep_extend` and the second is by using a Lua `function` that gives you complete control over the table itself.

The `table` notation is the simplest method for configuration but does not cover all of the cases that users will experience which makes the `function` notation necessary in some situations. Understanding when to use each can make life much easier when doing advanced configuration. Here are a few cases in which the `table` notation may not do what you want:

- When passing a `table` in Lua it is resolved immediately. This can break lazy loading and try to access modules before they are available. When passing a `function` in Lua the contents are only resolved when it is executed. This allows for safe accessing of modules when they should be available.
- When using the `table` notation for overriding, merging works great for dictionary-like entries with a key/value pair, but does not do any actual "merging" for list-like tables. Instead the list-like table will be replaced completely. This can be resolved in the `function` notation by manually doing the list merging that you want either with something like the Lua function `table.insert` or provided Neovim functions like `vim.list_extend`.

Let's take a closer look at these two notations with an example using [`nvim-treesitter`](https://github.com/nvim-treesitter/nvim-treesitter). Let's assume the default configuration for `nvim-treesitter` is:

```lua
return {
  "nvim-treesitter/nvim-treesitter",
  opts = {
    ensure_installed = { "lua", "vim" },
    highlight = {
      enable = true,
    },
  },
}
```

With this specification the current `opts` would resolve to the table:

```lua
opts = {
  ensure_installed = { "lua", "vim" },
  highlight = {
    enable = true,
  },
}
```

If you use the table notation to override these fields in your configuration like this:

```lua
return {
  "nvim-treesitter/nvim-treesitter",
  opts = {
    ensure_installed = { "python" },
    highlight = {
      enable = false,
    },
    indent = {
      enable = false,
    },
  },
}
```

You would end up with the `opts` resolving to:

```lua
opts = {
  ensure_installed = { "python" },
  highlight = {
    enable = false,
  },
  indent = {
    enable = false,
  },
}
```

The `highlight.enabled` and `indent.enabled` fields work as expected, but the `ensure_installed` table does not actually extend the list and instead simply overwrites it. This is a limitation of the table merging. To resolve this we can rewrite our `opts` as a function where the first parameter is the resolve plugin specification (this is rarely used but may be useful in very advanced cases) and the second parameter which is the current `opts` table:

```lua
return {
  "nvim-treesitter/nvim-treesitter",
  opts = function(plugin, opts)
    table.insert(opts.ensure_installed, "python")
  end,
}
```

You would end up with the `opts` resolving to:

```lua
opts = {
  ensure_installed = { "lua", "vim", "python" },
  highlight = {
    enable = true,
  },
}
```

One thing to be careful for that the `table` merging handles that the function notation will not is the automatic creation of nested/parent keys. For example, if we want to set `indent.enable = true` in our `opts` with the function notation, it would look something like this:

```lua
return {
  "nvim-treesitter/nvim-treesitter",
  opts = function(plugin, opts)
    -- check if an `indent` table exists, if not, create it
    if not opts.indent then
      opts.indent = {}
    end
    -- once we know it is created, we can set the sub-keys
    opts.indent.enable = true
  end,
}
```

You would end up with the `opts` resolving to:

```lua
opts = {
  ensure_installed = { "lua", "vim", "python" },
  highlight = {
    enable = true,
  },
}
```

Notice how we didn't return anything from this function. In Lua, tables are passed by reference to functions which means if we modify the table directly then that will automatically apply to the plugin. We can however decide to return the table we want which will take full precedence over the `opts` table that was passed in. For example, if we wanted to completely clear the options:

```lua
return {
  "nvim-treesitter/nvim-treesitter",
  opts = function(plugin, opts)
    return {}
  end,
}
```

You would end up with the `opts` resolving to:

```lua
opts = {}
```

The last thing that this function notation provides is the ability to `require` modules safely even with lazy loading. `nvim-treesitter` isn't a great example of this, so here is a simple example with `nvim-cmp`. `nvim-cmp` allows the configuration of mappings and provides helper functions to make setting these mappings easy. Because `nvim-cmp` is lazy loaded, the function notation is required in this situation so that we don't break the lazy loading:

```lua
return {
  "hrsh7th/nvim-cmp",
  opts = function(plugin, opts)
    -- opts parameter is the default options table
    -- the function is lazy loaded so cmp is able to be required
    local cmp = require("cmp")
    -- make sure there is a `mapping` table in the `opts`
    if not opts.mapping then
      opts.mapping = {}
    end
    -- modify the mapping part of the table
    opts.mapping["<C-x>"] = cmp.mapping.select_next_item()
  end,
}
```

### Extending Core Plugin Config Functions

Many of our core plugins have additional code that runs during setup which you might want to extend. For this reason we have included our own modules in `require("astronvim.plugins.configs.X")` (replacing `X` with the plugin `require` string) that returns the AstroNvim default config function in each plugin specification that has a `config` function which can be easily called if you want to extend a plugin configuration. This is particularly useful if you want to do something like add rules to `nvim-autopairs`, add user snippets to `luasnip`, or add more extensions to `telescope` without having to rewrite our entire configuration function. Here is an example of adding the `media_files` Telescope extension:

:::note

Not all plugins have custom `config` functions and will not have an `astronvim.plugins.configs.X` module. The Lua language server provides autocompletion that is useful for identifying which plugins have a core `config` function.

:::

```lua title="lua/plugins/extended_config.lua" {10-11}
return {
  {
    "nvim-telescope/telescope.nvim",
    dependencies = { -- add a new dependency to telescope that is our new plugin
      "nvim-telescope/telescope-media-files.nvim",
    },
    -- the first parameter is the plugin specification
    -- the second is the table of options as set up in Lazy with the `opts` key
    config = function(plugin, opts)
      -- run the core AstroNvim configuration function with the options table
      require("astronvim.plugins.configs.telescope")(plugin, opts)

      -- require telescope and load extensions as necessary
      require("telescope").load_extension("media_files")
    end,
  },
}
```

## Disabling Plugins

Plugins can be easily disabled by simply setting the `enabled` option to `false`. Here is an example of disabling the core dashboard plugin, `alpha`:

```lua title="lua/plugins/disabled.lua" "enabled = false"
return {
  { "goolord/alpha-nvim", enabled = false },
}
```

## Lazy Loading

Lazy loading can be used to delay plugin loading to speed up start up time. There are a few basic methods of lazy loading that can be easily added. The main keys here are `lazy`, `cmd`, `ft`, `keys`, and `event`. More details of these and more options can be found in the [Lazy Documentation](https://github.com/folke/lazy.nvim#-plugin-spec). Here are a few examples:

```lua title="lua/plugins/lazy_loaded.lua" /((lazy|event|cmd|ft|keys) = (\S+|{.*}))/
return {
  -- by enabling the lazy option, the plugin will automatically be lazy loaded
  -- until it's module is called for example require("tokyonight")
  { "folke/tokyonight.nvim", lazy = true },

  -- this plugin will be loaded on the autocmd event "UIEnter"
  { "rcarriga/nvim-notify", event = "UIEnter" },

  -- this plugin will be loaded when using `:ZenMode`
  { "folke/zen-mode.nvim", cmd = "ZenMode" },

  -- this plugin will be loaded when using `:ZenMode`
  { "folke/zen-mode.nvim", cmd = "ZenMode" },

  -- this plugin will be loaded when opening a "markdown" file
  { "lukas-reineke/headlines.nvim", ft = "markdown" },
}
```

### Lazy Load File Related Plugins

AstroNvim has many plugins that we load on the first real file that is open. This is used internally for plugins like Treesitter, LSP related plugins, and other various plugins related to interacting with files. We achieve this by creating a custom `User` `autocmd` event called `AstroFile`. This can also be used by users for lazy loading plugins on the first real file that is opened:

```lua title="lua/plugins/nvim-colorizer.lua" {4}
return {
  {
    "NvChad/nvim-colorizer.lua",
    event = "User AstroFile",
  },
}
```

This will tell AstroNvim that this plugin should be loaded whenever the `User` autocmd event `AstroFile` is fired.

### Lazy Load Git Plugins

Similar to the file related plugins described above, we also have a similar hook for git related plugins. These shouldn't be loaded until a file is open that is in a git repository folder. We use this for stuff like the `gitsigns` plugin. This will check when a file is opened if it is in a git tracked folder and then load the plugin. This `User` `autocmd` event is `AstroGitFile`. **This does require access to the `git` command in your `PATH`.**

```lua title="lua/plugins/gitsigns.lua" {4}
return {
  {
    "lewis6991/gitsigns.nvim",
    event = "User AstroGitFile",
  },
}
```
