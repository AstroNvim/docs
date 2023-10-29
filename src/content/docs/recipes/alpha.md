---
id: alpha
title: Dashboard Customizations
---

### Customize Alpha Header

If you want to customize your header on the dashboard/home screen you can do this easily in the `user/init.lua` by overriding the `alpha` options:

```lua
return {
  plugins = {
    {
      "goolord/alpha-nvim",
      opts = function(_, opts) -- override the options using lazy.nvim
        opts.section.header.val = { -- change the header section value
          "    My Custom ",
          " Dashboard Header",
        }
      end,
    },
  },
}
```

### Open Alpha Automatically When No More Buffers

If you want to make the Alpha dashboard/home screen open automatically when you close the last buffer in your session you can add the following in your `user/init.lua` in your `mappings` table:

```lua
return {
  mappings = {
    n = {
      ["<leader>c"] = {
        function()
          local bufs = vim.fn.getbufinfo { buflisted = true }
          require("astronvim.utils.buffer").close(0)
          if require("astronvim.utils").is_available "alpha-nvim" and not bufs[2] then require("alpha").start(true) end
        end,
        desc = "Close buffer",
      },
    },
  },
}
```
