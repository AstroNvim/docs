---
id: v2_migration
title: Migration to v2.0
---

# Migrating from v1.x to v2.0

- **Updater changes** Stable AstroNvim is now the default behavior of installing AstroNvim without any user configuration. This will mean slower updates as well as pinning provided plugins to protect against breaking changes. You can opt into the `nightly` update channel through  your user configuration with the `updater` table. We have also enabled automatically syncing plugins and quitting AstroNvim on a successful update which will then require a relaunch to start using the new update as quickly as possible. All of these options can also be configured in the `updater` configuration table.

- `configs/lsp/handlers.lua` has been moved to `lua/core/utils/lsp.lua`. If you are doing `require("configs.lsp.handlers")` anywhere, you should move to using `astronvim.lsp`

- We have replaced Feline with the plugin [`Heirline.nvim`](https://github.com/rebelot/heirline.nvim). This provides us with a much more powerful way to provide custom statusline and winbar support to AstroNvim. This has also come with a new module `astronvim.status` that will provide many building blocks for creating custom statuslines for users if they want to modify the default bar. We have also provided new documentation for this at [Recipes/Customizing Statusline](../Recipes/status)

- `which-key.register_mappings` key has been simplified to just `which-key.register`. If you have `register_mappings` table in your `user/init.lua` file then simply rename it to `register`. If you have the file `user/which-key/register_mappings.lua` for your configuration, just simply rename that file to `user/which-key/register.lua`

- `default_theme.diagnostics_style` has been deprecated in favor of the improved `highlights` configuration which allows you to easily override any highlight group for any theme. To achieve the same functionality as the `default_theme.diagnostics_style` you include this in your `user/init.lua` configuration table:

  ```lua
  highlights = {
    default_theme = function(highlights)
      -- New approach instead of diagnostic_style
      highlights.DiagnosticError.italic = true
      highlights.DiagnosticHint.italic = true
      highlights.DiagnosticInfo.italic = true
      highlights.DiagnosticWarn.italic = true
    end,
  },
  ```

- We have removed the default escape bindings for the terminal mode. This caused a lot of frictions with users who wanted to use terminal interfaces within AstroNvim. We have also removed the `<C-\>` binding to toggle the terminal since this conflicted with a very useful default binding.

- We have added a new UI menu (`<leader>u`) for quickly toggling UI/UX elements of AstroNvim. Ranging from toggling completion and syntax highlighting to toggling indentation level. Previously `<leader>u` was used by default to toggle underlining URLs, but this has been moved to within the new UI menu

- We have deprected the `ui` configuration  table for enabling and disabling using `nui` and `telescope` for `input` and `select` windows. This has been replaced with the plugin `dressing` now that it is back in active development. These features can be controlled with overriding the `dressing` setup with `plugins.dressing` table or the file `user/plugins/dressing.lua`

- We have also deprected the configuration item `plugins.nvim-lsp-installer` as we have since moved to `mason-lspconfig`. if you have `nvim-lsp-installer` configuration in your `user/init.lua` file or the file `user/plugins/nvim-lsp-installer.lua`, this should be replaced with `mason-lspconfig`.

- The `<leader>p` menu option for syncing and checking `Packer` has been reworked to be a general menu for checking and updating packages, plugins, and AstroNvim itself. This also includes remapping `<leader>lI` which was the LSP Installer to `<leader>pI` to open the Mason Installer since it is a general purpose package installer and not just language servers

- We have replaced a couple of the termiiinal applications we have out of the box support for. We have replaced `NCDU` with [`gdu`](https://github.com/dundee/gdu) and `htop` with [`bottom`](https://github.com/ClementTsang/bottom). This is to provide out of the box options that are cross platform supported.

- Format on save is now a default behavior of AstroNvim. We have also combined the `on_attach` for language servers and `null-ls` together. If you are setting up automatic saving in your `plugins.null-ls` table with the `on_attach` function, you can remove this all together. We recommend removing the entire `on_attach` function for `null-ls` and do all the configuration within the `lsp.on_attach` function in your user configuration.
