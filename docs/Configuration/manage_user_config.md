---
id: manage_user_config
title: Managing User Configuration
sidebar_position: 1
---

One of the best parts of separating the user configuration of AstroNvim away from modifying the system files is the ability to manage and track your own user configuration while maintaining the ability to still get AstroNvim updates. The easiest process to do this would be as follows:

## Setting up a user configuration

1. Create a new repository using whatever version control system you would like. For these steps we will assume you are using `git` with the repo `username/astronvim_config`
2. Clone AstroNvim (normal installation instructions)

```sh
git clone https://github.com/AstroNvim/AstroNvim ~/.config/nvim
```

3. Clone your empty new repository to your `~/.config/nvim/lua` folder

```sh
git clone https://github.com/username/astronvim_config.git ~/.config/nvim/lua/user
```

:::tip

If you want to keep your user configuration completely separate from the cloned repository, you can also put this folder in `$XDG_CONFIG_HOME/astronvim/lua/user`. AstroNvim adds the folder `$XDG_CONFIG_HOME/astronvim` to the `runtimepath` so any `vimscript` or `lua` files in there can be sourced.

:::

4. Copy the example `init.lua` file provided with AstroNvim to your user directory:

```sh
cp -r ~/.config/nvim/lua/user_example/ ~/.config/nvim/lua/user/
```

5. Initlialize AstroNvim (this example is using the unattended installation as described above)

```sh
nvim  --headless -c 'autocmd User LazyDone quitall'
```

6. Modify the `~/.config/nvim/lua/user` folder and `user/init.lua` file to your liking and push the changes you make to your repository

## Installing from an existing User Configuration

If you have already created your user configuration and have it tracked in a repository, then the process of getting your system up and running is very easy:

1. Clone AstroNvim (normal installation instructions)

```sh
git clone https://github.com/AstroNvim/AstroNvim ~/.config/nvim
```

2. Clone your empty new repository to your `~/.config/nvim/lua` folder

```sh
git clone https://github.com/username/astronvim_config.git ~/.config/nvim/lua/user
```

3. Initialize AstroNvim

```sh
nvim  --headless -c 'autocmd User LazyDone quitall'
```
