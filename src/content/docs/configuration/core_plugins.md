---
id: core_plugins
title: Core Plugins
---

AstroNvim comes with a few core plugins that drive the main configuration of the editor. These are split up between [AstroCore](https://github.com/AstroNvim/astrocore), [AstroUI](https://github.com/AstroNvim/astroui), and [AstroLSP](https://github.com/AstroNvim/astrolsp). Each of these plugins have full documentation on their repositories as well as built into the Neovim help pages with `:h astrocore`, `:h astroui`, and `:h astrolsp`. Here we will go over the goals of each plugin, links to pages for more detailed configuration explanations of different functionalities, and links to their configuration documentation.

:::tip

These plugins provide integration with the Lua Language Server to be able to provide completion while editing your configuration. For details on enabling this, check out the [Lua Language Server Integration Page](/configuration/lua_completion)!

:::

## AstroCore

AstroCore provides the main configuration of core functionality such as user commands, auto commands, global mappings. This also includes AstroNvim specific features such as git worktrees integration and session management. This configuration happens fully through the `opts` table in your plugins specifications. The full table of configuration options can be found in the [AstroCore Documentation](https://github.com/AstroNvim/astrocore#%EF%B8%8F-configuration).

## AstroUI

AstroUI provides the API and configuration level which helps AstroNvim have a cohesive user interface. This includes defining icons to be used throughout the interface, configuration of highlight groups, and also configuration of the extensive status API for building our custom statusline, winbar, and tabline. For more detailed information on some of these options, be sure to check out the pages in the relevant Recipes section: [Customizing Statusline](/recipes/status), [Customize Icons](/recipes/icons), and [Custom Colorscheme](/recipes/colorscheme). The full table of configuration options can be found in the [AstroUI Documentation](https://github.com/AstroNvim/astroui#%EF%B8%8F-configuration).

## AstroLSP

AstroLSP is the main engine for our LSP configuration and setup. This provides integration with many core plugins such as `nvim-lspconfig`, `none-ls`, and mason utilities. For more detailed explanations on configuring the LSP inside of AstroNvim, be sure to check out the [Advanced LSP Setup page](/recipes/advanced_lsp). The full table of configuration options can be found in the [AstroLSP Documentation](https://github.com/AstroNvim/astrolsp#%EF%B8%8F-configuration).
