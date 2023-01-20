---
id: custom_plugins
title: Custom Plugins
---

## Defining Plugins

Plugins can be added in your user configuration either in `user/init.lua` in the `plugins` table or if you are separating your configuration in `user/plugins/` folder.

To see all available options in Lazy.nvim please refer to the [Lazy.nvim Plugin Spec](https://github.com/folke/lazy.nvim#-plugin-spec)

We use the direct Lazy.nvim syntax. So anything in the `plugins` table will be passed into the setup of `lazy`. If there is a `user/plugin/` folder available then that will be used as the specification source using Lazy's out of the box plugin structuring feature ([Lazy.nvim Plugin Structuring Documentation](https://github.com/folke/lazy.nvim#-structuring-your-plugins)). This allows you to easily override any plugins that we have set up as well as adding new plugins.

:::caution

By default we have Lazy.nvim enabling lazy loading for plugins. Because of this make sure to either include conditions for plugins to be loaded or make sure to add `lazy = false` to the plugin definition.

:::

### Plugin Examples

```lua
{
  "ray-x/lsp_signature.nvim",
  event = "BufRead",
  config = function()
    require("lsp_signature").setup()
  end,
},

"andweeb/presence.nvim",
```

### Overriding Core Plugins

Lazy.nvim will automatically override previously defined plugins, For example, disabling a plugin, changing the default options, and adding onto the setup function. More details can be found in the [Lazy.nvim Documentation](https://github.com/folke/lazy.nvim). Here is a simple example disabling a core plugin such as `alpha`:

```lua
{ "goolord/alpha-nvim", enabled = false },
```

#### Extending Core Plugin Config Functions

Many of our core plugins have additional code that runs during setup which you might want to extend. For this reason we have included our own `default_config` function in each plugin specification that has a `config` function which can be easily called if you want to extend a plugin configuration. This is particularly useful if you want to do something like add rules to `nvim-autopairs`, add user snippets to `luasnip`, or add more extensions to `telescope` without having to rewrite our entire configuration function. Here is an example of adding the `media_files` Telescope extension:

```lua
{
  "nvim-telescope/telescope.nvim",
  dependencies = { -- add a new dependency to telescope that is our new plugin
    "nvim-telescope/telescope-media-files.nvim",
  },
  -- the first parameter is the plugin specification
  -- the second is the table of options as set up in Lazy with the `opts` key
  config = function(plugin, opts)
    -- run the core AstroNvim configuration function with the options table
    plugin.default_config(opts)

    -- require telescope and load extensions as necessary
    local telescope = require "telescope"
    telescope.load_extension "media_files"
  end,
}
```

### Full Example

Here is a simple `user/init.lua` file that just defines a plugin in the `plugins.init` table:

```lua
return {
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

Here is the same plugin being added to `user/plugins/init.lua` file if you prefer separating out your configuration files:

:::tip

With Lazy.nvim the name of the file in the `plugins/` folder can be anything, so add as many or as few files in there as you want with any naming organization that you would like. Just make sure that each file returns a valid table of plugin specifications.

:::

```lua
return {
  {
    "catppuccin/nvim",
    as = "catppuccin",
    config = function()
      require("catppuccin").setup {}
    end,
  },
}
```

## Lazy Loading

For maintaining a fast startup time, it is recommended to do lazy loading which is easily configurable in Packer. There are a few basic methods of lazy loading that can be easily added. The main keys here are `cmd`, `module`, `ft`, `keys`, `event`, `after`. More details of these and more options can be found in the [Packer Documentation](https://github.com/wbthomason/packer.nvim#specifying-plugins). Here are a few examples:

```lua
return {
  plugins = {
    -- plugins are automatically lazy loaded and by default allow for loading based on module
    -- so this plugin will be unloaded on startup and will load when it is required with `require("smart-splits")`
    { "mrjones2014/smart-splits.nvim" },

    -- this plugin will be loaded on the autocmd event "UIEnter"
    { "rcarriga/nvim-notify", event = "UIEnter" },

    -- this plugin will be loaded when using `:Bdelete` and `:Bwipeout`
    { "famiu/bufdelete.nvim", cmd = { "Bdelete", "Bwipeout" } },
  }
}
```

### Lazy Load File Related Plugins

AstroNvim has many plugins that we load on the first real file that is open. This is used internally for plugins like Treesitter, LSP related plugins, and other various plugins related to interacting with files. Because of this we have added some internal mechanisms to make it easy to add this specific type of lazy loading. To do this you simply use the `init` key to add the plugin name to the table `astronvim.file_plugins`. Here is a simple example:

```lua
{
  "NvChad/nvim-colorizer.lua",
  init = function() table.insert(astronvim.file_plugins, "nvim-colorizer.lua") end,
},

```

This will tell AstroNvim that this plugin should be loaded with the other file related plugins on the opening of the first real file.

### Lazy Load Git Plugins

Similar to the file related plugins described above, we also have a similar hook for git related plugins. These shouldn't be loaded until a file is open that is in a git repository folder. We use this for stuff like the `gitsigns` plugin. This will check when a file is opened if it is in a git tracked folder and then load the plugin. You just need to use the `init` key to add the plugin name to the table `astronvim.git_plugins`. **This does require access to the `git` command in your `PATH`.**

```lua
{
  "lewis6991/gitsigns.nvim",
  init = function() table.insert(astronvim.git_plugins, "gitsigns.nvim") end,
},
```
