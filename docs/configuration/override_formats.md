---
id: override_formats
title: Override Formats
---

This applies to all `init.lua` fields except those that expect specific
function definitions such as `null-ls`, `lsp.on_attach`,
`lsp.server_registration`, and `polish`.

Anywhere where you want to override a default provided lua table such as
`plugins.init` (specifying user plugins) or `plugins.X` where `X` is a default
plugin where you want to override the `setup()` call.

### Override Table

For most use cases, supplying a table is more than enough for supplying your
own configuration changes to a default table. This is done by simply providing
a new table and we merge the table with the default table where the user table
takes precedence.

For example, the `plugins.init` table can be used to add new plugins to be
installed along side the default plugins:

```lua
plugins = {
  init = {
    { "andweeb/presence.nvim" }, -- each table entry is a plugin using the Packer syntax without the "use"
    {
      "ray-x/lsp_signature.nvim",
      event = "BufRead",
      config = function()
        require("lsp_signature").setup()
      end,
    },
  },
},
```

Or adding new normal mode `<leader>` bindings to `which-key`:

```lua
["which-key"] = {
  register_n_leader = {
    ["N"] = { "<cmd>tabnew<cr>", "New Buffer" },
  },
},
```

### Override Function

There may be cases where you want to have more control over the default tables
when overriding them. For these situations we also provide the ability to use a
`function` that takes one parameter (the default table) and returns a new table
to be used in it's place. This method is a lot more advanced and requires
knowledge of the Lua programming language.

For example with `plugins.init`, you may want to disable lazy-loading for a default plugin while also providing your own plugins:

```lua
plugins = {
  init = function(default_plugins)
    -- A table for your own plugins to load
    local my_plugins = {
      { "andweeb/presence.nvim" },
      {
        "ray-x/lsp_signature.nvim",
        event = "BufRead",
        config = function()
          require("lsp_signature").setup()
        end,
      },
    }

    -- The default plugin table is indexable by the package github username/repository
    -- You can directly modify the default table and remove the Packer "cmd" configuration
    default_plugins["akinsho/nvim-toggleterm.lua"]["cmd"] = nil

    -- Finally  you will want to add the my_plugins table to the default table and return it
    return vim.tbl_deep_extend("force", plugins, my_plugins)
  end,
},
```

_Note_: These functions are called when they are needed are are lazy-loaded, so
for example if you are using `plugins.cmp` with a function
(`function(table)...end`), this will be run after `cmp` is loaded and you will
be able to do `cmp = require("cmp")` within the function.
