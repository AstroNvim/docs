---
id: v4_migration
title: Migration to v4.0
---
# Migration Guide

While there are many small improvements to AstroNvim in version 4, the major update is a move to to using the [`lazy.nvim`](https://github.com/folke/lazy.nvim) plugin manager for much more of the configuration. 

The first major change is that the installation of AstroNvim itself is through using `lazy.nvim`. Rather than cloning AstroNvim, as was done in previous versions, AstroNvim is "just another" plugin and it is installed using `lazy.nvim`.

The second major change is that AstroNvim configuration has been split among a number of plugins, each with their own configuration. While the [AstroNvim](https://github.com/AstroNvim/AstroNvim/tree/v4) plugin still exists, it has no configuration.

The new plugin configurations are performed through `lazy.nvim`. The plugins are:
- [AstroCore](https://github.com/AstroNvim/astrocore) - Provides a configuration interface for "core" AstroNvim functions, such as key mappings, auto commands, etc. The [configuration here](https://github.com/AstroNvim/astrocore#%EF%B8%8F-configuration) provides an example and `:help astrocore` provides help within Neovim. AstroCore also has an API for utility functions that help with managing and updating your configuration.
- [AstroLSP](https://github.com/AstroNvim/astrolsp) - Provides a configuration interface for Language Server Protocol (LSP) functions. The [configuration here](https://github.com/AstroNvim/astrolsp#%EF%B8%8F-configuration) provides an example and `:help astrolsp` provides help within Neovim.
- [AstroUI](https://github.com/AstroNvim/astroui) - Provides a configuration interface for User Interface (UI) functions, such as setting the colorscheme, highlights, icons, etc. The [configuration here](https://github.com/AstroNvim/astroui#%EF%B8%8F-configuration) provides and example and `:help astroui` provides help within Neovim.
## Setting Up a Migration Environment

:::note

Before getting started it is recommended to review the [Getting Started]() guide. It explains how AstroNvim uses `lazy.nvim` and it also explains the AstroNvim configuration template, which is the recommended way to migrate from the previous version.

:::

You need an editor to configure an editor! As such breaking your working editor configuration when migrating to v4 will make it difficult to edit your new configuration. We **highly recommend following the process** below so that you can keep your existing editor working while migrating to the v4 configuration. This workflow makes use of an [Isolated Installation](/reference/alt_install/#isolated-installation) environment.

1. Clone the AstroNvim v4 configuration template to a new location (`astronvim_v4` is used as the example):
```sh
  git clone https://github.com/AstroNvim/template ~/.config/astronvim_v4
  rm -rf ~/.config/astronvim_v4/.git
```

2. Start `nvim` the new environment. `nvim` should start, bootstrap itself by loading `lazy.nvim` and then Lazy will load all of the plugins specified by AstroNvim.

   ```sh
   NVIM_APPNAME=astronvim_v4 nvim
   ```

3. Migrate your AstroNvim v3 configuration to your new AstroNvim v4 environment at `~/.config/astronvim_v4` using the guide below. You can use your previous AstroNvim setup to do the editing and then continue running the command in Step 2 to test the new installation.

4. Once you have your configuration set up how you like it, simply move it over to the default neovim configuration location:

   ```sh
   mv ~/.config/nvim ~/.config/nvim.bak # backup old config
   mv ~/.config/astronvim_v4 ~/.config/nvim # move new config
   ```

5. Run your new v4 environment simply with `nvim` 🎉
## Configuration Options Migration

:::warning

This is a work in progress. This guide is taking shape and covers much of the migration. There are holes though! If you see something missing drop a note on the Discord `#v4_testing` channel.

:::

Many of the migrations are very straight forward (e.g.: `colorscheme`). Some are a bit more complex. You might have to read a bit more to get them going.

Each "Migrating" section below has an link to documentation and/or an example configuration. The comments in the example configurations document each of the configuration keys.

The [plugin configuration files.](https://github.com/AstroNvim/AstroNvim/tree/v4/lua%2Fastronvim%2Fplugins) in the AstroNvim codebase itself is also a good reference to learn how to configure plugins.

**Please also read the Other Changes section** - there are a number of changes that are not just "move some config from one place to another". For example, in key mapping `<leader>` is no longer recognized.

If you get stuck, people on the [Discord](https://discord.astronvim.com/) forum are active and friendly! Like all humans, sometimes they are grumpy, so be nice! The best place to post is most likely the `#help-forum`, but poke around a few of the other channels, you never know what you will find that is useful.
### Migrating to AstroCore

View [AstroCore example](https://github.com/AstroNvim/astrocore/tree/main#%EF%B8%8F-configuration) configuration. View AstroCore help in `nvim`: `:help astrocore`

The following version 3 `user/init.lua` configuration keys move to the same keys in the version 4 `lua/plugins/astrocore.lua` template file:
- `autocmds`
- `mappings`
- `options`

Additional non version 3 keys configured in the `lua/plugins/astrocore.lua` file are:
- `commands`
- `features`
- `git_worktrees`
- `on_keys`
- `rooter`
- `sessions`
### Migrating to AstroLSP

View [AstroLSP example](https://github.com/AstroNvim/astrolsp/tree/main#%EF%B8%8F-configuration) configuration. View AstroLSP help in `nvim`: `:help astrolsp`

The following version 3 `user/init.lua` configuration keys move to the same keys in the version 4 `lua/plugins/astrolsp.lua` template file:
- `lsp.capabilities
- `lsp.config.<lsp>
- `lsp.flags`
- `lsp.formatting`
- `lsp.mappings`
- `lsp.on_attach`
- `lsp.servers`
- `lsp.setup_handlers`?? Where does this go?
- `lsp.skip_setup` ?? Where does this go?
- `diagnostics` - Correct?
### Migrating to AstroUI

View [AstroUI example](https://github.com/AstroNvim/astroui/tree/main#%EF%B8%8F-configuration) configuration. View AstroUI help in `nvim: `:help astroui`

The following version 3 `user/init.lua` configuration keys move to the same keys in the version 4 `lua/plugins/astroui.lua` template file:
- `colorscheme`
- `highlights.init`
- `highlights.<colorscheme>`
- `icons`

Additional non version 3 keys configured in the `lua/plugins/astroui.lua` file are:
- `text_icons` (Same as `icons` except when NerdFont is not installed)
- `status` (Config for lines and bars built with the `status` API)
### Heirline

Read [Customizing Statusline](/recipes/status) page for how to move the following v3 keys: (?? TODO: do we want to have an heirline.lua file in the template??)
- `heirline.attributes`
- `heirline.colors`
- `heirline.icon_highlights`
- `heirline.separators`

### Other Changes
- Mapping modifiers are now capitalized. For example `<leader>` not longer works and must be changed to `<Leader>`.
- `lazy` configuration key is no longer used.
- `updater` TODO: what happens with that
- TODO: More changes
