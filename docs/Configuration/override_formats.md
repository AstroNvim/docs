---
id: override_formats
title: Override Formats
---

This applies to all `init.lua` fields except those that expect specific
definitions such as `lsp.on_attach`, `lsp.server_registration`, and `polish`.

### Override Table

For most use cases, supplying a table is more than enough for supplying your
own configuration changes to a default table. This is done by simply providing
a new table and we merge the table with the default table where the user table
takes precedence.

For example, the `plugins` table can be used to add new plugins to be
installed along side the default plugins:

```lua
plugins = {
  { "andweeb/presence.nvim" }, -- each table entry is a plugin specification for lazy.nvim
  {
    "ray-x/lsp_signature.nvim",
    event = "BufRead",
    config = function()
      require("lsp_signature").setup()
    end,
  },
},
```

For adding new key mappings and updating which-key menu, the `mapping` table is used to extend existing configuration.

```lua
mappings = {
  -- first key is the mode
  -- desc setting is stored by vim.keymap.set() as a part of opts table in vim lua module
  n = {
    -- second key is the lefthand side of the map
    -- Buffer
    ["<leader>bb"] = { "<cmd>tabnew<cr>", desc = "New tab" },
    ["<leader>bc"] = { "<cmd>BufferLinePickClose<cr>", desc = "Pick to close" },
    ["<leader>bj"] = { "<cmd>BufferLinePick<cr>", desc = "Pick to jump" },
    -- a table with the `name` key will register with which-key if it's available
    -- this an easy way to add menu titles in which-key
    ["<leader>b"] = { name = "Buffer" },
    -- quick save
    -- ["<C-s>"] = { ":w!<cr>", desc = "Save File" },  -- change description but the same command
  },
  t = {
    -- setting a mapping to false will disable it
    -- ["<esc>"] = false,
  },
},
```

:::tip
Please pay attention to the use of `name` and `desc` used in the above.
:::

### Override Function

There may be cases where you want to have more control over the default tables
when overriding them. For these situations we also provide the ability to use a
`function` that takes one parameter (the default table) and returns a new table
to be used in it's place. This method is a lot more advanced and requires
knowledge of the Lua programming language.

For example with the `options` table, you may want to use the function notation to unset a default option that we set:

```lua
options = function(local_vim) -- parameter is the default table to be overridden
  -- nil is the same as a key not being set, so you cannot use nil reliably
  -- when using the table override notation
  local_vim.clipboard = nil -- set a value to nil to remove it from the table
  -- return modified table
  return local_vim
end,
```
