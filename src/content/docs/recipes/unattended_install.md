---
id: unattended_install
title: Unattended Installation
---

Instead of running `nvim` to initialize AstroNvim you can run the
following command to do a fully headless initialization:

```sh
nvim --headless +q
```

## Headless Installation

1. Clone your configuration to `~/.config/nvim` (For the example template:

   ```sh
   git clone --depth 1 https://github.com/AstroNvim/template ~/.config/nvim`
   ```

2. Run the headless installation

   ```sh
   nvim --headless +q
   ```
