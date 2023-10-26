---
id: mappings
title: Customize Mappings
---

::::danger

UNVALIDATED: NEED UPDATING FOR V4

::::

### Add Custom Mappings

Mappings can be added in one of two locations in your `user/init.lua` file. Either the `mappings` table or the `lsp.mappings` table (`user/mappings.lua` and `user/lsp/mappings.lua` files respectively in a split user configuration). The only difference between these two tables is that the `mappings` table is set globally and `lsp.mappings` get set only in buffers that a language server is being attached to. These tables are a direct conversion to the `vim.keymap.set({mode}, {lhs}, {rhs}, {opts})` Lua API. The first key into the table is the `{mode}`, the second key into the table is the `{lhs}`, and the element there is the `{opts}` table with the `{rhs}` in the first key. Here is a simple example `user/init.lua` file:

```lua
return {
  lsp = {
    mappings = {
      n = {
        -- this mapping will only be set in buffers with an LSP attached
        K = { function() vim.lsp.buf.hover() end, desc = "Hover symbol details" },
      },
    },
  },
  mappings = {
    -- first key is the mode
    n = {
      -- second key is the lefthand side of the map
      -- mappings seen under group name "Buffer"
      ["<leader>bn"] = { "<cmd>tabnew<cr>", desc = "New tab" },
      ["<leader>bD"] = {
        function()
          require("astronvim.utils.status").heirline.buffer_picker(
            function(bufnr) require("astronvim.utils.buffer").close(bufnr) end
          )
        end,
        desc = "Pick to close",
      },
      -- tables with the `name` key will be registered with which-key if it's installed
      -- this is useful for naming menus
      ["<leader>b"] = { name = "Buffers" },
      -- quick save
      -- ["<C-s>"] = { ":w!<cr>", desc = "Save File" },  -- change description but the same command
    },
    t = {
      -- setting a mapping to false will disable it
      -- ["<esc>"] = false,
    },
  },
}
```

### Disable Telescope LSP Mappings

We use Telescope for some of the LSP mappings, but this can be easily disabled in the `lsp.mappings` table. We conditionally add mappings based on the client, so you'll want to check to make sure the mappings exist, and if they do, revert them back to the original `vim.lsp.buf` API calls:

```lua
return {
  lsp = {
    mappings = function(maps)
      if maps.n.gd then maps.n.gd[1] = function() vim.lsp.buf.definition() end end
      if maps.n.gI then maps.n.gI[1] = function() vim.lsp.buf.implementation() end end
      if maps.n.gr then maps.n.gr[1] = function() vim.lsp.buf.references() end end
      if maps.n.gy then maps.n.gy[1] = function() vim.lsp.buf.type_definition() end end
      if maps.n["<leader>lG"] then maps.n["<leader>lG"][1] = function() vim.lsp.buf.workspace_symbol() end end
      if maps.n["<leader>lR"] then maps.n["<leader>lR"][1] = function() vim.lsp.buf.references() end end

      return maps
    end,
  },
}
```
