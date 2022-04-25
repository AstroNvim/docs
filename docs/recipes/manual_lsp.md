---
id: manual_lsp
title: Manually Add LSP
---

AstroNvim comes with [nvim-lsp-installer](https://github.com/williamboman/nvim-lsp-installer) as an easy interface for setting up and installing language servers, but this might not be adequate for all users. The LSP installer doesn't support all of the language servers that Neovim's LSP config supports and some users may already have the language servers installed on their machine and don't want to reinstall it separately. In these cases the user can easily do a more traditional LSP set up workflow in their `user/init.lua` file in the `polish` function and utilizing the provided LSP `on_attach` function and `capabilities`. The following is a minimal `user/init.lua` file that simply sets up `pyright` language server for a user with `pyright` already available on their system:

```lua
return {
  polish = function()
    local lsp_avail, lspconfig = pcall(require, "lspconfig") -- require lspconfig
    if lsp_avail then -- if lspconfig is available (simple error handling)
      local handlers = require "configs.lsp.handlers" -- get the internal lsp handler objects
      lspconfig.pyright.setup { -- call the setup for whatever language server you want
        on_attach = handlers.on_attach, -- internal on_attach function used by lsp installer
        capabilities = handlers.capabilities, -- internal capabilities of AstroNvim
      }
    end
  end,
}
```
