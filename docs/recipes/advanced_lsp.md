---
id: advanced_lsp
title: Advanced LSP Setup
---

### LSP Setup Without Installer

AstroNvim comes with [nvim-lsp-installer](https://github.com/williamboman/nvim-lsp-installer) as an easy interface for setting up and installing language servers, but this might not be adequate for all users. The LSP installer doesn't support all of the language servers that Neovim's LSP config supports and some users may already have the language servers installed on their machine and don't want to reinstall it separately. In these cases we have added an easy interface for setting up these servers. The following is a minimal `user/init.lua` file that simply sets up `pyright` language server for a user with `pyright` already available on their system:

```lua
return {
  lsp = {
    servers = {
      "pyright",
    },
  },
}
```

If the user wants to configure server specific settings and configurations then they can do this with the `lsp.server-settings` table as well. For example if the user wants to use `pyright` that is already available on their system and disable the single file support then can do the following:

```lua
return {
  lsp = {
    servers = {
      "pyright",
    },
    ["server-settings"] = {
      pyright = {
        single_filesupport = false,
      },
    },
  },
}
```

### LSP Specific Plugins

There are some plugins available for doing advanced setup of language servers that require the user to not use the `lspconfig` setup call and instead use their own plugin setup for handling this. AstroNvim provides a nice way to do this while still using `nvim-lsp-installer` for installing the language servers. You can use the `lsp.skip_setup` table for specifying which language servers to guarantee AstroNvim will not automatically call the `lspconfig` setup for. We also provide a helper function for getting the AstroNvim default server configuration like our built in `capabilities`, `on_attach`, as well as the user defined options in `lsp.server-settings`. Here is a couple examples for some common LSP plugins:

**[typescript.nvim](https://github.com/jose-elias-alvarez/typescript.nvim)**

```lua
return {
  lsp = {
    skip_setup = { "tsserver" },
  },
  plugins = {
    init = {
      {
        "jose-elias-alvarez/typescript.nvim",
        after = "nvim-lsp-installer", -- make sure to load after nvim-lsp-installer
        config = function()
          require("typescript").setup {
            server = astronvim.lsp.server_settings "tsserver",
          }
        end,
      },
    },
    ["nvim-lsp-installer"] = {
      ensure_installed = { "tsserver" },
    },
  },
}
```

**[clangd_extensions.nvim](https://github.com/p00f/clangd_extensions.nvim)**

```lua
return {
  lsp = {
    skip_setup = { "clangd" },
    ["server-settings"] = {
      clangd = {
        capabilities = {
          offsetEncoding = "utf-8",
        },
      },
    },
  },
  plugins = {
    init = {
      {
        "p00f/clangd_extensions.nvim",
        after = "nvim-lsp-installer", -- make sure to load after nvim-lsp-installer
        config = function()
          require("clangd_extensions").setup {
            server = astronvim.lsp.server_settings "clangd",
          }
        end,
      },
    },
    ["nvim-lsp-installer"] = {
      ensure_installed = { "clangd" },
    },
  },
}
```

**[flutter-tools.nvim](https://github.com/akinsho/flutter-tools.nvim)**

```lua
return {
  lsp = {
    skip_setup = { "dartls" }, -- skip lsp setup because flutter-tools will do it itself
    ["server-settings"] = {
      dartls = {
        -- any changes you want to make to the LSP setup, for example
        color = {
          enabled = true,
        },
        settings = {
          showTodos = true,
          completeFunctionCalls = true,
        },
      },
    },
  },
  plugins = {
    init = {
      {
        "akinsho/flutter-tools.nvim",
        requires = "nvim-lua/plenary.nvim",
        after = "nvim-lsp-installer", -- make sure to load after nvim-lsp-installer
        config = function()
          require("flutter-tools").setup {
            lsp = astronvim.lsp.server_settings "dartls", -- get the server settings and built in capabilities/on_attach
          }
        end,
      },
    },
    ["nvim-lsp-installer"] = {
      ensure_installed = { "dartls" }, -- install dartls
    },
  },
}
```
