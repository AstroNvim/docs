---
id: alpha
title: Dashboard Customizations
---

### Customize Alpha Header

If you want to customize your header on the dashboard you can do this easily in the `user/init.lua` by overriding the `alpha` options:

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

If you want to make the Alpha dashboard open automatically when you close the last buffer in your session you can add the following in your `user/init.lua` in your `polish` function:

```lua
return {
  polish = function()
    local function alpha_on_bye(cmd)
      local bufs = vim.fn.getbufinfo { buflisted = true }
      vim.cmd(cmd)
      if astronvim.is_available "alpha-nvim" and not bufs[2] then
        require("alpha").start(true)
      end
    end
    vim.keymap.del("n", "<leader>c")
    if astronvim.is_available "bufdelete.nvim" then
      vim.keymap.set("n", "<leader>c", function()
        alpha_on_bye "Bdelete!"
      end, { desc = "Close buffer" })
    else
      vim.keymap.set("n", "<leader>c", function()
        alpha_on_bye "bdelete!"
      end, { desc = "Close buffer" })
    end
  end,
}
```
