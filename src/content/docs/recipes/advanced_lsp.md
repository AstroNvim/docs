---
id: advanced_lsp
title: Advanced LSP Setup
---

LSP configuration is mostly done through the help of [AstroLSP](https://github.com/AstroNvim/astrolsp), the AstroNvim language server configuration engine plugin. This provides a simple to use interface for configuration while handling the complex integration between the AstroNvim features, [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), [mason.nvim](https://github.com/williamboman/mason.nvim) and mason related tooling, and [none-ls.nvim](https://github.com/nvimtools/none-ls.nvim). For full documentation on how to use and configure this plugin you can check out the [plugin's README](https://github.com/AstroNvim/astrolsp/tree/main#%EF%B8%8F-configuration) or run `:h astrolsp` in AstroNvim. All of the following recipes are provided through `lazy.nvim` plugin specifications and can be added to your own plugins.

## Configuring Language Servers

Our main tool for configuring and setting up language servers is with the [nvim-lspconfig plugin](https://github.com/neovim/nvim-lspconfig). This plugin provides configurations for many common language servers (A full list can be found in [nvim-lspconfig server configurations documentation](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md)). These baseline configuration options are not always sufficient to meet everyone's needs, and are typically configured by calling `require("lspconfig")[<server_name>].setup(opts)` where `opts` is a table of options. For the complete set of options that can be used in the `nvim-lspconfig` setup check out `:h lspcofnig-setup` in your editor.

AstroLSP automatically calls these `setup` functions for language servers installed through Mason and for servers specified manually (See [LSP Setup Without Installer](#lsp-setup-without-installer)). AstroLSP also provides a simple `config` table in the plugin's options for extending the built in server configurations provided by `nvim-lspconfig`.

```lua title="lua/plugins/astrolsp.lua" {5-13}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    config = {
      -- the key is the server name to configure
      -- the value is the configuration table
      clangd = {
        capabilities = {
          offsetEncoding = "utf-8",
        },
      },
    },
  },
}
```

### Custom LSP Definition

`nvim-lspconfig` is great, but it doesn't support all language servers that exist. You may want to set up a custom server where you manually define the `cmd` and the `root_dir`. This can also be done completely through `servers` and `config` tables similar to configuring servers that are supported by `nvim-lspconfig`! For these custom servers, the minimum requirement is defining a `cmd` in the `config` entry, but to get automatic starting of language servers you also need to set `filetypes` and `root_dir`. Here is a simple example setting up a Prolog LSP with `swipl`:

```lua title="lua/plugins/astrolsp.lua" {6-31}
return {
  "AstroNvim/astrolsp",
  -- we need to use the function notation to get access to the `lspconfig` module
  ---@param opts AstroLSPOpts
  opts = function(plugin, opts)
    -- insert "prolog_lsp" into our list of servers
    opts.servers = opts.servers or {}
    table.insert(opts.servers, "prolog_lsp")

    -- extend our configuration table to have our new prolog server
    opts.config = require("astrocore").extend_tbl(opts.config or {}, {
      -- this must be a function to get access to the `lspconfig` module
      prolog_lsp = {
        -- the command for starting the server
        cmd = {
          "swipl",
          "-g",
          "use_module(library(lsp_server)).",
          "-g",
          "lsp_server:main",
          "-t",
          "halt",
          "--",
          "stdio",
        },
        -- the filetypes to attach the server to
        filetypes = { "prolog" },
        -- root directory detection for detecting the project root
        root_dir = require("lspconfig.util").root_pattern("pack.pl"),
      },
    })
  end,
}
```

### LSP Setup Without Installer

AstroNvim comes with [mason-lspconfig](https://github.com/williamboman/mason-lspconfig.nvim) as an easy interface for setting up and installing language servers, but this might not be adequate for all users. The LSP installer doesn't support all of the language servers that Neovim's LSP config supports and some users may already have the language servers installed on their machine and don't want to reinstall it separately. In these cases we have added an easy interface for setting up these servers. The following plugin specification for AstroLSP simply sets up `pyright` language server for a user with `pyright` already available on their system:

```lua title="lua/plugins/astrolsp.lua" {7-12}
return {
  "AstroNvim/astrolsp",
  -- we must use the function override because table merging
  -- does not play nicely with list-like tables
  ---@param opts AstroLSPOpts
  opts = function(plugin, opts)
    -- safely extend the servers list
    opts.servers = opts.servers or {}
    vim.list_extend(opts.servers, {
      "pyright",
      -- add more servers as needed...
    })
  end,
}
```

## Customizing auto-format on save

AstroNvim has made formatting on save part of the default functionality out of the box. If you don't want your code to get auto formatted on save, you can disable it in the AstroLSP configuration:

```lua title="lua/plugins/astrolsp.lua" {6}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      format_on_save = false, -- enable or disable automatic formatting on save
    },
  },
}
```

We have also added an extension to just `true` or `false` for this option to give more the user the ability to disable the auto formatting for specific filetypes. For example:

```lua title="lua/plugins/astrolsp.lua" {6-12}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      format_on_save = {
        enabled = true, -- enable or disable
        ignore_filetypes = { -- disable format on save for specified filetypes
          "markdown",
          "python",
        },
      },
    },
  },
}
```

If you would rather use a whitelist of filetypes for formatting on save rather than a blacklist type model, you can do that as well with the `allow_filetypes` table. If you have `allow_filetypes` it will take precedence over `ignore_filetypes`. So please only use one of these options at a time. Here is an example:

```lua title="lua/plugins/astrolsp.lua" {8-11}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      format_on_save = {
        enabled = true, -- enable or disable
        allow_filetypes = { -- only allow formatting on save for these filetypes
          "lua",
          "python",
        },
      },
    },
  },
}
```

For even more control, you can provide a filter function with the key `filter`. This function takes a single parameter of the current buffer number and returns a boolean value of whether you want to format on save or not (`true` means format, `false` means do not format). This function will run on each save to calculate if it should format.

```lua title="lua/plugins/astrolsp.lua" {7-10}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      enabled = true, -- enable format on save
      filter = function(bufnr)
        -- any lua logic...
        return true -- return boolean whether or not to format
      end,
    },
  },
}
```

With the formatting on save enabled, we have also provided the mapping `<Leader>uf` and `<Leader>uF` to toggle the auto formatting temporarily for either the current buffer or globally (_Note:_ Format on save must be enabled in the AstroLSP `formatting` options for this option and keybinding to do anything).

## Controlling Formatting

Since Neovim v0.8 there have been improvements to how language servers are used for formatting files. Previously Neovim could only use a single language server to format files at a time and would prompt on each format if multiple were available. This led to users disabling formatting capabilities for different language servers and losing that functionality all together for convenience. Now you are able to format with many formatters at the same time and filter them with a function. To empower this, AstroNvim has a configuration option for controlling what formatters are used. This can be done either with a filter function or a list of disabled clients.

### Disabling formatting for a filter function

Using the `filter` option you can supply filter function to be run on each client that has formatting capabilities and if it returns `true` then it will be used for formatting and if it returns `false` then it will not be used. This applies to whenever you format your code either on save, with `<Leader>lf`, or with `:Format`.

```lua title="lua/plugins/astrolsp.lua" {6-19}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      filter = function(client)
        -- disable formatting for lua_ls
        if client.name == "lua_ls" then
          return false
        end

        -- only enable null-ls for javascript files
        if vim.bo.filetype == "javascript" then
          return client.name == "null-ls"
        end

        -- enable all other clients
        return true
      end,
    },
  },
}
```

### Disabling formatting for a list of language servers

Using the `disabled` option you can supply an array like list of language server client names and those clients will be disabled with you format your code either on save, with `<Leader>lf`, or with `:Format`.

```lua title="lua/plugins/astrolsp.lua" {6-9}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      disabled = {
        "lua_ls",
        "rust_analyzer",
      },
    },
  },
}
```

### Using both filter function and disabled list

When using the options together, a client listed in the `disabled` list will always be disabled and then all other clients will then be passed into the `filter` function. For example, we can simplify our previous `filter` function by just disabling the `lua_ls` client in the `disabled` table:

```lua title="lua/plugins/astrolsp.lua" {6-15}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      disabled = { "lua_ls" },
      filter = function(client)
        -- only enable null-ls for javascript files
        if vim.bo.filetype == "javascript" then
          return client.name == "null-ls"
        end

        -- enable all other clients
        return true
      end,
    },
  },
}
```

### Configure other formatting options

The `formatting` options also allows you to specify other parameters for the `vim.lsp.buf.format()` call. Any of the other formatting options are allowed to be used here to be used as the default options. This means being able to easily adjust the default `timeout_ms` for formatting in AstroNvim or making asynchronous formatting the default. For example you can do the following to increase the formatting timeout along with adjust the filtering:

```lua title="lua/plugins/astrolsp.lua" {6-7}
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    formatting = {
      format_on_save = true, -- enable or disable automatic formatting on save
      timeout_ms = 3200, -- adjust the timeout_ms variable for formatting
      disabled = { "lua_ls" },
      filter = function(client)
        -- only enable null-ls for javascript files
        if vim.bo.filetype == "javascript" then
          return client.name == "null-ls"
        end

        -- enable all other clients
        return true
      end,
    },
  },
}
```

## LSP Specific Plugins

:::tip

Many of these can be found pre-configured in the [AstroNvim Community Repository](https://github.com/AstroNvim/astrocommunity/), typically in the [`pack`](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack) folder, where these plugins usually end up being combined with other language-specific plugins.

:::

There are some plugins available for doing advanced setup of language servers that require the user to not use the `lspconfig` setup call and instead use their own plugin setup for handling this. AstroNvim provides a nice way to do this while still using `mason-lspconfig` for installing the language servers. You can use the `setup_handlers` table for specifying how language servers should be setup such as using a language specific plugin. This function for each handler has two parameters, the first is the name of the server and the second is the options we would be passing to the `lspconfig` setup call. These options include things such as our built in `capabilities`, `on_attach`, as well as the user defined options in the `config` table. Here are a couple examples for some common LSP plugins:

### Typescript ([typescript.nvim](https://github.com/jose-elias-alvarez/typescript.nvim))

:::tip

This is included in the [AstroCommunity TypeScript language pack](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack/typescript)

```lua title="lua/community.lua" ins={3}
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.typescript" },
}
```

:::

```lua title="lua/plugins/typescript.lua"
return {
  { "jose-elias-alvarez/typescript.nvim", lazy = true }, -- add lsp plugin
  {
    "AstroNvim/astrolsp",
    ---@type AstroLSPOpts
    opts = {
      setup_handlers = {
        -- add custom handler
        tsserver = function(_, opts)
          require("typescript").setup({ server = opts })
        end,
      },
    },
  },
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = { "tsserver" }, -- automatically install lsp
    },
  },
}
```

### Deno ([deno-nvim](https://github.com/sigmaSd/deno-nvim))

:::tip

This is included in the [AstroCommunity TypeScript Deno language pack](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack/typescript-deno)

```lua title="lua/community.lua" ins={3}
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.typescript-deno" },
}
```

:::

```lua title="lua/plugins/deno.lua"
return {
  { "sigmasd/deno-nvim", lazy = true }, -- add lsp plugin
  {
    "AstroNvim/astrolsp",
    ---@type AstroLSPOpts
    opts = {
      setup_handlers = {
        -- add custom handler
        denols = function(_, opts)
          require("deno-nvim").setup({ server = opts })
        end,
      },
    },
  },
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = { "denols" }, -- automatically install lsp
    },
  },
}
```

**tsserver + denols**

Since both `tsserver` and `denols` (and others such as `eslint` and `prettier`) attach to TypeScript/JavaScript files, some extra configuration may be required if both are installed.

:::tip

This is included in the [AstroCommunity TypeScript All-in-One language pack](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack/typescript-all-in-one)

```lua title="lua/community.lua" ins={3}
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.typescript-all-in-one" },
}
```

:::

To conditionally enable `tsserver`/`denols` based on the presence of `package.json`/`deno.json`, add the following plugin specs:

```lua title="lua/plugins/typescript_deno.lua"
return {
  "AstroNvim/astrolsp",
  ---@param opts AstroLSPOpts
  opts = function(plugin, opts)
    require("astrocore").extend_tbl(opts, {
      config = {
        denols = {
          root_dir = require("lspconfig.util").root_pattern(
            "deno.json",
            "deno.jsonc"
          ),
        },
        tsserver = {
          root_dir = require("lspconfig.util").root_pattern("package.json"),
        },
        -- eslint = {
        --   root_dir = require("lspconfig.util").root_pattern("package.json", ".eslintrc.json", ".eslintrc.js"),
        -- },
      },
    })
  end,
}
```

For `none-ls` packages (such as `prettier`, `prettierd`, or `eslint_d`), set the following to handlers in the `mason-null-ls` options:

```lua title="lua/plugins/typescript_deno_null_ls.lua"
return {
  "jay-babu/mason-null-ls.nvim",
  opts = {
    handlers = {
      -- for prettier
      prettier = function()
        require("null-ls").register(
          require("null-ls").builtins.formatting.prettier.with({
            condition = function(utils)
              return utils.root_has_file("package.json")
                or utils.root_has_file(".prettierrc")
                or utils.root_has_file(".prettierrc.json")
                or utils.root_has_file(".prettierrc.js")
            end,
          })
        )
      end,
      -- for prettierd
      prettierd = function()
        require("null-ls").register(
          require("null-ls").builtins.formatting.prettierd.with({
            condition = function(utils)
              return utils.root_has_file("package.json")
                or utils.root_has_file(".prettierrc")
                or utils.root_has_file(".prettierrc.json")
                or utils.root_has_file(".prettierrc.js")
            end,
          })
        )
      end,
      -- For eslint_d:
      eslint_d = function()
        require("null-ls").register(
          require("null-ls").builtins.diagnostics.eslint_d.with({
            condition = function(utils)
              return utils.root_has_file("package.json")
                or utils.root_has_file(".eslintrc.json")
                or utils.root_has_file(".eslintrc.js")
            end,
          })
        )
      end,
    },
  },
}
```

### C/C++ ([clangd_extensions.nvim](https://github.com/p00f/clangd_extensions.nvim))

:::tip

This is included in the [AstroCommunity C/C++ language pack](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack/cpp)

```lua title="lua/community.lua" ins={3}
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.cpp" },
}
```

:::

```lua title="lua/plugins/clangd.lua"
return {
  {
    "AstroNvim/astrolsp",
    ---@type AstroLSPOpts
    opts = {
      config = {
        clangd = {
          capabilities = {
            offsetEncoding = "utf-8",
          },
        },
      },
    },
  },
  {
    "p00f/clangd_extensions.nvim", -- install lsp plugin
    lazy = true,
    init = function()
      -- load clangd extensions when clangd attaches
      local augroup =
        vim.api.nvim_create_augroup("clangd_extensions", { clear = true })
      vim.api.nvim_create_autocmd("LspAttach", {
        group = augroup,
        desc = "Load clangd_extensions with clangd",
        callback = function(args)
          if
            assert(vim.lsp.get_client_by_id(args.data.client_id)).name
            == "clangd"
          then
            require("clangd_extensions")
            -- add more `clangd` setup here as needed such as loading autocmds
            vim.api.nvim_del_augroup_by_id(augroup) -- delete auto command since it only needs to happen once
          end
        end,
      })
    end,
  },
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = { "clangd" }, -- automatically install lsp
    },
  },
}
```

### Dart Flutter ([flutter-tools.nvim](https://github.com/akinsho/flutter-tools.nvim))

Requires `dart` to be available on the system.

:::tip

This is included in the [AstroCommunity Dart language pack](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack/dart)

```lua title="lua/community.lua" ins={3}
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.dart" },
}
```

:::

```lua title="lua/plugins/flutter-tools.lua"
return {
  { "akinsho/flutter-tools.nvim", lazy = true }, -- add lsp plugin
  {
    "AstroNvim/astrolsp",
    ---@param opts AstroLSPOpts
    opts = function(plugin, opts)
      opts.servers = opts.servers or {}
      table.insert(opts.servers, "dartls")

      opts = require("astrocore").extend_tbl(opts, {
        setup_handlers = {
          -- add custom handler
          dartls = function(_, dartls_opts)
            require("flutter-tools").setup({ lsp = dartls_opts })
          end,
        },
        config = {
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
      })
    end,
  },
}
```

### Rust ([rust-tools.nvim](https://github.com/simrat39/rust-tools.nvim))

:::tip

This is included in the [AstroCommunity Rust language pack](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack/rust)

```lua title="lua/community.lua" ins={3}
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.rust" },
}
```

:::

```lua title="lua/plugins/rust-tools.lua"
return {
  { "simrat39/rust-tools.nvim", lazy = true }, -- add lsp plugin
  {
    "AstroNvim/astrolsp",
    ---@type AstroLSPOpts
    opts = {
      setup_handlers = {
        -- add custom handler
        rust_analyzer = function(_, opts)
          require("rust-tools").setup({ server = opts })
        end,
      },
    },
  },
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = { "rust_analyzer" }, -- automatically install lsp
    },
  },
}
```

### Java ([nvim-jdtls](https://github.com/mfussenegger/nvim-jdtls))

:::tip

This is included in the [AstroCommunity Java language pack](https://github.com/AstroNvim/astrocommunity/tree/main/lua/astrocommunity/pack/java)

```lua title="lua/community.lua" ins={3}
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.pack.java" },
}
```

:::

```lua title="lua/plugins/jdtls.lua"
return {
  { "mfussenegger/nvim-jdtls", lazy = true }, -- load jdtls on module
  {
    "AstroNvim/astrolsp",
    ---@type AstroLSPOpts
    opts = {
      setup_handlers = {
        -- add custom handler
        jdtls = function(_, opts)
          vim.api.nvim_create_autocmd("Filetype", {
            pattern = "java", -- autocmd to start jdtls
            callback = function()
              if opts.root_dir and opts.root_dir ~= "" then
                require("jdtls").start_or_attach(opts)
              end
            end,
          })
        end,
      },
      config = {
        -- set jdtls server settings
        jdtls = function()
          -- use this function notation to build some variables
          local root_markers =
            { ".git", "mvnw", "gradlew", "pom.xml", "build.gradle" }
          local root_dir = require("jdtls.setup").find_root(root_markers)

          -- calculate workspace dir
          local project_name = vim.fn.fnamemodify(vim.fn.getcwd(), ":p:h:t")
          local workspace_dir = vim.fn.stdpath("data")
            .. "/site/java/workspace-root/"
            .. project_name
          os.execute("mkdir " .. workspace_dir)

          -- get the mason install path
          local install_path =
            require("mason-registry").get_package("jdtls"):get_install_path()

          -- get the current OS
          local os
          if vim.fn.has("macunix") then
            os = "mac"
          elseif vim.fn.has("win32") then
            os = "win"
          else
            os = "linux"
          end

          -- return the server config
          return {
            cmd = {
              "java",
              "-Declipse.application=org.eclipse.jdt.ls.core.id1",
              "-Dosgi.bundles.defaultStartLevel=4",
              "-Declipse.product=org.eclipse.jdt.ls.core.product",
              "-Dlog.protocol=true",
              "-Dlog.level=ALL",
              "-javaagent:" .. install_path .. "/lombok.jar",
              "-Xms1g",
              "--add-modules=ALL-SYSTEM",
              "--add-opens",
              "java.base/java.util=ALL-UNNAMED",
              "--add-opens",
              "java.base/java.lang=ALL-UNNAMED",
              "-jar",
              vim.fn.glob(
                install_path .. "/plugins/org.eclipse.equinox.launcher_*.jar"
              ),
              "-configuration",
              install_path .. "/config_" .. os,
              "-data",
              workspace_dir,
            },
            root_dir = root_dir,
          }
        end,
      },
    },
  },
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = { "jdtls" },
    },
  },
}
```
