---
id: snippets
title: Custom VS Code Style Snippets
---

`user/init.lua`:

```lua
return {
  luasnip = {
    vscode_snippet_paths = {
      "./lua/user/snippets",
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
