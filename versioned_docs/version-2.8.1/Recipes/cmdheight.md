---
id: cmdheight
title: Disable cmdheight=0
---

By default AstroNvim enables the new feature of `cmdheight=0` that was introduced with Neovim v0.8+. Some users may not like this behavior and prefer to have the cmd line always displaying on the bottom

```lua
return {
  options = {
    opt = {
      cmdheight = 1,
    },
  },
}
```
