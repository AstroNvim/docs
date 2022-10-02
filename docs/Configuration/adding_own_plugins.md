---
id: adding_own_plugins
title: Adding your own plugins
---

## Create your own config file(s)
First off, for a comprehensive explanation of how best to manage your local configuration files see: [Managing user config](/Configuration/manage_user_config)

However if you're not familiar with Packer, neovim, lua or Astrovim here is the short version of how to add packages:

Create the file`~/.config/nvim/lua/user/init.lua`

and add the following contents 

```
local config = {
  plugins = {
    init = {
      { "tpope/vim-fugitive" },
      { "tpope/vim-surround" },
    },
}

return config
```

Then restart vim and type `<leader>` + p (for Packer, you should see it in the menu that appears) then `s` for "sync".
This runs Packer Sync, which is the command that installs and enables (or disables / removes when desired) packages

## To disable an AstroVim package

Within your `user/init.lua` file above add to the `init` block like so:

```
local config = {
  plugins = {
    init = {
      ["declancm/cinnamon.nvim"] = { disable = true },
      { "tpope/vim-fugitive" },
      { "tpope/vim-surround" },
    },
}

return config
```
Above we disable the cinnamon plugin by way of example
