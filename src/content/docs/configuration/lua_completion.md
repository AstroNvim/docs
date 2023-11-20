---
id: lua_completion
title: Lua Language Server Integration
---

Each of the core AstroNvim plugins have full integration with the Lua Language Server which can be used to provide autocompletion and access to documentation directly in the editor. To enable this integration, you simply have to specify in the plugin specifications the type of the `opts` table. Each plugin provides the following Lua types:

| Plugin    | Lua Type        |
| --------- | --------------- |
| AstroCore | `AstroCoreOpts` |
| AstroUI   | `AstroUIOpts`   |
| AstroLSP  | `AstroLSPOpts`  |

In `lazy.nvim` there are a couple formats that the `opts` can be specified in, either a Lua table or a Lua Function. Here is the notation to specify the typing in each situation. For more information on how plugins are customized, check out the [Custom Plugins page](/configuration/custom_plugins).

### `opts` Table

Most commonly, the `opts` will be specified as a simple table. This is useful if you simply want to extend the table without any special logic. For this case, you simply have to specify the type of the table above it.

```lua
return {
  "AstroNvim/astrocore",
  ---@type AstroCoreOpts
  opts = {
    -- options can be specified here.
  },
}
```

::::tip

AstroLSP allows for language server configuration completion by utilizing types exposed by the `nvim-lspconfig` plugin. One downside is the type does complain that "fields are missing" even though they are not actually required. To work around this, it can be useful and less noisy if you add

```
---@diagnostic disable: missing-fields
```

before the `config` table. Here is an example:

```lua
return {
  "AstroNvim/astrolsp",
  ---@type AstroLSPOpts
  opts = {
    ---@diagnostic disable: missing-fields
    config = {
      -- LSP options and server configuration go here...
    },
  },
}
```

::::

### `opts` Function

Other times a function may be required if you want to include any sort of special logic for calculating the table or for handling cases that table merging doesn't deal with properly such as list-like tables. Here you need to specify the type of the parameter in the function.

```lua
return {
  "AstroNvim/astrocore",
  ---@param opts AstroCoreOpts
  opts = function(plugin, opts)
    -- modify the `opts` table using pure Lua
  end,
}
```
