---
id: splitting_up
title: Splitting Up Configuration
---

AstroNvim can be fully configured using just the `user/init.lua` file, but also
supports easily being configured with separate files. These files will be
automatically detected if the file location corresponds to the location in the
`init.lua` table.

For example the plugins `plugins.init` override table (or
`function(table)...end`) can be placed in the file `user/plugins/init.lua`
which would be a `lua` file that returns the override `table` or
`function(table)...end`.

Example `user/plugins/init.lua` file:

```lua
return {
  { "andweeb/presence.nvim" },
  {
    "ray-x/lsp_signature.nvim",
    event = "BufRead",
    config = function()
      require("lsp_signature").setup()
    end,
  },
}
```

Another example would be adding a custom `lsp.on_attach` function, this could
be in a file `lsp/on_attach.lua` that returns a `function(client, bufnr)...end`
for example, if you want to run some code when a language server attaches:

```lua
return function(client, bufnr)
  -- run some code when a language server attaches
end
```

## Lazy Loaded Files

When separating these files into separate files they are lazy loaded by AstroNvim and only called when they are needed. This is particularly useful when configuring plugins when you may want to `require` them.

For example if you want to add bindings to `nvim-tree` that use the `nvim_tree_callback` function. This can be easily achieved with the file `plugins/nvim-tree.lua` with the contents:

```lua
local tree_cb = require("nvim-tree.config").nvim_tree_callback

return {
  view = {
    mappings = {
      custom_only = false,
      list = {
        { key = { "l", "<CR>", "o" }, cb = tree_cb "edit" },
        { key = "h", cb = tree_cb "close_node" },
        { key = "v", cb = tree_cb "vsplit" },
      },
    },
  },
}
```

## Example File Tree

A heavily modified AstroNvim setup that leverages these separate files could have a file structure as such:

```
user/
├── init.lua
├── astronvim_theme/
│   ├── init.lua
│   ├── colors.lua
│   └── highlights.lua
├── diagnostics.lua
├── lsp/
│   ├── on_attach.lua
│   ├── server_registration.lua
│   └── server-settings/
│       ├── texlab.lua
│       └── yamlls.lua
├── luasnip.lua
├── plugins/
|   ├── init.lua
|   ├── null-ls.lua
│   ├── bufferline.lua
│   ├── which-key.lua
|   ├── packer.lua
|   ├── aerial.lua
|   ├── telescope.lua
|   ├── toggleterm.lua
|   ├── treesitter.lua
│   └── nvim-tree.lua
└── which-key/
    └── register_n_leader.lua
```
