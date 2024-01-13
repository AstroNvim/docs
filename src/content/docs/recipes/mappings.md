---
id: mappings
title: Customize Mappings
---

Mappings can be customized through [AstroCore](https://github.com/AstroNvim/astrocore) and [AstroLSP](https://github.com/AstroNvim/astrolsp). AstroCore handles the general mappings that are applied to the editor where AstroLSP handles mappings that are set when a language server attaches. This page goes over how to customize these mappings to fit your needs.

### Add Custom Mappings

These tables are a direct conversion to the `vim.keymap.set({mode}, {lhs}, {rhs}, {opts})` Lua API. The first key into the table is the `{mode}`, the second key into the table is the `{lhs}`, and the element there is the `{opts}` table with the `{rhs}` in the first key. Also AstroLSP supports adding a `cond` key which can dictate when the mapping should be attached (this is described in detail in the [AstroLSP plugin configuration documentation](https://github.com/AstroNvim/astrolsp#%EF%B8%8F-configuration)) Here is a simple plugin specification example of setting both core and LSP mappings:

```lua title="lua/plugins/mappings.lua"
return {
  {
    "AstroNvim/astrocore",
    ---@type AstroCoreOpts
    opts = {
      mappings = {
        -- first key is the mode
        n = {
          -- second key is the lefthand side of the map
          -- mappings seen under group name "Buffer"
          ["<Leader>bn"] = { "<cmd>tabnew<cr>", desc = "New tab" },
          ["<Leader>bD"] = {
            function()
              require("astroui.status").heirline.buffer_picker(
                function(bufnr)
                  require("astrocore.buffer").close(bufnr)
                end
              )
            end,
            desc = "Pick to close",
          },
          -- tables with the `name` key will be registered with which-key if it's installed
          -- this is useful for naming menus
          ["<Leader>b"] = { name = "Buffers" },
          -- quick save
          -- ["<C-s>"] = { ":w!<cr>", desc = "Save File" },  -- change description but the same command
        },
        t = {
          -- setting a mapping to false will disable it
          -- ["<esc>"] = false,
        },
      },
    },
  },
  {
    "AstroNvim/astrolsp",
    ---@type AstroLSPOpts
    opts = {
      mappings = {
        n = {
          -- this mapping will only be set in buffers with an LSP attached
          K = {
            function()
              vim.lsp.buf.hover()
            end,
            desc = "Hover symbol details",
          },
          -- condition for only server with declaration capabilities
          gD = {
            function()
              vim.lsp.buf.declaration()
            end,
            desc = "Declaration of current symbol",
            cond = "textDocument/declaration",
          },
        },
      },
    },
  },
}
```

### Disable Telescope LSP Mappings

We use Telescope for some of the LSP mappings, but this can be easily disabled through AstroLSP. Here is an example specification that can be added to your plugins:

```lua title="lua/plugins/astrolsp.lua"
return {
  "AstroNvim/astrolsp",
  ---@param opts AstroLSPOpts
  opts = function(_, opts)
    opts.mappings.n.gd[1] = function()
      vim.lsp.buf.definition()
    end
    opts.mappings.n.gI[1] = function()
      vim.lsp.buf.implementation()
    end
    opts.mappings.n.gr[1] = function()
      vim.lsp.buf.references()
    end
    opts.mappings.n.gT[1] = function()
      vim.lsp.buf.type_definition()
    end
    opts.mappings.n["<Leader>lG"][1] = function()
      vim.lsp.buf.workspace_symbol()
    end
    opts.mappings.n["<Leader>lR"][1] = function()
      vim.lsp.buf.references()
    end
  end,
}
```
