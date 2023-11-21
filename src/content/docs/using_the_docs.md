---
id: using_the_docs
title: Using This Documentation
---

AstroNvim is configured nearly entirely through the configuration of Neovim plugins which we provide with the help of `lazy.nvim`. Plugins are typically configured in the `lua/plugins/` folder within your Neovim configuration folder. Throughout this documentation we include many code snippets to help guide users which are full files that return `lazy.nvim` plugin specifications. The easiest way to utilize these is to simply copy the contents into a new file in your `plugins/` folder and it will automatically be loaded into AstroNvim the next time you start up the editor. These code blocks can also be added into files that you have already created as well just need to manually move the content you need into the appropriate place.

For example, a recipe or code block may look like this which describes how to automatically install the Typescript language server:

```lua title="lua/plugins/mason-lspconfig.lua"
return {
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = { "tsserver" },
    },
  },
}
```

This can either be fully copied and pasted into a new file in your `lua/plugins` folder under the recommended name or by any other name that fits the organization of your choosing (such as `lua/plugins/tsserver.lua`):

```lua title="lua/plugins/tsserver.lua" ins={1-8}
return {
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = { "tsserver" },
    },
  },
}
```

Sometimes you might want to consolidate the code as well such as if you are already automatically installing other language servers. In that case you will just want to take the code that is in the recipe and fit it into files/locations that you are already managing. For example, say you already have a `lua/plugins/mason-lspconfig.lua` file that is automatically installing the python language server:

```lua title="lua/plugins/mason-lspconfig.lua" ins={7}
return {
  {
    "williamboman/mason-lspconfig.nvim",
    opts = {
      ensure_installed = {
        "pyright",
        "tsserver",
      },
    },
  },
}
```

Consolidating plugin specifications can help make your configuration more manageable in some ways while having things more separated can make it easier to enable/disable features and play around with things. It is fully up to you to decide which methods fit your needs.

::::caution

Some plugin specifications may require more or less knowledge of the Lua programming language to effectively consolidate. Some recipes use a function notation to get more control over the `opts` table rather than simply specifying a list. It will take some Lua knowledge and programming skills to correctly consolidate these two formats together. Or you can just keep the snippets in separate files and they will all be applied in an isolated manner.

::::
