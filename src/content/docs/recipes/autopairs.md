---
id: autopairs
title: Customize Autopairs
---

### Add Custom Rules to `nvim-autopairs`

You can easily add rules and further configure `nvim-autopairs` in your user configuration by overriding the configuration function of the `nvim-autopairs` plugin. Here is a example `lazy.nvim` plugin spec:

```lua
{ -- override nvim-autopairs plugin
  "windwp/nvim-autopairs",
  config = function(plugin, opts)
    -- run default AstroNvim config
    require "plugins.configs.nvim-autopairs"(plugin, opts)
    -- require Rule function
    local Rule = require "nvim-autopairs.rule"
    local npairs = require "nvim-autopairs"
    npairs.add_rules {
      {
        -- specify a list of rules to add
        Rule(" ", " "):with_pair(function(options)
          local pair = options.line:sub(options.col - 1, options.col)
          return vim.tbl_contains({ "()", "[]", "{}" }, pair)
        end),
        Rule("( ", " )")
          :with_pair(function() return false end)
          :with_move(function(options) return options.prev_char:match ".%)" ~= nil end)
          :use_key ")",
        Rule("{ ", " }")
          :with_pair(function() return false end)
          :with_move(function(options) return options.prev_char:match ".%}" ~= nil end)
          :use_key "}",
        Rule("[ ", " ]")
          :with_pair(function() return false end)
          :with_move(function(options) return options.prev_char:match ".%]" ~= nil end)
          :use_key "]",
      },
    }
  end,
}
```
