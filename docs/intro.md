---
id: intro
title: Getting Started
slug: /
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

![AstroNvim Screenshot](/img/overview.png)

## ⚡ Requirements

- [Nerd Fonts](https://www.nerdfonts.com/font-downloads) (_Optional with manual intervention:_ See [Recipes/Customizing Icons](Recipes/icons#disable-icons))
- [Neovim 0.8 (_Not_ including nightly)](https://github.com/neovim/neovim/releases/tag/v0.8.0)
- [Tree-sitter CLI](https://github.com/tree-sitter/tree-sitter/blob/master/cli/README.md) (_Note:_ This is only necessary if you want to use `auto_install` feature with Treesitter)
- A clipboard tool is necessary for the integration with the system clipboard (see [`:help clipboard-tool`](https://neovim.io/doc/user/provider.html#clipboard-tool) for supported solutions)
- Terminal with true color support (for the default theme, otherwise it is dependent on the theme you are using)
- Optional Requirements:
  - [ripgrep](https://github.com/BurntSushi/ripgrep) - live grep telescope search (`<leader>fw`)
  - [lazygit](https://github.com/jesseduffield/lazygit) - git ui toggle terminal (`<leader>tl` or `<leader>gg`)
  - [go DiskUsage()](https://github.com/dundee/gdu) - disk usage toggle terminal (`<leader>tu`)
  - [bottom](https://github.com/ClementTsang/bottom) - process viewer toggle terminal (`<leader>tt`)
  - [Python](https://www.python.org/) - python repl toggle terminal (`<leader>tp`)
  - [Node](https://nodejs.org/en/) - node repl toggle terminal (`<leader>tn`)

:::info

When using default theme: For MacOS, the default terminal does not have true color support. You will need to use [iTerm2](https://iterm2.com/) or another [terminal emulator](https://gist.github.com/XVilka/8346728#terminal-emulators) that has true color support.

:::

## 🛠️ Installation

<Tabs>

<TabItem value="nix" label="Linux/Mac OS (Unix)" default>

#### Make a backup of your current nvim folder

```sh
mv ~/.config/nvim ~/.config/nvim.bak
```

#### Clean old plugins (Optional but recommended)

```sh
mv ~/.local/share/nvim/site ~/.local/share/nvim/site.bak
```

#### Clone the repository

```sh
git clone https://github.com/AstroNvim/AstroNvim ~/.config/nvim
nvim +PackerSync
```

</TabItem>

<TabItem value="windoze" label="Windows (PowerShell)" default>

#### Make a backup of your current nvim folder

```powershell
Move-Item $env:LOCALAPPDATA\nvim $env:LOCALAPPDATA\nvim.bak
```

#### Clean old plugins (Optional but recommended)

```powershell
Move-Item $env:LOCALAPPDATA\nvim-data $env:LOCALAPPDATA\nvim-data.bak
```

#### Clone the repository

```powershell
git clone https://github.com/AstroNvim/AstroNvim $env:LOCALAPPDATA\nvim
nvim +PackerSync
```

</TabItem>

<TabItem value="docker" label="Docker" default>

If you want to try AstroNvim before installing you can user the following Docker command to open a test instance without touching your current Neovim configuration. This also allows you to use `:TSInstall` and `:LspInstall` to load and evaluate language servers and treesitter parsers as well.

```sh
docker run -w /root -it --rm alpine:edge sh -uelic '
  apk add git nodejs npm lazygit gdu btm python3 neovim ripgrep alpine-sdk --update
  git clone https://github.com/AstroNvim/AstroNvim ~/.config/nvim
  # Uncomment the line below and replace the link with your user config repo to load a user config
  # git clone https://github.com/username/AstroNvim_user ~/.config/nvim/lua/user
  nvim --headless -c "autocmd User PackerComplete quitall" -c "PackerSync"
  nvim
'
```

</TabItem>

</Tabs>

## 📦 Setup

#### Install LSP

Enter `:LspInstall` followed by the name of the server you want to install

> Example: `:LspInstall pyright`

#### Install language parser

Enter `:TSInstall` followed by the name of the language you want to install

> Example: `:TSInstall python`

#### Manage plugins

Run `:PackerClean` to remove any disabled or unused plugins

Run `:PackerSync` to update and clean plugins

#### Update AstroNvim

Run `:AstroUpdate` to get the latest updates from the repository

#### Reload AstroNvim (_EXPERIMENTAL_)

Run `:AstroReload` to reload the AstroNvim configuration and any new user configuration changes without restarting. This is currently an experimental feature and may lead to instability until the next restart. We have noticed that in particular some language servers do not correctly unattach and reattach after the reloading and cause multiple LSP clients to attach to the same buffer.

## ✨ Features

- File explorer with [Neo-tree](https://github.com/nvim-neo-tree/neo-tree.nvim)
- Autocompletion with [Cmp](https://github.com/hrsh7th/nvim-cmp)
- Git integration with [Gitsigns](https://github.com/lewis6991/gitsigns.nvim)
- Statusline with [Heirline](https://github.com/rebelot/heirline.nvim)
- Terminal with [Toggleterm](https://github.com/akinsho/toggleterm.nvim)
- Fuzzy finding with [Telescope](https://github.com/nvim-telescope/telescope.nvim)
- Syntax highlighting with [Treesitter](https://github.com/nvim-treesitter/nvim-treesitter)
- Formatting and linting with [Null-ls](https://github.com/jose-elias-alvarez/null-ls.nvim)
- Language Server Protocol with [Native LSP](https://github.com/neovim/nvim-lspconfig)

## ⚙️ Configuration

To begin making custom user configurations you must create a `user/` folder. The provided example can be created with (please note the trailing slashes after the directory names)

```sh
cp -r ~/.config/nvim/lua/user_example/ ~/.config/nvim/lua/user/
```

The provided example
[user_example](https://github.com/AstroNvim/AstroNvim/blob/main/lua/user_example)
contains an `init.lua` file which can be used for all user configuration. After
running the `cp` command above this file can be found in
`~/.config/nvim/lua/user/init.lua`.
