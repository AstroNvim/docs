---
id: manual_lsp
title: Manually Add LSP
---

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
