---
id: v2_migration
title: Migration to v2.0
---

# Migrating from v1.x to v2.0

:::danger

AstroNvim requires the migration to Neovim v0.8 to use the new APIs and features. Please refer to the Neovim v0.8 changelog and review the breaking changes to see if any of the Lua that you have in your user configuration for AstroNvim needs to be updated to follow the new APIs as well.

:::

- **Updater changes:** Stable AstroNvim is now the default behavior of installing AstroNvim without any user configuration. This will mean slower updates as well as pinning provided plugins to protect against breaking changes. You can opt into the `nightly` update channel through your user configuration with the `updater` table. We have also enabled automatically syncing plugins and quitting AstroNvim on a successful update which will then require a relaunch to start using the new update as quickly as possible. All of these options can also be configured in the `updater` configuration table. If you want to achieve the previous update behavior of AstroNvim, you can put the following `updater` settings in your user configuration:

  ```lua
  updater = {
    -- get nightly updates
    channel = "nightly",
    -- disable automatically reloading AstroNvim after an update
    auto_reload = false,
    -- disable automatically quitting AstroNvim after an update
    auto_quit = false,
  }
  ```

- We have also deprecated the configuration item `plugins.nvim-lsp-installer` as we have since moved to `mason-lspconfig`. if you have `nvim-lsp-installer` configuration in your `user/init.lua` file or the file `user/plugins/nvim-lsp-installer.lua`, this should be replaced with `mason-lspconfig`.

- Formatting has been greatly improved with Neovim v0.8 that doesn't require users to disable formatting capabilities for any LSP clients. It allows for filtering of clients that have formatting enabled as well as formatting with multiple language servers without having to select a specific one to use. We have added a new `lsp.formatting` option to the user configuration that allow users to easily control the filter function and disable language servers more easily. If you are disabling formatting capabilities of any LSP clients in your `lsp.server-settings` configuration, we would recommend that you remove that and try out formatting without disabling anything. If you need to disable formatting for clients, check out the new [LSP Formatting Documentation](../Recipes/advanced_lsp.md#controlling-formatting).

- Format on save is now a default behavior of AstroNvim. We have also combined the `on_attach` for language servers and `null-ls` together. If you are setting up automatic saving in your `plugins.null-ls` table with the `on_attach` function, you can remove this all together. We recommend removing the entire `on_attach` function for `null-ls` and do all the configuration within the `lsp.on_attach` function in your user configuration.

- The `<leader>p` menu option for syncing and checking `Packer` has been reworked to be a general menu for checking and updating packages, plugins, and AstroNvim itself. This also includes remapping `<leader>lI` which was the LSP Installer to `<leader>pI` to open the Mason Installer since it is a general purpose package installer and not just language servers

- We have replaced Feline with the plugin [`Heirline.nvim`](https://github.com/rebelot/heirline.nvim). This provides us with a much more powerful way to provide custom statusline and winbar support to AstroNvim. This has also come with a new module `astronvim.status` that will provide many building blocks for creating custom statuslines for users if they want to modify the default bar. We have also provided new documentation for this at [Recipes/Customizing Statusline](../Recipes/status)

- `cinnamon.nvim` has been removed from the default plugin list. If you liked the smooth scrolling, please add it back to your `plugins.init` table in your user configuration. If you have previously disabled it then you no longer need to.

- `which-key.register_mappings` key has been simplified to just `which-key.register`. If you have `register_mappings` table in your `user/init.lua` file then simply rename it to `register`. If you have the file `user/which-key/register_mappings.lua` for your configuration, just simply rename that file to `user/which-key/register.lua`

- `default_theme.diagnostics_style` has been deprecated in favor of the improved `highlights` configuration table which allows you to easily override any highlight group in the theme before it gets set. To achieve the same functionality as the `default_theme.diagnostics_style` you include this in your `user/init.lua` configuration table:

  ```lua
  default_theme = {
    highlights = function(hl)
      -- New approach instead of diagnostic_style
      hl.DiagnosticError.italic = true
      hl.DiagnosticHint.italic = true
      hl.DiagnosticInfo.italic = true
      hl.DiagnosticWarn.italic = true

      return hl
    end,
  },
  ```

- We have removed the default escape bindings for the terminal mode. This caused a lot of frictions with users who wanted to use terminal interfaces within AstroNvim. We have also changed the `<C-\>` binding to be `<C-'>` for toggling the terminal since this conflicted with a very useful default binding. The following are the mappings that were removed just in case anyone wants to add them back:

  ```lua
  mappings = {
    n = {
      ["<C-\\>"] = { "<cmd>ToggleTerm<cr>", desc = "Toggle terminal" },
    },
    t = {
      ["<esc>"] = { "<C-\\><C-n>", desc = "Terminal normal mode" },
      ["jk"] = { "<C-\\><C-n>", desc = "Terminal normal mode" },
    },
  },
  ```

- We have added a new UI menu (`<leader>u`) for quickly toggling UI/UX elements of AstroNvim. Ranging from toggling completion and syntax highlighting to toggling indentation level. Previously `<leader>u` was used by default to toggle underlining URLs, but this has been moved to within the new UI menu. New Mappings:

  | Action                  | Mappings     |
  | ----------------------- | ------------ |
  | Toggle autopairs        | `Space + ua` |
  | Toggle background       | `Space + ub` |
  | Toggle autocompletion   | `Space + uc` |
  | Toggle color highlights | `Space + uC` |
  | Toggle diagnostics      | `Space + ud` |
  | Toggle signcolumn       | `Space + ug` |
  | Change indent setting   | `Space + ui` |
  | Change line numbering   | `Space + un` |
  | Toggle spellcheck       | `Space + up` |
  | Toggle URL highlight    | `Space + uu` |
  | Toggle wrap             | `Space + uw` |
  | Toggle syntax highlight | `Space + uy` |

- We have deprecated the `ui` configuration table for enabling and disabling using `nui` and `telescope` for `input` and `select` windows. This has been replaced with the plugin `dressing` now that it is back in active development. These features can be controlled with overriding the `dressing` setup with `plugins.dressing` table or the file `user/plugins/dressing.lua`. If you have not disabled any of the `ui` elements then you don't need to add anything. If you have set either of them to false, you will want to add the following to your user configuration:

  - `ui.nui_input = false`, the following should be added to your `user/init.lua` to override the dressing settings:
    ```lua
    plugins = {
      dressing = {
        input = { enabled = false },
      },
    }
    ```
  - `ui.telescope_select = false`, the following should be added to your `user/init.lua` to override the dressing settings:
    ```lua
    plugins = {
      dressing = {
        select = { enabled = false },
      },
    }
    ```
  - To disable both, you can either disable both the `input` and `select` items in the `dressing` configuration or you can just disable the `dressing` plugin altogether:
    ```lua
    plugins = {
      init = {
        ["stevearc/dressing.nvim"] = { disable = true },
      },
    }
    ```

- `configs/lsp/handlers.lua` has been moved to `lua/core/utils/lsp.lua`. If you are doing `require("configs.lsp.handlers")` anywhere, you should move to using `astronvim.lsp`

- We have replaced a couple of the terminal applications we have out of the box support for. We have replaced `NCDU` with [`gdu`](https://github.com/dundee/gdu) and `htop` with [`bottom`](https://github.com/ClementTsang/bottom). This is to provide out of the box options that are cross platform supported. The following bindings have been updated:

  - `Space + tu` will now open `gdu` instead of `ncdu`
  - `Space + tt` will now open `btm` instead of `top`
