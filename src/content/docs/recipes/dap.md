---
id: dap
title: Debugger Setup
---

:::note

AstroNvim does not currently support debugging in Windows, and the debugging plugins will not be installed by default

:::

AstroNvim v2.9 introduced debugging support with AstroNvim. We use a combination of [`nvim-dap`](https://github.com/mfussenegger/nvim-dap) for the debugger, [`mason-nvim-dap`](https://github.com/jay-babu/mason-nvim-dap.nvim) for interoperability with the Mason package manager, and [`nvim-dap-ui`](https://github.com/rcarriga/nvim-dap-ui) for a nice user interface while debugging.

:::caution

Configuring `nvim-dap` can be very manual and require deep knowledge of the debugger that you are trying to set up. We cannot provide support for all of these debuggers and how to set them up outside of being able to provide APIs to interact with the underlying plugins. Please proceed with caution and expect it to take some time and effort to get things working perfectly.

:::

## Installing Debuggers With Mason

By default there are a few debuggers that can be automatically installed and configured just through Mason (with the help of [`mason-nvim-dap`](https://github.com/jay-babu/mason-nvim-dap.nvim)). This can be done using either the `:DapInstall` command or through the Mason UI with `:Mason`. For details on configuring `mason-nvim-dap` as well as which debuggers are supported, please check their `README` and documentation. It provides a function for setting up custom handlers for when a recognizable debugger is installed, this can be configured by extending the `config` function of the plugin:

```lua
return {
  "jay-babu/mason-nvim-dap.nvim",
  opts = {
    handlers = {
      python = function(source_name)
        local dap = require("dap")
        dap.adapters.python = {
          type = "executable",
          command = "/usr/bin/python3",
          args = {
            "-m",
            "debugpy.adapter",
          },
        }

        dap.configurations.python = {
          {
            type = "python",
            request = "launch",
            name = "Launch file",
            program = "${file}", -- This configuration will launch the current file if used.
          },
        }
      end,
    },
  },
}
```

### Automatically Install Debuggers

`mason-nvim-dap` also allows you to automatically install debuggers that you may want. This can be configured by extending the `mason-nvim-dap` plugin options:

```lua
return {
  "jay-babu/mason-nvim-dap.nvim",
  opts = {
    ensure_installed = { "python" },
  },
}
```

## Setting Up Custom Debuggers

Not all debugging adapters are supported by `mason-nvim-dap` or to be installed with Mason itself. For these it may be necessary for manually configuring adapters and configurations for `dap` directly. For details on configuring debuggers manually, please refer to the [`nvim-dap` wiki](https://github.com/mfussenegger/nvim-dap/wiki). Here is an example of configuring `nvim-dap` directly to add the python debugger:

```lua
return {
  "mfussenegger/nvim-dap",
  config = function()
    local dap = require("dap")
    dap.adapters.python = {
      type = "executable",
      command = "path/to/virtualenvs/debugpy/bin/python",
      args = { "-m", "debugpy.adapter" },
    }

    dap.configurations.python = {
      {
        -- The first three options are required by nvim-dap
        type = "python", -- the type here established the link to the adapter definition: `dap.adapters.python`
        request = "launch",
        name = "Launch file",

        -- Options below are for debugpy, see https://github.com/microsoft/debugpy/wiki/Debug-configuration-settings for supported options

        program = "${file}", -- This configuration will launch the current file if used.
        pythonPath = function()
          -- debugpy supports launching an application with a different interpreter then the one used to launch debugpy itself.
          -- The code below looks for a `venv` or `.venv` folder in the current directly and uses the python within.
          -- You could adapt this - to for example use the `VIRTUAL_ENV` environment variable.
          local cwd = vim.fn.getcwd()
          if vim.fn.executable(cwd .. "/venv/bin/python") == 1 then
            return cwd .. "/venv/bin/python"
          elseif vim.fn.executable(cwd .. "/.venv/bin/python") == 1 then
            return cwd .. "/.venv/bin/python"
          else
            return "/usr/bin/python"
          end
        end,
      },
    }
  end,
}
```

## Disabling Auto Debugging UI

By default, AstroNvim sets up event listeners with `nvim-dap` to automatically open and close the `nvim-dap-ui`. This can be disabled by overriding the `require("dapui").setup({...})` call with the function override method:

```lua
return {
  "rcarriga/nvim-dap-ui",
  config = function(plugin, opts)
    -- run default AstroNvim nvim-dap-ui configuration function
    require("plugins.configs.nvim-dap-ui")(plugin, opts)

    -- disable dap events that are created
    local dap = require("dap")
    dap.listeners.after.event_initialized["dapui_config"] = nil
    dap.listeners.before.event_terminated["dapui_config"] = nil
    dap.listeners.before.event_exited["dapui_config"] = nil
  end,
}
```

## Enable Plugins on Windows

This does not work out of the box and we cannot provide support for it at the moment, but if you want to enable the plugins on Windows then you can manually enable the `dap` plugin in your user configuration. Here is an example plugin spec to re-enable `nvim-dap`:

```lua
return { "mfussenegger/nvim-dap", enabled = true }
```
