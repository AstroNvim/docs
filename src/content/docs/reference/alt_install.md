---
id: alt_install
title: Alternative Installation
---

Here are a few different ways to go about installing AstroNvim including headless installation as well as isolated installations.

## Unattended Installation

Instead of running `nvim` to initialize AstroNvim you can run the
following command to do a fully headless initialization:

```sh
nvim --headless +q
```

1. Clone your configuration to `~/.config/nvim`, example using the AstroNvim template:

   ```sh
   git clone https://github.com/AstroNvim/template ~/.config/nvim`
   ```

2. Run the headless installation

   ```sh
   nvim --headless +q
   ```

## Isolated Installation

Neovim v0.9 introduced a great new environment variable called `NVIM_APPNAME` which allows the user to easily use configuration directories separate from the standard location. This is very useful if you want to install or try out AstroNvim without overwriting an existing Neovim configuration. The full details on the environment variable usage can be found in the Neovim documentation [`:h NVIM_APPNAME`](https://neovim.io/doc/user/starting.html#%24NVIM_APPNAME). Here is an example where we set it up using `NVIM_APPNAME=astronvim`:

1. Clone your configuration to `~/.config/astronvim`, example using the AstroNvim template:

   ```sh
   git clone https://github.com/AstroNvim/template ~/.config/astronvim`
   ```

2. Start the editor with `NVIM_APPNAME` environment variable set to `astronvim`

   ```sh
   NVIM_APPNAME=astronvim nvim
   ```

3. (_Optional_) An alias can be set up and added to your shell configuration to easily run this. For example with the following alias, the isolated installation can then be accessed by simply running `astronvim`:

   ```sh
   alias astronvim="NVIM_APPNAME=astronvim nvim"
   ```
