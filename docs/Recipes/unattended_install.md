---
id: unattended_install
title: Unattended Installation
---

Instead of running `nvim` to initialize AstroNvim you can run the
following command to do a fully headless initialization:

```sh
nvim  --headless -c 'quitall'
```

Full Steps:

1. `git clone --depth 1 https://github.com/AstroNvim/AstroNvim ~/.config/nvim`
2. (Optional) `git clone`/copy over user configuration to `~/.config/nvim/user`
3. `nvim --headless -c 'quitall'`
