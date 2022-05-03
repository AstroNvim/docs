---
id: config_options
title: Available User Options
---

| `init.lua` table key              | Expected Format                    | Use Case                                                                                      |
| --------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `colorscheme`                     | `string`                           | The colorscheme to be set                                                                     |
| `options`                         | `table` or `function(table)...end` | The `vim.x.y` variables to be set                                                             |
| `header`                          | table of `string`s                 | The header to be displayed on the Dashboard                                                   |
| `ui.nui_input`                    | `boolean`                          | Whether or not to enable using NUI for vim.ui.input                                           |
| `ui.telescope_select`             | `boolean`                          | Whether or not to enable using Telescope for vim.ui.select                                    |
| `polish`                          | `function()...end`                 | Lua function to be run last. Good place for setting vim options and adding mappings           |
| `default_theme.diagnostics_style` | `table` or `string`                | Set highlight style options for virtual text                                                  |
| `default_theme.colors`            | `table` or `function(table)...end` | Modify the default theme's color table                                                        |
| `default_theme.highlights`        | `table` or `function(table)...end` | Modify the default theme's highlight groups                                                   |
| `diagnostics`                     | `table` or `function(table)...end` | Modify the default vim diagnostics options                                                    |
| `luasnip`                         | `table` or `function(table)...end` | Modify available `luasnip` options                                                            |
| `plugins.init`                    | `table` or `function(table)...end` | Modify the default plugins table such as adding new plugins                                   |
| `plugins.aerial`                  | `table` or `function(table)...end` | Modify the `aerial.setup()` options                                                           |
| `plugins.autopairs`               | `table` or `function(table)...end` | Modify the `autopairs.setup()` options                                                        |
| `plugins.better_escape`           | `table` or `function(table)...end` | Modify the `better_escape.setup()` options                                                    |
| `plugins.bufferline`              | `table` or `function(table)...end` | Modify the `bufferline.setup()` options                                                       |
| `plugins.cmp`                     | `table` or `function(table)...end` | Modify the `cmp.setup()` options                                                              |
| `plugins.colorizer`               | `table` or `function(table)...end` | Modify the `colorizer.setup()` options                                                        |
| `plugins.Comment`                 | `table` or `function(table)...end` | Modify the `Comment.setup()` options                                                          |
| `plugins.gitsigns`                | `table` or `function(table)...end` | Modify the `gitsigns.setup()` options                                                         |
| `plugins.nvim-web-devicons`       | `table` or `function(table)...end` | Modify the `nvim-web-devicons.setup()` options                                                |
| `plugins.indent_blankline`        | `table` or `function(table)...end` | Modify the `indent_blankline.setup()` options                                                 |
| `plugins.indent-o-matic`          | `table` or `function(table)...end` | Modify the `indent-o-matic.setup()` options                                                   |
| `plugins.lualine`                 | `table` or `function(table)...end` | Modify the `lualine.setup()` options                                                          |
| `plugins.neoscroll`               | `table` or `function(table)...end` | Modify the `neoscroll.setup()` options                                                        |
| `plugins.neo-tree`                | `table` or `function(table)...end` | Modify the `neo-tree.setup()` options                                                         |
| `plugins.telescope`               | `table` or `function(table)...end` | Modify the `telescope.setup()` options                                                        |
| `plugins.toggleterm`              | `table` or `function(table)...end` | Modify the `toggleterm.setup()` options                                                       |
| `plugins.treesitter`              | `table` or `function(table)...end` | Modify the `treesitter.setup()` options                                                       |
| `plugins.which-key`               | `table` or `function(table)...end` | Modify the `which-key.setup()` options                                                        |
| `which-key.register_mappings`     | `table` or `function(table)...end` | Modify the default which-key bindings                                                         |
| `which-key.register_n_leader`     | `table` or `function(table)...end` | Modify the default which-key normal mode bindings with `<leader>` prefix                      |
| `cmp.source_priority`             | `table` or `function(table)...end` | Modify the default cmp sources and their priorities                                           |
| `lsp.servers`                     | `table` or `function(table)...end` | List of language servers to be set up that are already installed without `nvim-lsp-installer` |
| `lsp.server-settings.<lsp>`       | `table` or `function(table)...end` | Modify the LSP server settings, replace `<lsp>` with server name                              |
| `lsp.on_attach`                   | `function(client, bufnr)...end`    | Modify the lsp `on_attach` function                                                           |
| `lsp.server_registration`         | `function(server, opts)...end`     | Modify the `lsp-installer` `server_registration` function                                     |
