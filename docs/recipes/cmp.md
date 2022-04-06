---
id: cmp
title: Custom cmp Bindings
---

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
