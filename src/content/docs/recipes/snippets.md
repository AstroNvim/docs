---
id: snippets
title: Custom Snippets
---

Here is an example plugin specification to go inside your plugins folder which adds a custom path for it to load from. Be sure to read the comments in order to understand how to use this code for your environment.

```lua
return {
  "L3MON4D3/LuaSnip",
  config = function(plugin, opts)
    -- include the default astronvim config that calls the setup call
    require("plugins.configs.luasnip")(plugin, opts)
    -- load snippets paths
    require("luasnip.loaders.from_vscode").lazy_load({
      paths = { vim.fn.stdpath("data") .. "/lua/snippets" },
    })
  end,
}
```

Depending on the location of your configuration (typically `~/.config/nvim`), create a subdirectory named `snippets` in your `lua/` folder.
Custom snippets will be added to this `snippets` directory. They will follow the vscode style as described in the [documentation](https://github.com/l3mon4d3/luasnip/blob/master/doc.md#vscode-snippets-loader)

This example Vue snippet is added as `snippets/vue.json`:

```json
{
  "setup": {
    "prefix": ["setup", "template"],
    "body": [
      "<template>",
      "\t$1",
      "</template>",
      "",
      "<script lang=\"ts\" setup>",
      "\t$2",
      "</script>",
      "",
      "<style lang=\"sass\">",
      "\t$3",
      "</style>",
      ""
    ],
    "description": "My standard setup Vue3 + TS"
  }
}
```

In order for Luasnip to see the newly added snippet, it must be cataloged in `snippets/package.json`:

```json
{
  "name": "user snippets",
  "engines": {
    "vscode": "^1.11.0"
  },
  "contributes": {
    "snippets": [
      {
        "language": "vue",
        "path": "./vue.json"
      }
    ]
  }
}
```

To verify the newly added snippet works, create a new vue file and type any string represented in the snippet's prefix; in this case, `setup`. You can also use `:LuaSnipListAvailable` to see a list of all snippets available.
