---
id: custom_plugins
title: Custom Plugins
---

## Defining Plugins

Plugins can be added in your user configuration either in `user/init.lua` in the `plugins.init` table or if you are separating your configuration in `user/plugins.init.lua` file.

:::tip

Any time you modify `plugins.init` or `user/plugins/init.lua` file make sure you restart and run `:PackerSync` to commit these changes to your packer compilation file.

:::

To see all available options in Packer please refer to the [Packer Documentation](https://github.com/wbthomason/packer.nvim#specifying-plugins)

```lua
-- Packer syntax
-- =============
use {
  "williamboman/mason.nvim",
  cmd = "Mason",
}

-- AstroNvim's Syntax (Preferred)
-- ==============================

-- This key/value notation will allow overriding core plugin
-- specifications as well as defining new user plugins
["williamboman/mason.nvim"] = {
  cmd = "Mason",
},

-- Specifying a plugins with key/value without any options
["williamboman/mason.nvim"] = {},


-- Other Syntaxes that are supported, but not recommended
-- ======================================================

-- you can specify the default Packer Syntax without the `use`
-- this works completely fine, but is less error prone. If you
-- specify this with a default plugin, it will not be able to override
-- and will add the plugin twice to the Packer table
{
  "williamboman/mason.nvim",
  cmd = "Mason",
},

-- if there is a plugin you want to add without any options, you can
-- simply just add the string and it will be added, this has the same
-- caveat of the previous syntax where it will not be able to tell if
-- it is a duplicate or not, so use with caution
"williamboman/mason.nvim",
```

### Overriding Core Plugins

This key/value notation allows you to override the specifications for core plugins as well. This is mostly used for disabling core plugins that you do not want to be used, but could also be used to disable/change lazy loading or anything. Here is a simple example disabling a core plugin such as `alpha`:

```lua
["goolord/alpha-nvim"] = { disable = true },
```

### Full Example

Here is a simple `user/init.lua` file that just defines a plugin in the `plugins.init` table:

```lua
return {
  plugins = {
    init = {
      ["catppuccin/nvim"] = { as = "catppuccin" },
    },
  },
}
```

Here is the same plugin being added to `user/plugins/init.lua` file if you prefer separating out your configuration files:

```lua
return {
  ["catppuccin/nvim"] = { as = "catppuccin" },
}
```

## Lazy Loading

For maintaining a fast startup time, it is recommended to do lazy loading which is easily configurable in Packer. There are a few basic methods of lazy loading that can be easily added. The main keys here are `cmd`, `module`, `ft`, `keys`, `event`, `after`. More details of these and more options can be found in the [Packer Documentation](https://github.com/wbthomason/packer.nvim#specifying-plugins). Here are a few examples:

```lua
return {
  plugins = {
    init = {
      -- this plugin will be loaded the first time `require("smart-splits")` is run
      ["mrjones2014/smart-splits.nvim"] = { module = "smart-splits" },

      -- this plugin will be loaded on the autocmd event "UIEnter"
      ["rcarriga/nvim-notify"] = { event = "UIEnter" },

      -- this plugin will be loaded when using `:Bdelete` and `:Bwipeout`
      ["famiu/bufdelete.nvim"] = { cmd = { "Bdelete", "Bwipeout" } },

      -- this plugin will be loaded immediately after `nvim-cmp`
      ["hrsh7th/cmp-buffer"] = { after = "nvim-cmp" },
    }
  }
}
```

### Lazy Load File Related Plugins

AstroNvim has many plugins that we load on the first real file that is open. This is used internally for plugins like Treesitter, LSP related plugins, and other various plugins related to interacting with files. Because of this we have added some internal mechanisms to make it easy to add this specific type of lazy loading. To do this you simply want to mark the plugin as optional with the `opt` key and then use the `setup` key to add the plugin name to the table `astronvim.file_plugins`. Here is a simple example:

```lua
["NvChad/nvim-colorizer.lua"] = {
  opt = true,
  setup = function() table.insert(astronvim.file_plugins, "nvim-colorizer.lua") end,
},

```

This will tell AstroNvim that this plugin should be loaded with the other file related plugins on the opening of the first real file.

### Lazy Load Git Plugins

Similar to the file related plugins described above, we also have a similar hook for git related plugins. These shouldn't be loaded until a file is open that is in a git repository folder. We use this for stuff like the `gitsigns` plugin. This will check when a file is opened if it is in a git tracked folder and then load the plugin. You just need to mark the plugin as optional with `opt` key and then use the `setup` key to add the plugin name to the table `astronvim.git_plugins`. **This does require access to the `git` command in your `PATH`.**

```lua
["lewis6991/gitsigns.nvim"] = {
  opt = true,
  setup = function() table.insert(astronvim.git_plugins, "gitsigns.nvim") end,
},
```
