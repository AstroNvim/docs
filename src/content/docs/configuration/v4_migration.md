---
id: v4_migration
title: Migration to v4.0
---

The largest change between AstroNvim v3 and v4 is the transition towards shipping AstroNvim as a pack of plugins which can be distributed, updated, and configured entirely through the [`lazy.nvim` plugin manager](https://github.com/folke/lazy.nvim). Rather than cloning AstroNvim and then configuring everything through a `user/` folder inside a configuration you download, you simply set up your own Neovim configuration with `lazy.nvim`, add AstroNvim, and then import it's plugins. Nearly all of the configuration after that is done through the configuration of plugins with `lazy.nvim`. This page will help guide you through migrating your user configuration from your previous `user/` folder to your own neovim configuration that utilizes AstroNvim v4.

## Setting Up a Migration Environment

With upgrading requiring dealing with breaking changes to your text editor configuration, we recommend setting up an isolated environment to safely migrate over your configuration at whatever pace you need. On the Alternative Installation reference page we have a section for setting up an [Isolated Installation](/reference/alt_install/#isolated-installation) which we would highly recommend using to do the migration from AstroNvim v3 to v4 so it does not interrupt your editor workflow and allows you to take your time. Here are some example steps to get started with a migration:

1. Clone the new AstroNvim v4 template to a new configuration location:

   ```sh
   git clone https://github.com/AstroNvim/template ~/.config/astronvim_v4
   rm -rf ~/.config/astronvim_v4/.git
   ```

2. Run the new environment:

   ```sh
   NVIM_APPNAME=astronvim_v4 nvim
   ```

3. Migrate your AstroNvim v3 configuration to your new AstroNvim v4 environment at `~/.config/astronvim_v4`. You can use your AstroNvim v3 setup to do the editing and then continue running the command in Step 2 to test the new installation.

4. Once you have your configuration set up how you like it, simply move it over to the default neovim configuration location:

   ```sh
   mv ~/.config/nvim ~/.config/nvim.bak # backup old config
   mv ~/.config/astronvim_v4 ~/.config/nvim # move new config
   ```

5. Run your new v4 environment simply with `nvim`

## Migration Guide

:::danger

Currently this is the old v3 migration guide, this should be updated to migrating to v4

:::

## Old Configuration Options

These need to be converted into mappings from v3 to their locations in AstroCore/AstroUI/AstroLSP

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

## Migrating User Configuration

- **Plugin Manager Change:** With v3 we have moved away from Packer and to the new [lazy.nvim](https://github.com/folke/lazy.nvim). The options for lazy can be configured with the `lazy` user option. We have also removed all abstraction away from the plugin specifications. So the lazy.nvim docs can be referred to for the format of adding new plugins. You can also check the updated [Customizing Plugins Documentation](../custom_plugins) for defining new plugins as well as overriding core plugins.

  - Lazy also handles overriding options and setup functions automatically so we have removed all of the `plugins.X` user options for overriding the setup tables for the core provided plugins. These can be set up, extended, and configured similar to any other plugin that you are adding.
  - **Note:** The default options for lazy sets `lazy = true` for each plugin. This means plugins should either be configured appropriately for lazy loading or use `lazy = false` if you do not want a plugin to be lazy loaded
  - The `user/plugins/` folder is added to the Lazy plugin specifications to be imported. This allows you to add lists of plugins to any files in the `user/plugins/` folder and they will be used appropriately. This will allow you to organize your plugins in any way you would prefer.

- `astronvim.file_plugins` and `astronvim.git_plugins` tables have been removed in favor of a `User` `autocmd` model. Wherever you are using `astronvim.file_plugins` or `astronvim.git_plugins` to lazy load your plugins, please switch to lazy loading on the user events `User AstroFile` and `User AstroGitFile`. More details for these can be found in the updated [Customizing Plugins Documentation](../custom_plugins).

- A large restructuring of our internal utilities has taken place.

  - Our `core` module has been renamed to `astronvim` so anywhere you use `require("core...")` will need to be replaced with `require("astronvim...")`
  - Most utility functions in the global `astronvim` variable have been separated into specific modules and can be accessed with require such as: `require("astronvim.utils")`. Commonly used changes are: `astronvim.lsp` is now `require("astronvim.utils.lsp")`, `astronvim.status` is now `require("astronvim.utils.status")`, and most of the various utilities are now just in `require("astronvim.utils")`. Please check out the updated API documentation here for specific details and finding specific functions: [api.astronvim.com](https://api.astronvim.com).

- We have removed Bufferline and are now using Heirline and `astronvim.utils.status` (previously was in `astronvim.status` but is now accessed with `require("astronvim.utils.status")`) for our own performant and custom tabline.

- `:AstroReload` has been removed. There are a couple reasons for this, it was never very reliable and hard to maintain and lazy.nvim strictly does not support hot reloading neovim configurations.

- The `require("astronvim.utils.status").component.macro_recording` status component has been removed. Please use the improved `require("astronvim.utils.status").component.cmd_info` component.

- `lsp.server-settings` has been renamed to `lsp.config`. If you have the `["server-settings"]` table in your `user/init.lua` file, just rename it to `config`. If you have the folder `user/lsp/server-settings`, just rename the folder to `user/lsp/config`.

- `luasnip` options table has been removed. Please see the updated [Custom Snippets Documentation](../../recipes/snippets) for the new way to extend the default configuration of LuaSnip to add new loaders.

- `which-key` options table has been removed. Which-key menu titles can now be easily added into the `mappings` table by setting a binding to a table with the `name` property set and it will be passed to `which-key`. For example, you can add the following to the `mappings` table: `["<Leader>b"] = { name = "Buffer" }`.

- `nvim-autopairs` options table has been removed. Please see the updated [Customize Autopairs Documentation](../../recipes/autopairs) for the new way to extend the default configuration of autopairs and adding more rules.

- `cmp` options table has been removed. Please see the updated [Customize cmp Completion Documentation](../../recipes/cmp) for the new way to extend the default configuration of cmp and running more `cmp` setup functions.

- `mason-lspconfig`, `mason-null-ls`, and `mason-nvim-dap` options tables have been removed, please use the new plugin notation for extending these options like adding custom setup handlers. This is described in the [Extending Core Plugin Config Functions Documentation](../custom_plugins#extending-core-plugin-config-functions).

- `default_theme` has been migrated to a dedicated plugin that can be used outside of AstroNvim as well at [AstroNvim/astrotheme](https://github.com/AstroNvim/astrotheme). This can be customized and configured the same as any other plugin, check the README for details on the `setup` function.

- The bindings in `cmp` to scroll the preview window for a completion item have moved to `<c-u>` and `<c-d>`

- `<Leader>p` mappings for package and plugin management have been cleaned up to follow a common format amongst each other. `<Leader>ps` is now for checking Plugin Status and `<Leader>pS` is for syncing plugins. Mason mappings have been moved to `<Leader>pm` and `<Leader>pM` for Mason Status and Mason Update respectively.

- The dashboard mapping has been changed from `<Leader>d` to `<Leader>h` for the "Home Screen"

- The debugging menu has been moved from `<Leader>D` to `<Leader>d` for quicker and more comfortable usage.

- `H` and `L` have been changed to `[b` and `]b` respectively for changing tabs in the UI. This is for both switching buffers as well as neo-tree sources in the explorer. This can be changed in the your user configuration by adding the following entries to your `mappings.n` table (This uses an internal `astronvim.utils.buffer` function that follows the tab positioning and also allows for using a number to move by multiple tabs at once):

```lua
    L = { function() require("astronvim.utils.buffer").nav(vim.v.count > 0 and vim.v.count or 1) end, desc = "Next buffer" },
    H = { function() require("astronvim.utils.buffer").nav(-(vim.v.count > 0 and vim.v.count or 1)) end, desc = "Previous buffer" },
```

- `header` option has been removed in favor of decreasing abstractions. Check the updated [Dashboard Customizations Documentation](../../recipes/alpha)

- `<Leader>s` has been unified with the `<Leader>f` menu rather than spreading the Telescope mappings out across two menus. Please check the new mappings by pressing `<Leader>f` or in the updated [Mappings Documentation](/mappings)

- Heirline has moved to a more sustainable configuration format for their `setup` call. Before it was configured with `require("heirline").setup(statusline, winbar, tabline)`, this has moved to a new format with a single table like `require("heirline").setup({ statusline = statusline, winbar = winbar, tabline = tabline, statuscolumn = statuscolumn })`. If you have a custom Heirline configuration please check out the updated [Customizing Statusline Documentation](../../recipes/status) as well as the updated [Heirline Documentation](https://github.com/rebelot/heirline.nvim/blob/master/cookbook.md). (_Note:_ also that along with all of the other core plugin setups, the abstractions have been removed and you will need to update to the new Lazy syntax described in the [Custom Plugins Documentation](../custom_plugins#overriding-core-plugins))

- `lsp.skip_setup` option has been removed as the new and improved `lsp.setup_handlers` option makes this easy. If you are using this option for LSP specific plugins, check up the updated [Advanced LSP Setup Documentation](../../recipes/advanced_lsp#lsp-specific-plugins). This page also includes the new format for setting these plugins up with Lazy.nvim.

- The `default_tbl(override_tbl, default_tbl)` internal function has been removed and replaced with `extend_tbl(default_tbl, override_tbl)`. If you use the original function anywhere in your config, remember to rename it and change the order of the parameters. Also note that this now lives in `astronvim.utils` rather than the global `astronvim` table. This can be accessed with `require("astronvim.utils").extend_tbl(default_tbl, override_tbl)`.
