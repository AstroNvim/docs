---
id: config_options
title: Available User Options
---

::::danger

UNVALIDATED: NEED UPDATING FOR V4
This page should be migrated to a page regarding core plugins from the AstroNvim team: AstroCore, AstroUI, and AstroLSP

::::

| `user/init.lua` table key  | Expected Format            | Use Case                                                                                                                   | Alternate File Path (in `user/` folder) |
| -------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `colorscheme`              | `string`                   | The colorscheme to be set                                                                                                  | `colorscheme.lua`                       |
| `diagnostics`              | `table`, `function(table)` | Modify the default vim diagnostics options                                                                                 | `diagnostics.lua`                       |
| `heirline.attributes`      | `table`, `function(table)` | Modify the section highlight attributes used by Heirline                                                                   | `heirline/attributes.lua`               |
| `heirline.colors`          | `table`, `function(table)` | Modify the section colors used by Heirline                                                                                 | `heirline/colors.lua`                   |
| `heirline.icon_highlights` | `table`, `function(table)` | Modify which components should do dynamic icon highlighting Heirline                                                       | `heirline/icon_highlights.lua`          |
| `heirline.separators`      | `table`, `function(table)` | Modify the section separators used by Heirline                                                                             | `heirline/separators.lua`               |
| `highlights.init`          | `table`, `function(table)` | Custom highlight groups for the all colorschemes                                                                           | `highlights/init.lua`                   |
| `highlights.<colorscheme>` | `table`, `function(table)` | Custom highlight groups for the specified theme, replace `<colorscheme>` with colorscheme name                             | `highlights/<colorscheme>.lua`          |
| `icons`                    | `table`, `function(table)` | Customize the icons used in the user interface                                                                             | `icons.lua`                             |
| `lazy`                     | `table`, `function(table)` | Modify the default lazy.nvim `setup` configuration table                                                                   | `lazy.lua`                              |
| `lsp.capabilities`         | `table`, `function(table)` | Modify the default LSP `capabilities` table                                                                                | `lsp/capabilities.lua`                  |
| `lsp.config.<lsp>`         | `table`, `function(table)` | Modify the LSP server settings, replace `<lsp>` with server name                                                           | `lsp/config/<lsp>.lua`                  |
| `lsp.flags`                | `table`, `function(table)` | Modify the default LSP `flags` table                                                                                       | `lsp/flags.lua`                         |
| `lsp.formatting`           | `table`, `function(table)` | Modify the formatting options described in the [LSP Configuration Page](../../recipes/advanced_lsp#controlling-formatting) | `lsp/formatting.lua`                    |
| `lsp.mappings`             | `table`, `function(table)` | Modify the buffer mappings that are set when a language server attaches                                                    | `lsp/mappings.lua`                      |
| `lsp.on_attach`            | `function(client, bufnr)`  | Modify the default LSP `on_attach` function                                                                                | `lsp/on_attach.lua`                     |
| `lsp.servers`              | `table`, `function(table)` | List of language servers to be set up that are already installed without `mason`                                           | `lsp/servers.lua`                       |
| `lsp.setup_handlers`       | `table`, `function(table)` | Modify the `lspconfig` setup handler for a given language server, each key in the table should be a language server        | `lsp/setup_handlers.lua`                |
| `lsp.skip_setup`           | `table`, `function(table)` | List of language servers to guarantee the `lspconfig` setup is never called on automatically                               | `lsp/skip_setup.lua`                    |
| `mappings`                 | `table`, `function(table)` | Modify the mappings table                                                                                                  | `mappings.lua`                          |
| `options`                  | `table`, `function(table)` | The `vim.x.y` variables to be set                                                                                          | `options.lua`                           |
| `plugins`                  | `table`                    | Modify the `lazy.nvim` plugin specifications                                                                               | `plugins/<any_files>.lua`               |
| `polish`                   | `function()`               | Lua function to be run last. Good place for setting vim options and adding mappings                                        | `polish.lua`                            |
| `text_icons`               | `table`, `function(table)` | Customize the text based icons used in the user interface when `vim.g.icons_enabled = false`                               | `text_icons.lua`                        |
| `updater`                  | `table`, `function(table)` | The configuration for the AstroNvim updater                                                                                | `updater.lua`                           |
