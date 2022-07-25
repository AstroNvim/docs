---
id: override_formats
title: Override Formats
---

This applies to all `init.lua` fields except those that expect specific
function definitions such as `lsp.on_attach`, `lsp.server_registration`, and `polish`.

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

Or adding new bindings to `which-key` for top level menu:

```lua
["which-key"] = {
  register_mappings = {
    n = { -- normal mode
      ["<leader>"] = { -- leader prefix
        ["N"] = { "<cmd>tabnew<cr>", "New Buffer" }, -- normal mode, <leader>N
      },
    }
  },
},
```

Or adding new bindings to `which-key` for top and second level menu:
```lua
-- Modify which-key registration
["which-key"] = {
  -- Add bindings which show up as group
  register_mappings = {
    -- first key is the mode, n == normal mode
    n = {
      -- second key is the prefix, <leader> prefixes
      ["<leader>"] = {
        ["b"] = { name = "Buffer" },
      },
    },
  },
},

mappings = {
  -- first key is the mode
  n = {
    -- second key is the lefthand side of the map
    -- Install ncdu package, Disk size w/o snapshot btrfs subvolumes and .git
    ["<leader>tu"] = { function() astronvim.toggle_term_cmd "ncdu -x --exclude .git" end, desc = "Term for NCDU w/o junks" },
    -- Install mc package
    ["<leader>tm"] = { function() astronvim.toggle_term_cmd "mc . ~" end, desc = "Term for MC" },
    -- Install libreply-perl + libterm-readline-gnu-perl packages
    ["<leader>tp"] = { function() astronvim.toggle_term_cmd "reply" end, desc = "Term for perl5 REPL" },
    -- BUffer
    ["<leader>bb"] = { "<cmd>tabnew<cr>", desc = "New tab" },
    ["<leader>bc"] = { "<cmd>BufferLinePickClose<cr>", desc = "Pick to close" },
    ["<leader>bd"] = { "<cmd>BufferLineSortByDirectory<cr>", desc = "Sort by directory" },
    ["<leader>bD"] = { "<cmd>BufferLineSortByRelativeDirectory<cr>", desc = "Sort by rel. dir." },
    ["<leader>be"] = { "<cmd>BufferLineSortByExtension<cr>", desc = "Sort by extention" },
    ["<leader>bf"] = { "<cmd>Telescope buffers<cr>", desc = "Find" },
    ["<leader>bj"] = { "<cmd>BufferLinePick<cr>", desc = "Pick to jump" },
    ["<leader>bl"] = { "<cmd>BufferLineCloseLeft<cr>", desc = "Close left-side" },
    ["<leader>bn"] = { "<cmd>BufferLineCycleNext<cr>", desc = "Next" },
    ["<leader>bp"] = { "<cmd>BufferLineCyclePrev<cr>", desc = "Previous" },
    ["<leader>br"] = { "<cmd>BufferLineCloseRight<cr>", desc = "Close right-side" },
    ["<leader>bt"] = { "<cmd>BufferLineSortByTabs<cr>", desc = "Sort by tabs" },
  },
},
```

:::tip
Please pay attention to the use of `name` and `desc` or lack of them.
:::

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
