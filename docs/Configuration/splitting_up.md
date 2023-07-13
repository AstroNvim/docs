---
id: splitting_up
title: Splitting Up Configuration
---

AstroNvim can be fully configured using just the `user/init.lua` file, but also
supports easily being configured with separate files. These files will be
automatically detected if the file location corresponds to the location in the
`init.lua` table.

For example the `mappings` override table (or
`function(table)...end`) can be placed in the file `user/mappings.lua`
which would be a `lua` file that returns the override `table` or
`function(table)...end`.

Example `user/mappings.lua` file:

```lua
return {
  n = {
    ["<leader>q"] = { "<cmd>q<cr>", desc = "Quit" },
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

:::tip

A full example of a split up user configuration can be found on our GitHub at [AstroNvim/user_example](https://github.com/AstroNvim/user_example)

:::

## Example File Tree

A heavily modified AstroNvim setup that leverages these separate files could have a file structure as such:

```
user/
├── init.lua
├── options.lua
├── highlights/
│   └── init.lua
├── diagnostics.lua
├── lsp/
│   ├── on_attach.lua
│   ├── setup_handlers.lua
│   └── config/
│       ├── texlab.lua
│       └── yamlls.lua
├── mappings.lua
└── plugins/
    └── init.lua
```
