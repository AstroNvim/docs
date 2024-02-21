---
id: v4_migration
title: Migration to v4.0
---

While there are many small improvements to AstroNvim in version 4, the major update is a move to use the [`lazy.nvim`](https://github.com/folke/lazy.nvim) plugin manager for much more of the configuration.

The first major change is that the installation of AstroNvim itself is through `lazy.nvim`. Rather than cloning AstroNvim, as was done in previous versions, AstroNvim is "just another" plugin and it is installed using `lazy.nvim`.

The second major change is that AstroNvim configuration has been split among a number of plugins, each with their own configuration. While the [AstroNvim](https://github.com/AstroNvim/AstroNvim/tree/v4) plugin is still the main plugin, it has very limited configuration options.

The new plugins are:

- [AstroCore](https://github.com/AstroNvim/astrocore) - Provides a configuration interface for "core" AstroNvim functions, such as key mappings, auto commands, etc. The [configuration here](https://github.com/AstroNvim/astrocore#%EF%B8%8F-configuration) provides an example and `:help astrocore` provides help within Neovim. AstroCore also has an API for utility functions that help with managing and updating your configuration.
- [AstroLSP](https://github.com/AstroNvim/astrolsp) - Provides a configuration interface for Language Server Protocol (LSP) functions. The [configuration here](https://github.com/AstroNvim/astrolsp#%EF%B8%8F-configuration) provides an example and `:help astrolsp` provides help within Neovim.
- [AstroUI](https://github.com/AstroNvim/astroui) - Provides a configuration interface for User Interface (UI) functions, such as setting the colorscheme, highlights, icons, etc. The [configuration here](https://github.com/AstroNvim/astroui#%EF%B8%8F-configuration) provides and example and `:help astroui` provides help within Neovim.

All AstroNvim configuration is coordinated through those plugins above.

:::note

Before getting started it is recommended to review the [Getting Started](/) guide. The guide explains how AstroNvim uses `lazy.nvim` and it also explains the AstroNvim configuration template, which is the recommended way to migrate from the previous version.

:::

## Setting Up a Migration Environment

Breaking your working editor configuration when migrating to v4 will make it difficult to edit your new configuration. As such, we **recommend following the process** below so that your existing editor keeps working while migrating to the v4 configuration. This workflow makes use of an [Isolated Installation](/reference/alt_install/#isolated-installation) environment.

:::tip

Checkout the [Managing User Configuration Page](/configuration/manage_user_config) for details on how to create a new git repository from our template or convert the clone described above into a repository. It is highly recommended to set up your configuration as a git repository so that it is backed up as well as easier to share.

:::

1. Clone the AstroNvim v4 configuration template to a new location (`astronvim_v4` is used as the example):

   ```sh
   git clone https://github.com/AstroNvim/template ~/.config/astronvim_v4
   rm -rf ~/.config/astronvim_v4/.git
   ```

2. Start `nvim` in the new environment. `nvim` should start, bootstrap itself by installing and loading `lazy.nvim`. Lazy will load all of the plugins specified by AstroNvim.

   ```sh
   NVIM_APPNAME=astronvim_v4 nvim
   ```

3. Migrate your AstroNvim v3 configuration to your new AstroNvim v4 environment at `~/.config/astronvim_v4` using the guide below. You can use your previous AstroNvim setup to do the editing and then continue running the command in Step 2 to test the new installation.

4. Once you have your configuration set up how you like it, move it over to the default neovim configuration location `~/.config/nvim`:

   ```sh
   mv ~/.config/nvim ~/.config/nvim.bak # backup old config
   mv ~/.config/astronvim_v4 ~/.config/nvim # move new config
   ```

5. Run your new v4 environment simply with `nvim` 🎉

## Migration Guide

### Configuration Option Changes

:::caution

This is a work in progress. This guide is taking shape and covers much of the migration. There are holes though! If you see something missing drop a note on the Discord `#v4_testing` channel or open a pull request on GitHub.

:::

Each "Migrating" section below has an link to documentation and/or an example configuration. Each example configuration file shows the structure for configuring that plugin. The comments in each example configuration describes the configuration keys.

:::note

**Recommended reading**: for each plugin there is a link to example configuration. These configurations are full of documentation and can help guide your migration!

:::

The [plugin configuration files.](https://github.com/AstroNvim/AstroNvim/tree/v4/lua%2Fastronvim%2Fplugins) in the AstroNvim codebase itself are also a good reference to learn how to configure.

**Please also read the [Other Changes section](./#other-changes)** - there are a number of changes that are not just "move some config from one place to another". For example, in key mapping `<leader>` is no longer recognized.

If you get stuck, people on the [Discord](https://discord.astronvim.com/) forum are active and friendly! Like all humans, sometimes they are grumpy, so be nice to them! The best place to post is most likely the `#help-forum`, but poke around a few of the other channels, you never know what you will find that is useful.

v3 configuration options in `user/init.lua` and their new location in the core AstroNvim plugin configuration `opts`:

| v3 `user/init.lua` table key | v4 `AstroNvim/` plugin | v4 plugin `opt` key         |
| ---------------------------- | ---------------------- | --------------------------- |
| `colorscheme`                | `astroui`              | `colorscheme`               |
| `diagnostics`                | `astrolsp`             | `diagnostics`               |
| `heirline.attributes`        | `astroui`              | `status.attributes`         |
| `heirline.colors`            | `astroui`              | `status.colors`             |
| `heirline.icon_highlights`   | `astroui`              | `status.icon_highlights`    |
| `heirline.separators`        | `astroui`              | `status.separators`         |
| `highlights.init`            | `astroui`              | `highlights.init`           |
| `highlights.<colorscheme>`   | `astroui`              | `highlights.<colorscheme>`  |
| `icons`                      | `astroui`              | `icons`                     |
| `lsp.capabilities`           | `astrolsp`             | `capabilities`              |
| `lsp.config.<lsp>`           | `astrolsp`             | `config.<lsp>`              |
| `lsp.flags`                  | `astrolsp`             | `flags`                     |
| `lsp.formatting`             | `astrolsp`             | `formatting`                |
| `lsp.mappings`               | `astrolsp`             | `mappings`                  |
| `lsp.on_attach`              | `astrolsp`             | `on_attach`                 |
| `lsp.servers`                | `astrolsp`             | `servers`                   |
| `lsp.setup_handlers`         | `astrolsp`             | `handlers`                  |
| `lsp.skip_setup`             | `astrolsp`             | Set `handler.<lsp> = false` |
| `mappings`                   | `astrocore`            | `mappings`                  |
| `options`                    | `astrocore`            | `options`                   |
| `text_icons`                 | `astroui`              | `text_icons`                |

v3 keys which are now handled entirely by the user in their configuration. Here are examples for where the configuration goes in the provided starter template:

| `user/init.lua` table key | Starter Template Migration                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `lazy`                    | `lazy` is bootstrapped through `init.lua` and configured using `lua/lazy_setup.lua`                                           |
| `plugins`                 | Plugins are in the directory `lua/plugins/<any_files>.lua`                                                                    |
| `polish`                  | `polish` is in the file `lua/polish.lua`                                                                                      |
| `updater`                 | Updating uses `lazy` update features and is configured in `init.lua` using `lazy` `branch` and `version` plugin spec options. |

A few options were configured through global (`vim.g`) variables. These have also been moved to our core configuration plugins:

| v3 `vim.g` variable        | v4 `AstroNvim/` plugin | v4 plugin `opt` key                 |
| -------------------------- | ---------------------- | ----------------------------------- |
| `autoformat_enabled`       | `astrolsp`             | `formatting.format_on_save.enabled` |
| `autopairs_enabled`        | `astrocore`            | `features.autopairs`                |
| `cmp_enabled`              | `astrocore`            | `features.cmp`                      |
| `codelens_enabled`         | `astrolsp`             | `features.codelens`                 |
| `diagnostic_mode`          | `astrolsp`             | `features.diagnostics_mode`         |
| `git_worktrees`            | `astrocore`            | `git_worktrees`                     |
| `highlighturl_enabled`     | `astrocore`            | `features.highlighturl`             |
| `icons_enabled`            | `AstroNvim`            | `icons_enabled`                     |
| `inlay_hints_enabled`      | `astrolsp`             | `features.inlay_hints`              |
| `lsp_handlers_enabled`     | `astrolsp`             | `features.lsp_handlers`             |
| `max_file`                 | `astrocore`            | `features.large_buf`                |
| `semantic_tokens_enabled`  | `astrolsp`             | `features.semantic_tokens`          |
| `ui_notifications_enabled` | `astrocore`            | `features.notifications`            |
| `resession_enabled`        | N/A                    | Resession is now the default        |

The following keys are introduced in v4 and have no equivalent in v3. This configuration was done through user configuration (for example in `polish.lua):

| New key    | v4 `AstroNvim/` plugin | Description                                                                  |
| ---------- | ---------------------- | ---------------------------------------------------------------------------- |
| `autocmds` | `astrocore`            | Configure global auto commands                                               |
| `commands` | `astrocore`            | Configure global commands                                                    |
| `on_keys`  | `astrocore`            | Configure functions on key press                                             |
| `rooter`   | `astrocore`            | Configure project root detection                                             |
| `sessions` | `astrocore`            | Configure Resession session management                                       |
| `autocmds` | `astrolsp`             | Configure buffer local auto commands to add when attaching a language server |
| `commands` | `astrolsp`             | Configure buffer local user commands to add when attaching a language server |

### Module Changes

AstroNvim v3 also has many utility functions in `astronvim.utils` modules which users may be using in their user configuration These utility functions have been moved to the various AstroNvim core plugins. Here are the updated modules names which can be used to update `require` statements throughout the user configuration:

| v3 module                          | v4 module                                 |
| ---------------------------------- | ----------------------------------------- |
| `astronvim.utils`                  | `astrocore`                               |
| `astronvim.utils.buffer`           | `astrocore.buffer`                        |
| `astronvim.utils.git`              | N/A - no longer providing a Git Lua API   |
| `astronvim.utils.lsp`              | `astrolsp`                                |
| `astronvim.utils.mason`            | `astrocore.mason`                         |
| `astronvim.utils.status`           | `astroui.status`                          |
| `astronvim.utils.status.component` | `astroui.status.component`                |
| `astronvim.utils.status.condition` | `astroui.status.condition`                |
| `astronvim.utils.status.env`       | `astroui.config.status`                   |
| `astronvim.utils.status.heirline`  | `astroui.status.heirline`                 |
| `astronvim.utils.status.hl`        | `astroui.status.hl`                       |
| `astronvim.utils.status.init`      | `astroui.status.init`                     |
| `astronvim.utils.status.provider`  | `astroui.status.provider`                 |
| `astronvim.utils.status.utils`     | `astroui.status.utils`                    |
| `astronvim.utils.ui`               | `astrocore.toggles`                       |
| `astronvim.utils.updater`          | N/A - no longer providing our own updater |

This table captures most of the changes, here are a few changes that don't exactly follow the above and need to be mentioned specifically:

- A few `astronvim.util` functions were moved to `astroui` rather than `astrocore`:
  - `get_hlgroup` → `require("astroui").get_hlgroup`
  - `get_icon` → `require("astroui").get_icon`
  - `get_spinner` → `require("astroui").get_spinner`

### Plugin Changes

Along with the new core AstroNvim plugins, we have made some other changes to our plugin list that user's should keep in mind while performing the migration.

- Added:
  - [`AstroNvim/AstroNvim`](https://github.com/AstroNvim/AstroNvim)
    - AstroNvim is now formatted as a plugin that provides plugin specifications to `lazy.nvim` through `import`.
  - [`AstroNvim/astrocore`](https://github.com/AstroNvim/astrocore)
    - The core configuration mechanism for AstroNvim for configuring things such as auto commands, mappings, vim options, session management, etc.
  - [`AstroNvim/astrolsp`](https://github.com/AstroNvim/astrolsp)
    - The core LSP configuration mechanism for AstroNvim which provides a single place of configuration that interfaces between the various LSP plugins.
  - [`AstroNvim/astroui`](https://github.com/AstroNvim/astroui)
    - The UI configuration mechanism for providing a unified interface such as icon and highlight configuration as well as our extensive `status` Lua API for building our `statusline`, `tabline`, `winbar`, and `statuscolumn`
  - [`RRethy/vim-illuminate`](https://github.com/RRethy/vim-illuminate)
    - provides more general and performant highlighting of the word under the cursor. If you were previously removing the `augroup` `lsp_document_highlight`, we are no longer creating that `augroup` and instead you should just disable (or configure) this plugin.
  - [`folke/todo-comments.nvim`](https://github.com/folke/todo-comments.nvim)
    - provides highlighting of known comment strings like `TODO:`.
- Changed:
  - [`jose-elias-alvarez/null-ls.nvim`](https://github.com/jose-elias-alvarez/null-ls.nvim) → [`nvimtools/none-ls.nvim`](https://github.com/nvimtools/none-ls.nvim)
    - `null-ls` was archived by the author and `none-ls` is a maintainer fork. All `require`s are the same, but if you are configuring `null-ls` in your plugins anywhere be sure to update the repository to `nvimtools/none-ls.nvim`.
  - [`Shatur/neovim-session-manager`](https://github.com/Shatur/neovim-session-manager) → [`stevearc/resession.nvim`](https://github.com/stevearc/resession.nvim)
    - `resession.nvim` provides a deeper and more configurable Lua API for building up our session management. This allows us to take into account our tab-local buffers when saving and restoring sessions. Similar to how `heirline` provides a framework for building statuslines, `resession` provides a framework for session management. We have added a few easy to configure options in AstroCore under the `sessions` table in the configuration opts for easily configuring auto saving of sessions and rules for ignoring buffers when saving. For advanced configuration please check out the extensive [Ressesion Documentation](https://github.com/stevearc/resession.nvim/) and our [Session Management Recipes](/recipes/sessions).
- Removed:
  - [`b0o/SchemaStore.nvim`](https://github.com/b0o/SchemaStore.nvim)
    - We are no longer providing `SchemaStore.nvim` out of the box. This will be provided as needed in the AstroCommunity language packs.

### Other Changes

:::caution

`mapleader` and `maplocalleader` must be configured either before the `lazy.setup` call or in the `AstroNvim/AstroNvim` `opts` (This is in the `lua/lazy_setup.lua` file in the official template). This is required due to the way that `lazy.nvim` plugin manager works and how Neovim creates mappings with the leaders.

:::

- Key codes in the keys for the mappings for AstroNvim are now normalized to match the casing in the official vimdocs. For example in v3 our mappings used `<leader>`, but this is now changed to `<Leader>`.
- `mapleader` and `maplocalleader` must be set in the `AstroNvim/AstroNvim` configuration spec `opts` or before the `require("lazy").setup` call in your Neovim configuration.
- `MasonUpdate` and `MasonUpdateAll` commands have been renamed to `AstroMasonUpdate` and `AstroMasonUpdateAll` to avoid conflicting with core Mason commands
- `<Leader>u` mappings have been modified to align buffer-local and global commands to a common standard
- The `file_info` component in the `status` API default options have been changed. If you are using `file_info` in your configuration, please refer to the new defaults in the [AstroUI Repository](https://github.com/AstroNvim/astroui/blob/main/lua/astroui/status/component.lua#L34-L57).
- `signs` is no longer used for configuring diagnostic signs. This is now configured in the `diagnostics` table under the `signs` key. If you are modifying the diagnostic signs in your configuration, please refer to the [AstroLSP configuration in AstroNvim](https://github.com/AstroNvim/AstroNvim/blob/v4/lua/astronvim/plugins/_astrolsp.lua#L45-L54)
- The `signs` table is now a dictionary format rather than a list to more closely align with the core Neovim Lua API as well as make it easier for the user to modify. If you are customizing signs in your user configuration, the field that was previously `name` in the list is now the key in a dictionary like table.
- The "loop" text object configured in `nvim-treesitter-text-objects` has been changed from `l` to `o` to avoid collisions with the common text object for line
- If you previously had configured a global `neoconf.json` file in your `user/` folder, this should now go into the root of your configuration (typically: `~/.config/nvim`)
- `~/.config/astronvim` is no longer getting added to the runtime path as it doesn't make sense anymore

### New Features

Some changes have been made that do not necessarily require any user intervention during the migration, but are just new features! Here are a few icon_highlights

- Full control over Neovim configuration folder (typically: `~/.config/nvim`) which allows the usage of all core runtime folders such as `after/`, `queries/`, etc.
- `shift+enter` in Neo-Tree will now open the file under the cursor with the system. This is useful for opening images or other files that are not supported natively by Neovim.
- Heirline now has a virtual environment component that is in the default configuration. If a virtual environment is activated, it will be shown in the statusline.
- AstroNvim now has a built-in project rooting utility that can be used to update the current working directory to an automatically detected project root. `:AstroRootInfo` can be used to see the current information from the rooter and `:AstroRoot` will update the current working directory to the detected root. This can be configured in AstroCore in the `rooter` settings to update the root automatically as well as changing how the root detection works.
- Large buffer detection has been greatly improved to make working with large files much faster. We have also added a user auto command event (`AstroLargeBuf`) which can be used to disable more things when a large buffer is detected.
