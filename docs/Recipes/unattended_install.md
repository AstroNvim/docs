---
id: unattended_install
title: Unattended Installation
---

Instead of running `nvim` to initialize AstroNvim you can run the
following command to do a fully headless initialization:

```sh
nvim  --headless -c 'autocmd User LazyDone quitall'
```

Full Steps:

1. `git clone https://github.com/AstroNvim/AstroNvim ~/.config/nvim`
2. (Optional) `git clone`/copy over user configuration to `~/.config/nvim/user`
3. `nvim --headless -c 'autocmd User LazyDone quitall'
