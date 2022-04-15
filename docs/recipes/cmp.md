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
          require("core.utils").add_cmp_source("emoji", 700)
        end,
      },
    },
  },
}
```

If you are adding several new sources in your `plugins.init` table this can make it hard to keep track of all of the priorities and how they are in relation to each other, so you can also use a helper function we have provided to extend the `cmp.source_priority` table. For example you can use the following code which adds both `emoji` and `pandoc_references` completions to `cmp`:

```lua
return {
  plugins = {
    init = {
      {
        "hrsh7th/cmp-emoji",
        after = "nvim-cmp",
        config = function()
          require("core.utils").add_user_cmp_source "emoji"
        end,
      },
      {
        "mehalter/cmp-pandoc-references",
        after = "nvim-cmp",
        config = function()
          require("core.utils").add_user_cmp_source "pandoc_references"
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
