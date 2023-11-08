---
id: isolated
title: Isolated Installation
---

Neovim v0.9 introduced a great new environment variable called `NVIM_APPNAME` which allows the user to easily use configuration directories separate from the standard location. This is very useful if you want to install or try out AstroNvim without overwriting an existing Neovim configuration. Here we provide an example of using this environment variable, but for more details check out the Neovim documentation [`:h NVIM_APPNAME`](https://neovim.io/doc/user/starting.html#%24NVIM_APPNAME).

## Example Usage

1. Follow the installation steps described in the [Getting started page](/#%EF%B8%8F-installation) except when you do the clone, clone the repository to `~/.config/astronvim`

   ```sh
   git clone --depth 1 https://github.com/AstroNvim/template ~/.config/astronvim
   rm -rf ~/.config/astronvim/.git
   ```

2. Start the editor with `NVIM_APPNAME` environment variable set to `astronvim`

   ```sh
   NVIM_APPNAME=astronvim nvim
   ```

3. (_Optional_) An alias can be set up and added to your shell configuration to easily run this. For example with the following alias, the isolated installation can then be accessed by simply running `astronvim`:

   ```sh
   alias astronvim="NVIM_APPNAME=astronvim nvim"
   ```
