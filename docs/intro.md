---
id: intro
title: Getting Started
slug: /
---

![AstroNvim Screenshot](/img/overview.png)

:::caution

If you previously installed AstroVim before it was rebranded to AstroNvim please run the following command:

```sh
git -C ~/.config/nvim remote set-url origin https://github.com/AstroNvim/AstroNvim.git
```

:::

## ⚡ Requirements

- [Nerd Fonts](https://www.nerdfonts.com/font-downloads)
- [Neovim 0.7+](https://github.com/neovim/neovim/releases/tag/v0.7.0)
- Terminal with true color support (for the default theme, otherwise it is dependent on the theme you are using)
- Optional Requirements:
  - [fzf](https://github.com/junegunn/fzf) - live grep telescope search (`<leader>fw`)
  - [lazygit](https://github.com/jesseduffield/lazygit) - git ui toggle terminal (`<leader>tl` or `<leader>gg`)
  - [NCDU](https://dev.yorhel.nl/ncdu) - disk usage toggle terminal (`<leader>tu`)
  - [Htop](https://htop.dev/) - process viewer toggle terminal (`<leader>tt`)
  - [Python](https://www.python.org/) - python repl toggle terminal (`<leader>tp`)
  - [Node](https://nodejs.org/en/) - node repl toggle terminal (`<leader>tn`)

:::info

When using default theme: For MacOS, the default terminal does not have true color support. You wil need to use [iTerm2](https://iterm2.com/) or another [terminal emulator](https://gist.github.com/XVilka/8346728#terminal-emulators) that has true color support.

:::

## 🛠️ Installation

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

:::info

If you are still using Neovim v0.6 you can still use the last version of AstroNvim prior to the Neovim v0.7 release. After running the `git clone` command above please checkout the `nvim-0.6` branch like so:

```
git -C ~/.config/nvim checkout nvim-0.6
```

_Note:_ This branch will not be updated after the Neovim v0.7 release and will not get any new features or bug fixes.

:::

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

## ✨ Features

- File explorer with [Neo-tree](https://github.com/nvim-neo-tree/neo-tree.nvim)
- Autocompletion with [Cmp](https://github.com/hrsh7th/nvim-cmp)
- Git integration with [Gitsigns](https://github.com/lewis6991/gitsigns.nvim)
- Statusline with [Lualine](https://github.com/nvim-lualine/lualine.nvim)
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
