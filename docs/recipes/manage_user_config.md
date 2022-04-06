---
id: manage_user_config
title: Managing User Configuration
---

One of the best parts of separating the user configuration of AstroVim away from modifying the system files is the ability to manage and track your own user configuration while maintaining the ability to still get AstroVim updates. The easiest process to do this would be as follows:

## Setting up a user configuration

1. Create a new repository using whatever version control system you would like. For these steps we will assume you are using `git` with the repo `username/astrovim_config`
2. Clone AstroVim (normal installation instructions)

```sh
git clone https://github.com/kabinspace/AstroVim ~/.config/nvim
```

3. Clone your empty new repository to your `~/.config/nvim/lua` folder

```sh
git clone https://github.com/username/astrovim_config.git ~/.config/nvim/lua/user
```

4. Copy the example `init.lua` file provided with AstroVim to your user directory:

```sh
cp ~/.config/nvim/lua/user_example/init.lua ~/.config/nvim/lua/user/init.lua
```

5. Initlialize AstroVim (this example is using the unattended installation as described above)

```sh
nvim  --headless -c 'autocmd User PackerComplete quitall' -c 'PackerSync'
```

6. Modify the `~/.config/nvim/lua/user` folder and `user/init.lua` file to your liking and push the changes you make to your repository

## Installing from an existing User Configuration

If you have already created your user configuration and have it tracked in a repository, then the process of getting your system up and running is very easy:

1. Clone AstroVim (normal installation instructions)

```sh
git clone https://github.com/kabinspace/AstroVim ~/.config/nvim
```

2. Clone your empty new repository to your `~/.config/nvim/lua` folder

```sh
git clone https://github.com/username/astrovim_config.git ~/.config/nvim/lua/user
```

3. Initialize AstroVim

```sh
nvim  --headless -c 'autocmd User PackerComplete quitall' -c 'PackerSync'
```
