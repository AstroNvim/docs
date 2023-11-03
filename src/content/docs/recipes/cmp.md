---
id: cmp
title: Customize cmp Completion
---

AstroNvim comes with [nvim-cmp](https://github.com/hrsh7th/nvim-cmp) for powering completion out of the box. This page documents common configuration options such as custom keybindings or adding more sources.

### Customize Keybindings

Some overrides require access to the plugin itself that you are overriding. This comes up a lot in things adding custom mappings to `cmp`. This can be achieved with the following plugin spec:

```lua
return { -- override nvim-cmp plugin
  "hrsh7th/nvim-cmp",
  -- override the options table that is used in the `require("cmp").setup()` call
  opts = function(_, opts)
    -- opts parameter is the default options table
    -- the function is lazy loaded so cmp is able to be required
    local cmp = require("cmp")
    -- modify the mapping part of the table
    opts.mapping["<C-x>"] = cmp.mapping.select_next_item()

    -- return the new table to be used
    return opts
  end,
}
```

### Customize Source Priority

Similarly to customizing mappings, you can customize and configure your `cmp` sources as well:

```lua
return { -- override nvim-cmp plugin
  "hrsh7th/nvim-cmp",
  -- override the options table that is used in the `require("cmp").setup()` call
  opts = function(_, opts)
    -- opts parameter is the default options table
    -- the function is lazy loaded so cmp is able to be required
    local cmp = require("cmp")
    -- modify the sources part of the options table
    opts.sources = cmp.config.sources({
      { name = "nvim_lsp", priority = 1000 },
      { name = "luasnip", priority = 750 },
      { name = "buffer", priority = 500 },
      { name = "path", priority = 250 },
    })

    -- return the new table to be used
    return opts
  end,
}
```

### Modify Existing Source Options

You can use this `cmp` override to also customize the options of the sources:

```lua
return { -- override nvim-cmp plugin
  "hrsh7th/nvim-cmp",
  -- override the options table that is used in the `require("cmp").setup()` call
  opts = function(_, opts)
    -- opts parameter is the default options table
    -- the function is lazy loaded so cmp is able to be required
    local cmp = require("cmp")
    -- modify the sources part of the options table
    opts.sources = cmp.config.sources({
      { name = "nvim_lsp", priority = 1000 },
      { name = "luasnip", priority = 750 },
      {
        name = "buffer",
        priority = 500,
        option = {
          get_bufnrs = function()
            return vim.api.nvim_list_bufs()
          end,
        },
      },
      { name = "path", priority = 250 },
    })

    -- return the new table to be used
    return opts
  end,
}
```

### Add More Sources

To add more sources than the default, you can add other `cmp` source plugins as dependencies, and then add the new source in the `opts`:

```lua
return { -- override nvim-cmp plugin
  "hrsh7th/nvim-cmp",
  dependencies = {
    "hrsh7th/cmp-emoji", -- add cmp source as dependency of cmp
  },
  -- override the options table that is used in the `require("cmp").setup()` call
  opts = function(_, opts)
    -- opts parameter is the default options table
    -- the function is lazy loaded so cmp is able to be required
    local cmp = require("cmp")
    -- modify the sources part of the options table
    opts.sources = cmp.config.sources({
      { name = "nvim_lsp", priority = 1000 },
      { name = "luasnip", priority = 750 },
      { name = "buffer", priority = 500 },
      { name = "path", priority = 250 },
      { name = "emoji", priority = 700 }, -- add new source
    })

    -- return the new table to be used
    return opts
  end,
}
```

### Advanced Setup For Filetype and Cmdline

You can also use the `config` function and the provided default configuration function for each plugin to extend the configuration and setup of `cmp` like adding `cmp-cmdline`:

```lua
return { -- override nvim-cmp plugin
  "hrsh7th/nvim-cmp",
  keys = { ":", "/", "?" }, -- lazy load cmp on more keys along with insert mode
  dependencies = {
    "hrsh7th/cmp-cmdline", -- add cmp-cmdline as dependency of cmp
  },
  config = function(plugin, opts)
    local cmp = require("cmp")
    -- run cmp setup
    cmp.setup(opts)

    -- configure `cmp-cmdline` as described in their repo: https://github.com/hrsh7th/cmp-cmdline#setup
    cmp.setup.cmdline("/", {
      mapping = cmp.mapping.preset.cmdline(),
      sources = {
        { name = "buffer" },
      },
    })
    cmp.setup.cmdline(":", {
      mapping = cmp.mapping.preset.cmdline(),
      sources = cmp.config.sources({
        { name = "path" },
      }, {
        {
          name = "cmdline",
          option = {
            ignore_cmds = { "Man", "!" },
          },
        },
      }),
    })
  end,
}
```
