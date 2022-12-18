---
id: autopairs
title: Customize Autopairs
---

### Add Custom Rules to `nvim-autopairs`

We have provided a simple API in the user configuration to easily add custom rules to `nvim-autopairs`. This is done with the `nvim-autopairs.add_rules` table. Here is a example minimal `user/init.lua` configuration file:

```lua
return {
  ["nvim-autopairs"] = function()
    -- require Rule function
    local Rule = require "nvim-autopairs.rule"
    return {
      -- return table that is used in `npairs.add_rules({...})` call
      add_rules = {
        -- specify a list of rules to add
        Rule(" ", " "):with_pair(function(opts)
          local pair = opts.line:sub(opts.col - 1, opts.col)
          return vim.tbl_contains({ "()", "[]", "{}" }, pair)
        end),
        Rule("( ", " )")
          :with_pair(function() return false end)
          :with_move(function(opts) return opts.prev_char:match ".%)" ~= nil end)
          :use_key ")",
        Rule("{ ", " }")
          :with_pair(function() return false end)
          :with_move(function(opts) return opts.prev_char:match ".%}" ~= nil end)
          :use_key "}",
        Rule("[ ", " ]")
          :with_pair(function() return false end)
          :with_move(function(opts) return opts.prev_char:match ".%]" ~= nil end)
          :use_key "]",
      },
    }
  end,
}
```

Here we use the `function` notation so that we can run `require` safely on `nvim-autopairs`. Another approach is to split up your configuration and put the following in `user/nvim-autopairs.lua` which will automatically be loaded when it is needed:

```lua
local Rule = require "nvim-autopairs.rule"

return {
  -- return table that is used in `npairs.add_rules({...})` call
  add_rules = {
    -- specify a list of rules to add
    Rule(" ", " "):with_pair(function(opts)
      local pair = opts.line:sub(opts.col - 1, opts.col)
      return vim.tbl_contains({ "()", "[]", "{}" }, pair)
    end),
    Rule("( ", " )")
      :with_pair(function() return false end)
      :with_move(function(opts) return opts.prev_char:match ".%)" ~= nil end)
      :use_key ")",
    Rule("{ ", " }")
      :with_pair(function() return false end)
      :with_move(function(opts) return opts.prev_char:match ".%}" ~= nil end)
      :use_key "}",
    Rule("[ ", " ]")
      :with_pair(function() return false end)
      :with_move(function(opts) return opts.prev_char:match ".%]" ~= nil end)
      :use_key "]",
  },
}
```
