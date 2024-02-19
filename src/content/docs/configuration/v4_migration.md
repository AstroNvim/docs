---
id: v4_migration
title: Migration to v4.0
---

While there are many small improvements to AstroNvim in version 4, the major update is a move to to using the [`lazy.nvim`](https://github.com/folke/lazy.nvim) plugin manager for much more of the configuration.

The first major change is that the installation of AstroNvim itself is through using `lazy.nvim`. Rather than cloning AstroNvim, as was done in previous versions, AstroNvim is "just another" plugin and it is installed using `lazy.nvim`.

The second major change is that AstroNvim configuration has been split among a number of plugins, each with their own configuration. While the [AstroNvim](https://github.com/AstroNvim/AstroNvim/tree/v4) plugin is still the main plugin, it has very limited configuration options.

The new plugins are:

- [AstroCore](https://github.com/AstroNvim/astrocore) - Provides a configuration interface for "core" AstroNvim functions, such as key mappings, auto commands, etc. The [configuration here](https://github.com/AstroNvim/astrocore#%EF%B8%8F-configuration) provides an example and `:help astrocore` provides help within Neovim. AstroCore also has an API for utility functions that help with managing and updating your configuration.
- [AstroLSP](https://github.com/AstroNvim/astrolsp) - Provides a configuration interface for Language Server Protocol (LSP) functions. The [configuration here](https://github.com/AstroNvim/astrolsp#%EF%B8%8F-configuration) provides an example and `:help astrolsp` provides help within Neovim.
- [AstroUI](https://github.com/AstroNvim/astroui) - Provides a configuration interface for User Interface (UI) functions, such as setting the colorscheme, highlights, icons, etc. The [configuration here](https://github.com/AstroNvim/astroui#%EF%B8%8F-configuration) provides and example and `:help astroui` provides help within Neovim.

All AstroNvim configuration is coordinated through those plugins above.

## Setting Up a Migration Environment

:::note

Before getting started it is recommended to review the [Getting Started]() guide. The guide explains how AstroNvim uses `lazy.nvim` and it also explains the AstroNvim configuration template, which is the recommended way to migrate from the previous version.

:::

Breaking your working editor configuration when migrating to v4 will make it difficult to edit your new configuration. As such, we **recommend following the process** below so that your existing editor keeps working while migrating to the v4 configuration. This workflow makes use of an [Isolated Installation](/reference/alt_install/#isolated-installation) environment.

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

## Configuration Options Migration

:::warning

This is a work in progress. This guide is taking shape and covers much of the migration. There are holes though! If you see something missing drop a note on the Discord `#v4_testing` channel or open a pull request on GitHub.

:::

Each "Migrating" section below has an link to documentation and/or an example configuration. Each example configuration file shows the structure for configuring that plugin. The comments in each example configuration describes the configuration keys.

::: note

**Recommended reading**: for each plugin there is a link to example configuration. These configurations are full of documentation and can help guide your migration!

:::

The [plugin configuration files.](https://github.com/AstroNvim/AstroNvim/tree/v4/lua%2Fastronvim%2Fplugins) in the AstroNvim codebase itself are also a good reference to learn how to configure.

**Please also read the Other Changes section** - there are a number of changes that are not just "move some config from one place to another". For example, in key mapping `<leader>` is no longer recognized.

If you get stuck, people on the [Discord](https://discord.astronvim.com/) forum are active and friendly! Like all humans, sometimes they are grumpy, so be nice to them! The best place to post is most likely the `#help-forum`, but poke around a few of the other channels, you never know what you will find that is useful.

v3 mapping to plugin and key:

| v3 `user/init.lua` table key | v4 plugin           | v4 table key                |
| ---------------------------- | ------------------- | --------------------------- |
| `colorscheme`                | AstroNvim/astroui   | `colorscheme`               |
| `diagnostics`                | AstroNvim/astrolsp  | `diagnostics`               |
| `heirline.attributes`        | AstroNvim/astroui   | `status.attributes`         |
| `heirline.colors`            | AstroNvim/astroui   | `status.colors`             |
| `heirline.icon_highlights`   | AstroNvim/astroui   | `status.icon_highlights`    |
| `heirline.separators`        | AstroNvim/astroui   | `status.separators`         |
| `highlights.init`            | AstroNvim/astroui   | `highlights`                |
| `highlights.<colorscheme>`   | AstroNvim/astroui   | `highlights.<colorscheme>`  |
| `icons`                      | AstroNvim/astroui   | `icons`                     |
| `lsp.capabilities`           | AstroNvim/astrolsp  | `capabilities`              |
| `lsp.config.<lsp>`           | AstroNvim/astrolsp  | `config.<lsp>`              |
| `lsp.flags`                  | AstroNvim/astrolsp  | `flags`                     |
| `lsp.formatting`             | AstroNvim/astrolsp  | `formatting`                |
| `lsp.mappings`               | AstroNvim/astrolsp  | `mappings`                  |
| `lsp.on_attach`              | AstroNvim/astrolsp  | `on_attach`                 |
| `lsp.servers`                | AstroNvim/astrolsp  | `servers`                   |
| `lsp.setup_handlers`         | AstroNvim/astrolsp  | `handlers`                  |
| `lsp.skip_setup`             | AstroNvim/astrolsp  | Set `handler.<lsp> = false` |
| `mappings`                   | AstroNvim/astrocore | `mappings`                  |
| `options`                    | AstroNvim/astrocore | `options`                   |
| `text_icons`                 | AstroNvim/astroui   | `text_icons`                |

v3 keys configured in new ways in v4:

| `user/init.lua` table key | Starter Template Migration                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `lazy`                    | `lazy` is bootstrapped through `init.lua` and configured using `lua/lazy_setup.lua`                                           |
| `plugins`                 | Plugins are in the directory `lua/plugins/<any_files>.lua`                                                                    |
| `polish`                  | `polish` is in the file `lua/polish.lua`                                                                                      |
| `updater`                 | Updating uses `lazy` update features and is configured in `init.lua` using `lazy` `branch` and `version` plugin spec options. |

The following keys are introduced in v4 and have no equivalent in v3. This configuration was done through user configuration (for example in `polish.lua):

| New key         | v4 plugin           | Description                                                                    |
| --------------- | ------------------- | ------------------------------------------------------------------------------ |
| `autocmds`      | AstroNvim/astrocore | Configure global auto commands                                                 |
| `commands`      | AstroNvim/astrocore | Configure global commands                                                      |
| `features`      | AstroNvim/astrocore | Configuration options for AstroNvim itself; was a `vim.g` variable in v3       |
| `git_worktrees` | AstroNvim/astrocore | Configure git integration for detached worktrees; was a `vim.g` variable in v3 |
| `on_keys`       | AstroNvim/astrocore | Configure functions on key press                                               |
| `rooter`        | AstroNvim/astrocore | Configure project root detection                                               |
| `sessions`      | AstroNvim/astrocore | Configure session management (powered by Resession)                            |
| `autocmds`      | AstroNvim/astrolsp  | Configure buffer local auto commands to add when attaching a language server   |
| `commands`      | AstroNvim/astrolsp  | Configure buffer local user commands to add when attaching a language server   |

### Other Changes

::: caution

`mapleader` and `maplocalleader` must be configured either before the `lazy.setup` call or in the `AstroNvim/AstorNvim` `opts` in the `lua/lazy_setup.lua` file due to the way that `lazy.nvim` plugin manager works.

:::

- Mapping modifiers are now capitalized. For example `<leader>` not longer works and must be changed to `<Leader>`.
- `mapleader` and `maplocalleader` can be set in the `AstroNvim/astronvim` configuration spec `opts`
- TODO: More changes from @mehalter

### Plugin Changes

TODO: check this list is correct

- New:
  - AstroNvim
  - astrocore
  - astrolsp
  - astroui
  - vim-illuminate
  - todo-comments
- Replaced:
  - null-ls → none-ls
  - nvim-session-manager → resession
- Removed:
  - SchemaStore
