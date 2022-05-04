---
id: telescope_theme
title: NvChad Telescope Theme
---

These code snippets make the telescope look like the default NvChad telescope theme:

![Screenshot of telescope theme](/img/recipes/telescope_theme.png)

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
  local colors = M.hi_colors()
  vim.api.nvim_set_hl(0, "TelescopeBorder", { fg = colors.bg_alt, bg = colors.bg })
  vim.api.nvim_set_hl(0, "TelescopePromptBorder", { fg = colors.bg, bg = colors.bg })
  vim.api.nvim_set_hl(0, "TelescopePromptNormal", { fg = colors.fg, bg = colors.bg_alt })
  vim.api.nvim_set_hl(0, "TelescopePromptPrefix", { fg = colors.red, bg = colors.bg })
  vim.api.nvim_set_hl(0, "TelescopePreviewTitle", { fg = colors.bg, bg = colors.green })
  vim.api.nvim_set_hl(0, "TelescopePromptTitle", { fg = colors.bg, bg = colors.red })
  vim.api.nvim_set_hl(0, "TelescopeResultsTitle", { fg = colors.bg, bg = colors.bg })
  vim.api.nvim_set_hl(0, "TelescopeResultsBorder", { fg = colors.bg, bg = colors.bg })
  vim.api.nvim_set_hl(0, "LvimInfoHeader", { fg = colors.bg, bg = colors.green })
  vim.api.nvim_set_hl(0, "LvimInfoIdentifier", { fg = colors.red, bg = colors.bg_alt })
  vim.api.nvim_set_hl(0, "TelescopeSelection", { bg = colors.bg_alt })
  vim.api.nvim_set_hl(0, "TelescopeNormal", { bg = colors.bg })
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
