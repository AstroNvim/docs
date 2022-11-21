---
id: cmp
title: Customize cmp Completion
---

### Customize Keybindings

Some overrides require access to the plugin itself that you are overriding. This comes up a lot in things adding custom mappings to `cmp`. This can be achieved with the following in your `user/init.lua`:

```lua
return {
  plugins = {
    cmp = function(opts)
      -- opts parameter is the default options table
      -- the function is lazy loaded so cmp is able to be required
      local cmp = require "cmp"
      -- modify the mapping part of the table
      opts.mapping["<C-x>"] = cmp.mapping.select_next_item()

      -- return the new table to be used
      return opts
    end,
  },
}
```

### Customize Source Priority

We have provided a default set up for prioritizing different completions for `cmp`. These can be easily modified in the `user/init.lua` file:

:::tip

This table is an override table and the example below shows the defaults we have provided, so by listing only one of thse sources with a priority will make the others just assume the default value.

:::

```lua
return {
  cmp = {
    source_priority = {
      nvim_lsp = 1000,
      luasnip = 750,
      buffer = 500,
      path = 250,
    },
  },
}
```

By changing the number values you can change the priority (higher number == higher preference). These can also be controlled with boolean values for easily disabling a default source. In this case, `true` translates to high priority of 1000 and `false` translates to disabling a source. For example we can do a simple enable for `luasnip` and `nvim_lsp` which puts them both at equal hight priority, make `path` less of a priority, and disable `buffer`:

```lua
return {
  cmp = {
    source_priority = {
      nvim_lsp = true,
      luasnip = true,
      path = 500,
      buffer = false,
    },
  },
}
```

### Modify Existing Source Options

You may want to modify the options for the default provided `cmp` sources. This can be done by overriding the plugin's `config` function in the `plugin.init`. For example, if you want to make the `buffer` source display completions from all available buffers you could have a `user/init.lua` file like this:

```lua
return {
  plugins = {
    ["hrsh7th/cmp-buffer"] = {
      config = function()
        astronvim.add_user_cmp_source {
          name = "buffer",
          option = {
            get_bufnrs = function()
              return vim.api.nvim_list_bufs()
            end,
          },
        }
      end,
    },
  },
}
```

### Add More Sources

A user may want to include several new sources. We have provided a couple different easy ways to do this using the `plugins.init` table to install a `cmp` source plugin and some provided helper functions to add the source and it's priority. This is an example of a `user/init.lua` that adds emoji autocompletion:

```lua
return {
  plugins = {
    init = {
      {
        "hrsh7th/cmp-emoji",
        after = "nvim-cmp",
        config = function()
          astronvim.add_cmp_source("emoji", 700)
        end,
      },
    },
  },
}
```

:::tip

Instead of passing a string and a number to `add_cmp_source` you can pass a single table parameter with a full table with options

```lua
config = function()
  astronvim.add_cmp_source({ name = "emoji", priority = 700, keyword_length = 2, max_item_count = 7 })
end,
```

Here `priority` is optional as the `cmp.source_priority` table can be used to set the priority. If priority is specified in the `add_cmp_source` and the `cmp.source_priority` table the `cmp.source_priority` will take precedence.

:::

If you are adding several new sources in your `plugins.init` table this can make it hard to keep track of all of the priorities and how they are in relation to each other, so you can also use a helper function we have provided to extend the `cmp.source_priority` table. For example you can use the following code which adds both `emoji` and `pandoc_references` completions to `cmp`:

```lua
return {
  plugins = {
    init = {
      {
        "hrsh7th/cmp-emoji",
        after = "nvim-cmp",
        config = function()
          astronvim.add_user_cmp_source "emoji"
        end,
      },
      {
        "mehalter/cmp-pandoc-references",
        after = "nvim-cmp",
        config = function()
          astronvim.add_user_cmp_source "pandoc_references"
        end,
      },
    },
  },

  cmp = {
    source_priority = {
      nvim_lsp = 1000,
      luasnip = 750,
      emoji = 700,
      pandoc_references = 600,
      buffer = 500,
      path = 250,
    },
  },
}
```

:::tip

The default `cmp` sources are optional to provide here because they have default values tied to them, so using the following table would provide the same effect:

```lua
source_priority = {
  emoji = 700,
  pandoc_references = 600,
},
```

:::

### Advanced Setup For Filetype and Cmdline

`cmp` offers setting up custom sources for both `filetype` and `cmdline` (`cmp.setup.filetype()` and `cmp.setup.cmdline()` respectively). We have added a simple API for this as well in the user configuration. Here is a complete example for customizing these as well as getting the sources with the sources defined in the `user/init.lua` `cmp.source_priority` table:

:::caution

From my experience, the filetype detection does not work well with our lazy loading, so it's recommended to disable `cmp` lazy loading if you are using this feature. The way it works in our set up is `friendly-snippets` is lazy loaded when the user goes into insert mode and then `LuaSnip` and `cmp` follow in sequence. Therefore, you want to disable the lazy loading of `friendly-snippets` to get `cmp` to load on startup. This is included in the example below in the `plugins.init` table.

:::

```lua
return {
  plugins = {
    init = {
      -- Add lazy loading for command line
      -- that triggers the loading of cmp
      ["hrsh7th/nvim-cmp"] = { keys = { ":", "/", "?" } },
      -- add more custom sources
      ["hrsh7th/cmp-cmdline"] = { after = "nvim-cmp" },
      {
        "hrsh7th/cmp-emoji",
        after = "nvim-cmp",
        config = function()
          astronvim.add_user_cmp_source "emoji"
        end,
      },
    },
  },
  cmp = {
    -- set cmp source priorities
    source_priority = {
      nvim_lsp = 1000,
      luasnip = 750,
      emoji = 700,
      buffer = 500,
      path = 250,
    },
    setup = function()
      -- load cmp to access it's internal functions
      local cmp = require "cmp"
      local user_source = astronvim.get_user_cmp_source

      -- store a local variable with a source list to share between filetypes
      local prose_sources = {
        user_source "luasnip",
        user_source "buffer",
        user_source "emoji",
      }

      -- configure mappings for cmdline
      local fallback_func = function(func)
        return function(fallback)
          if cmp.visible() then
            cmp[func]()
          else
            fallback()
          end
        end
      end
      local mappings = cmp.mapping.preset.cmdline {
        ["<C-j>"] = { c = fallback_func "select_next_item" },
        ["<C-k>"] = { c = fallback_func "select_prev_item" },
      }
      local config = {
        -- configure cmp.setup.filetype(filetype, options)
        filetype = {
          -- first key is the filetype that you are setting up
          lua = { -- for lua only load lsp sources and buffer sources as a fallback
            sources = cmp.config.sources({
              user_source "nvim_lsp",
            }, {
              user_source "buffer",
            }),
          },
          -- markdown and latex share the same sources
          markdown = { sources = prose_sources },
          latex = { sources = prose_sources },
        },
        -- configure cmp.setup.cmdline(source, options)
        cmdline = {
          -- first key is the source that you are setting up
          [":"] = {
            -- set up custom mappings
            mapping = mappings,
            -- configure sources normally without getting priority from cmp.source_priority
            sources = cmp.config.sources({ { name = "path" } }, { { name = "cmdline" } })
          },
          ["/"] = { mapping = mappings, sources = { { name = "buffer" } } },
          ["?"] = { mapping = mappings, sources = { { name = "buffer" } } },
        },
      }
      -- return config
      return config
    end,
  },
}
```
