---
id: disable_tabline
title: Disable Tabline
---

By default AstroNvim uses Heirline for generating the tabline for displaying buffers as tabs. Some users may not like this behavior and prefer to not have the bar at the top. You can do this a couple ways. The easiest would be to set `vim.opt.showtabline` to `0` which will hide the bar but still let it be toggled in the UI as well as let the interactive buffer picker with `<Leader>b` to function when necessary. To do this you simply want to add the following to your plugins:

```lua title="lua/plugins/hide_tabline.lua"
return {
  {
    "AstroNvim/astrocore",
    ---@param opts AstroCoreOpts
    opts = {
      options = {
        opt = {
          showtabline = 0,
        },
      },
    },
  },
}
```

## Fully disable `tabline`

:::tip

This is available in the [AstroCommunity](https://github.com/AstroNvim/astrocommunity/tree/v4/lua/astrocommunity/recipes/disable-tabline)

```lua title="lua/community.lua" ins={3}
return {
  "AstroNvim/astrocommunity",
  { import = "astrocommunity.recipes.disable-tabline" },
}
```

:::

If you want to fully remove the `tabline` definition from Heirline as well as the `<Leader>b` functionality as well and not allow you to ever toggle the tabline on, you will also want to include the following in your plugins:

```lua title="lua/plugins/disable_tabline.lua"
return {
  {
    "AstroNvim/astrocore",
    ---@param opts AstroCoreOpts
    opts = function(_, opts)
      for k, _ in pairs(opts.mappings.n) do
        if k:find("^<Leader>b") then
          opts.mappings.n[k] = false
        end
      end
    end,
  },
  {
    "rebelot/heirline.nvim",
    opts = function(_, opts)
      opts.tabline = nil -- remove tabline
    end,
  },
}
```
