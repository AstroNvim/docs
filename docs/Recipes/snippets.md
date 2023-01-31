---
id: snippets
title: Custom Snippets
---

`user/init.lua`:

```lua
return {
  plugins = {
    {
      "L3MON4D3/LuaSnip",
      config = function(plugin, opts)
        require "plugins.configs.luasnip"(plugin, opts) -- include the default astronvim config that calls the setup call
        require("luasnip.loaders.from_vscode").lazy_load { paths = { "./lua/user/snippets" } } -- load snippets paths
      end,
    },
  },
}
```

Create a folder inside of your `user/` folder called `snippets`. Add snippets to that folder that follow the vscode style as described in the [Documentation](https://github.com/L3MON4D3/LuaSnip/blob/master/DOC.md#vscode-snippets-loader)

Necessary configuration file in `user/snippets/package.json`:

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

Example Vue snippet in `user/snippets/vue.json`:

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
