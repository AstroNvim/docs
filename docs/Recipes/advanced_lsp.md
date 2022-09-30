---
id: advanced_lsp
title: Advanced LSP Setup
---

### Controlling Formatting

Since Neovim v0.8 there have been improvements to how language servers are used for formatting files. Previously Neovim could only use a single language server to format files at a time and would prompt on each format if multiple were available. This led to users disabling formatting capabilities for different language servers and losing that functionality all together for convenience. Now you are able to format with many formatters at the same time and filter them with a function. To empower this, AstroNvim has a configuration option for controlling what formatters are used. This can be done either with a filter function or a list of disabled clients. Here are a couple example `user/init.lua` contents that demonstrate each possibility.
#### Disabling formatting for a filter function

using the `filter` option you can supply filter function to be run on each client that has formatting capabilities and if it returns `true` then it will be used for formatting and if it returns `false` then it will not be used. This applies to whenever you format your code either on save, with `<leader>lf`, or with `:Format`.

```lua
return {
  lsp = {
    formatting = {
      filter = function(client)
        -- disable formatting for sumneko_lua
        if client.name == "sumneko_lua" then
          return false
        end

        -- disable prettier for javascript files
        if client.name == "prettier" and vim.bo.filetype == "javascript" then
          return false
        end

        -- enable all other clients
        return true
      end
    },
  },
}
```

#### Disabling formatting for a list of language servers

using the `disabled` option you can supply an array like list of language server client names and those clients will be disabled with you format your code either on save, with `<leader>lf`, or with `:Format`.

```lua
return {
  lsp = {
    formatting = {
      disabled = {
        "sumneko_lua",
        "rust_analyzer",
      },
    },
  },
}
```

#### Using both filter function and disabled list

When using the options together, a client listed in the `disabled` list will always be disabled and then all other clients will then be passed into the `filter` function. For example, we can simplify our previous `filter` function by just disabling the `sumneko_lua` client in the `disabled` table:

```lua
return {
  lsp = {
    formatting = {
      disabled = { "sumneko_lua" },
      filter = function(client)
        -- disable prettier for javascript files
        if client.name == "prettier" and vim.bo.filetype == "javascript" then
          return false
        end

        -- enable all other clients
        return true
      end,
    },
  },
}
```

### LSP Setup Without Installer

AstroNvim comes with [mason-lspconfig](https://github.com/williamboman/mason-lspconfig.nvim) as an easy interface for setting up and installing language servers, but this might not be adequate for all users. The LSP installer doesn't support all of the language servers that Neovim's LSP config supports and some users may already have the language servers installed on their machine and don't want to reinstall it separately. In these cases we have added an easy interface for setting up these servers. The following is a minimal `user/init.lua` file that simply sets up `pyright` language server for a user with `pyright` already available on their system:

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

There are some plugins available for doing advanced setup of language servers that require the user to not use the `lspconfig` setup call and instead use their own plugin setup for handling this. AstroNvim provides a nice way to do this while still using `mason-lspconfig` for installing the language servers. You can use the `lsp.skip_setup` table for specifying which language servers to guarantee AstroNvim will not automatically call the `lspconfig` setup for. We also provide a helper function for getting the AstroNvim default server configuration like our built in `capabilities`, `on_attach`, as well as the user defined options in `lsp.server-settings`. Here is a couple examples for some common LSP plugins:

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
        after = "mason-lspconfig.nvim",
        config = function()
          require("typescript").setup {
            server = astronvim.lsp.server_settings "tsserver",
          }
        end,
      },
    },
    ["mason-lspconfig"] = {
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
        after = "mason-lspconfig.nvim", -- make sure to load after mason-lspconfig
        config = function()
          require("clangd_extensions").setup {
            server = astronvim.lsp.server_settings "clangd",
          }
        end,
      },
    },
    ["mason-lspconfig"] = {
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
        after = "mason-lspconfig.nvim", -- make sure to load after mason-lspconfig
        config = function()
          require("flutter-tools").setup {
            lsp = astronvim.lsp.server_settings "dartls", -- get the server settings and built in capabilities/on_attach
          }
        end,
      },
    },
    ["mason-lspconfig"] = {
      ensure_installed = { "dartls" }, -- install dartls
    },
  },
}
```

**[rust-tools.nvim](https://github.com/simrat39/rust-tools.nvim)**

```lua
return {
  lsp = {
    skip_setup = { "rust_analyzer" }, -- skip lsp setup because rust-tools will do it itself
  },
  plugins = {
    init = {
      {
        "simrat39/rust-tools.nvim",
        after = "mason-lspconfig.nvim", -- make sure to load after mason-lspconfig
        config = function()
          require("rust-tools").setup {
            server = astronvim.lsp.server_settings "rust_analyzer", -- get the server settings and built in capabilities/on_attach
          }
        end,
      },
    },
    ["mason-lspconfig"] = {
      ensure_installed = { "rust_analyzer" }, -- install rust_analyzer
    },
  },
}
```
