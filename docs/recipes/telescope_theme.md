---
id: telescope_theme
title: NvChad Telescope Theme
---

These code snippets make the telescope look like the default NvChad telescope theme:

**TODO INSERT SCREENSHOT**

Create file `user/theme.lua`:

```lua
local M = {}

function M.hi_colors()
  local colors = {
    bg = "#16161D",
    bg_alt = "#1F1F28",
    fg = "#DCD7BA",
    green = "#76946A",
    red = "#E46876",
  }
  local color_binds = {
    bg = { group = "NormalFloat", property = "background" },
    bg_alt = { group = "Cursor", property = "foreground" },
    fg = { group = "Cursor", property = "background" },
    green = { group = "diffAdded", property = "foreground" },
    red = { group = "diffRemoved", property = "foreground" },
  }
  local function get_hl_by_name(name)
    local ret = vim.api.nvim_get_hl_by_name(name.group, true)
    return string.format("#%06x", ret[name.property])
  end
  for k, v in pairs(color_binds) do
    local found, color = pcall(get_hl_by_name, v)
    if found then
      colors[k] = color
    end
  end
  return colors
end

function M.telescope_theme()
  local function set_bg(group, bg)
    vim.cmd("hi " .. group .. " guibg=" .. bg)
  end

  local function set_fg_bg(group, fg, bg)
    vim.cmd("hi " .. group .. " guifg=" .. fg .. " guibg=" .. bg)
  end

  local colors = M.hi_colors()
  set_fg_bg("TelescopeBorder", colors.bg_alt, colors.bg)
  set_fg_bg("TelescopePromptBorder", colors.bg, colors.bg)
  set_fg_bg("TelescopePromptNormal", colors.fg, colors.bg_alt)
  set_fg_bg("TelescopePromptPrefix", colors.red, colors.bg)
  set_fg_bg("TelescopePreviewTitle", colors.bg, colors.green)
  set_fg_bg("TelescopePromptTitle", colors.bg, colors.red)
  set_fg_bg("TelescopeResultsTitle", colors.bg, colors.bg)
  set_fg_bg("TelescopeResultsBorder", colors.bg, colors.bg)
  set_fg_bg("LvimInfoHeader", colors.bg, colors.green)
  set_fg_bg("LvimInfoIdentifier", colors.red, colors.bg_alt)
  set_bg("TelescopeSelection", colors.bg_alt)
  set_bg("TelescopeNormal", colors.bg)
end

return M
```

`user/init.lua`:

```lua
return {
  plugins = {
    telescope = {
      defaults = {
        prompt_prefix = "  ",
        borderchars = {
          prompt = { "─", "│", "─", "│", "╭", "╮", "╯", "╰" },
          results = { "─", "▐", "─", "│", "╭", "▐", "▐", "╰" },
          preview = { " ", "│", " ", "▌", "▌", "╮", "╯", "▌" },
        },
        selection_caret = "  ",
        layout_config = {
          width = 0.90,
          height = 0.85,
          preview_cutoff = 120,
          horizontal = {
            preview_width = function(_, cols, _)
              return math.floor(cols * 0.6)
            end,
          },
          vertical = {
            width = 0.9,
            height = 0.95,
            preview_height = 0.5,
          },
          flex = {
            horizontal = {
              preview_width = 0.9,
            },
          },
        },
        layout_strategy = "horizontal",
      },
    },
  },

  polish = function()
    vim.api.nvim_create_autocmd({ "VimEnter", "ColorScheme" }, {
      desc = "Set up telescope theme",
      pattern = "*",
      callback = require("user.theme").telescope_theme,
    })
  end,
}
```
