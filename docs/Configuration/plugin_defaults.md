---
id: plugin_defaults
title: Default Plugin Configurations
---

This page documents the default options that are set by AstroNvim for each individual plugin. All of these options can be changed in the `plugins` table in the `user/init.lua` configuration file as described in the [Custom Plugins Documentation](../Recipes/custom_plugins.md).

## aerial.nvim

```lua
opts = {
  buftype_exclude = {
    "nofile",
    "terminal",
  },
  filetype_exclude = {
    "help",
    "startify",
    "aerial",
    "alpha",
    "dashboard",
    "lazy",
    "neogitstatus",
    "NvimTree",
    "neo-tree",
    "Trouble",
  },
  context_patterns = {
    "class",
    "return",
    "function",
    "method",
    "^if",
    "^while",
    "jsx_element",
    "^for",
    "^object",
    "^table",
    "block",
    "arguments",
    "if_statement",
    "else_clause",
    "jsx_element",
    "jsx_self_closing_element",
    "try_statement",
    "catch_clause",
    "import_statement",
    "operation_type",
  },
  show_trailing_blankline_indent = false,
  use_treesitter = true,
  char = "▏",
  context_char = "▏",
  show_current_context = true,
}
```

## alpha-nvim

```lua
opts = function()
  local dashboard = require "alpha.themes.dashboard"
  dashboard.section.header.val = {
    " █████  ███████ ████████ ██████   ██████",
    "██   ██ ██         ██    ██   ██ ██    ██",
    "███████ ███████    ██    ██████  ██    ██",
    "██   ██      ██    ██    ██   ██ ██    ██",
    "██   ██ ███████    ██    ██   ██  ██████",
    " ",
    "    ███    ██ ██    ██ ██ ███    ███",
    "    ████   ██ ██    ██ ██ ████  ████",
    "    ██ ██  ██ ██    ██ ██ ██ ████ ██",
    "    ██  ██ ██  ██  ██  ██ ██  ██  ██",
    "    ██   ████   ████   ██ ██      ██",
  }
  dashboard.section.header.opts.hl = "DashboardHeader"

  dashboard.section.buttons.val = {
    astronvim.alpha_button("LDR n", "  New File  "),
    astronvim.alpha_button("LDR f f", "  Find File  "),
    astronvim.alpha_button("LDR f o", "  Recents  "),
    astronvim.alpha_button("LDR f w", "  Find Word  "),
    astronvim.alpha_button("LDR f '", "  Bookmarks  "),
    astronvim.alpha_button("LDR S l", "  Last Session  "),
  }

  dashboard.section.footer.val =
    { " ", " ", " ", "AstroNvim loaded " .. require("lazy").stats().count .. " plugins " }
  dashboard.section.footer.opts.hl = "DashboardFooter"

  dashboard.config.layout[1].val = vim.fn.max { 2, vim.fn.floor(vim.fn.winheight(0) * 0.2) }
  dashboard.config.layout[3].val = 5
  dashboard.config.opts.noautocmd = true
  return dashboard
end
```

## astrotheme

```lua
opts = { plugins = { ["dashboard-nvim"] = true } }
```

## better-escape.nvim

```lua
opts = { timeout = 300 }
```

## Comment.nvim

```lua
opts = function()
  return { pre_hook = require("ts_context_commentstring.integrations.comment_nvim").create_pre_hook() }
end
```

## dressing.nvim

```lua
opts = {
  input = {
    default_prompt = "➤ ",
    win_options = { winhighlight = "Normal:Normal,NormalNC:Normal" },
  },
  select = {
    backend = { "telescope", "builtin" },
    builtin = { win_options = { winhighlight = "Normal:Normal,NormalNC:Normal" } },
  },
}
```

## gitsigns.nvim

```lua
opts = {
  signs = {
    add = { text = "▎" },
    change = { text = "▎" },
    delete = { text = "▎" },
    topdelete = { text = "契" },
    changedelete = { text = "▎" },
    untracked = { text = "▎" },
  },
}
```

## heirline.nvim

See [Customizing Statusline](../Recipes/status.md)

## indent-blankline.nvim

```lua
opts = {
  buftype_exclude = {
    "nofile",
    "terminal",
  },
  filetype_exclude = {
    "help",
    "startify",
    "aerial",
    "alpha",
    "dashboard",
    "lazy",
    "neogitstatus",
    "NvimTree",
    "neo-tree",
    "Trouble",
  },
  context_patterns = {
    "class",
    "return",
    "function",
    "method",
    "^if",
    "^while",
    "jsx_element",
    "^for",
    "^object",
    "^table",
    "block",
    "arguments",
    "if_statement",
    "else_clause",
    "jsx_element",
    "jsx_self_closing_element",
    "try_statement",
    "catch_clause",
    "import_statement",
    "operation_type",
  },
  show_trailing_blankline_indent = false,
  use_treesitter = true,
  char = "▏",
  context_char = "▏",
  show_current_context = true,
}
```

## lspkind.nvim

```lua
opts = {
  mode = "symbol",
  symbol_map = {
    NONE = "",
    Array = "",
    Boolean = "⊨",
    Class = "",
    Constructor = "",
    Key = "",
    Namespace = "",
    Null = "NULL",
    Number = "#",
    Object = "⦿",
    Package = "",
    Property = "",
    Reference = "",
    Snippet = "",
    String = "𝓐",
    TypeParameter = "",
    Unit = "",
  },
}
```

## mason-null-ls.nvim

```lua
opts = { automatic_setup = true }
```

## mason-nvim-dap

```lua
opts = { automatic_setup = true }
```

## mason.nvim

```lua
opts = {
  ui = {
    icons = {
      package_installed = "✓",
      package_uninstalled = "✗",
      package_pending = "⟳",
    },
  },
}
```

## neo-tree.nvim

```lua
opts = function()
  local global_commands = {
    system_open = function(state) astronvim.system_open(state.tree:get_node():get_id()) end,
    parent_or_close = function(state)
      local node = state.tree:get_node()
      if (node.type == "directory" or node:has_children()) and node:is_expanded() then
        state.commands.toggle_node(state)
      else
        require("neo-tree.ui.renderer").focus_node(state, node:get_parent_id())
      end
    end,
    child_or_open = function(state)
      local node = state.tree:get_node()
      if node.type == "directory" or node:has_children() then
        if not node:is_expanded() then -- if unexpanded, expand
          state.commands.toggle_node(state)
        else -- if expanded and has children, seleect the next child
          require("neo-tree.ui.renderer").focus_node(state, node:get_child_ids()[1])
        end
      else -- if not a directory just open it
        state.commands.open(state)
      end
    end,
  }
  return {
    close_if_last_window = true,
    enable_diagnostics = false,
    source_selector = {
      winbar = true,
      content_layout = "center",
      tab_labels = {
        filesystem = astronvim.get_icon "FolderClosed" .. " File",
        buffers = astronvim.get_icon "DefaultFile" .. " Bufs",
        git_status = astronvim.get_icon "Git" .. " Git",
        diagnostics = astronvim.get_icon "Diagnostic" .. " Diagnostic",
      },
    },
    default_component_configs = {
      indent = { padding = 0 },
      icon = {
        folder_closed = astronvim.get_icon "FolderClosed",
        folder_open = astronvim.get_icon "FolderOpen",
        folder_empty = astronvim.get_icon "FolderEmpty",
        default = astronvim.get_icon "DefaultFile",
      },
      git_status = {
        symbols = {
          added = astronvim.get_icon "GitAdd",
          deleted = astronvim.get_icon "GitDelete",
          modified = astronvim.get_icon "GitChange",
          renamed = astronvim.get_icon "GitRenamed",
          untracked = astronvim.get_icon "GitUntracked",
          ignored = astronvim.get_icon "GitIgnored",
          unstaged = astronvim.get_icon "GitUnstaged",
          staged = astronvim.get_icon "GitStaged",
          conflict = astronvim.get_icon "GitConflict",
        },
      },
    },
    window = {
      width = 30,
      mappings = {
        ["<space>"] = false, -- disable space until we figure out which-key disabling
        ["[b"] = "prev_source",
        ["]b"] = "next_source",
        o = "open",
        O = "system_open",
        h = "parent_or_close",
        l = "child_or_open",
      },
    },
    filesystem = {
      follow_current_file = true,
      hijack_netrw_behavior = "open_current",
      use_libuv_file_watcher = true,
      commands = global_commands,
    },
    buffers = { commands = global_commands },
    git_status = { commands = global_commands },
    event_handlers = {
      { event = "neo_tree_buffer_enter", handler = function(_) vim.opt_local.signcolumn = "auto" end },
    },
  }
end
```

## neodev.nvim

```lua
opts = {
  override = function(root_dir, library)
    if root_dir:match(astronvim.install.config) then library.plugins = true end
    vim.b.neodev_enabled = library.enabled
  end,
}
```

## null-ls.nvim

```lua
opts = { on_attach = astronvim.lsp.on_attach }
```

## nvim-autopairs

```lua
opts = {
  check_ts = true,
  ts_config = { java = false },
  fast_wrap = {
    map = "<M-e>",
    chars = { "{", "[", "(", '"', "'" },
    pattern = string.gsub([[ [%'%"%)%>%]%)%}%,] ]], "%s+", ""),
    offset = 0,
    end_key = "$",
    keys = "qwertyuiopzxcvbnmasdfghjkl",
    check_comma = true,
    highlight = "PmenuSel",
    highlight_grey = "LineNr",
  },
}
```

## nvim-cmp

```lua
opts = function()
  local cmp = require "cmp"
  local snip_status_ok, luasnip = pcall(require, "luasnip")
  local lspkind_status_ok, lspkind = pcall(require, "lspkind")
  if not snip_status_ok then return end
  local border_opts =
    { border = "single", winhighlight = "Normal:Normal,FloatBorder:FloatBorder,CursorLine:Visual,Search:None" }

  local function has_words_before()
    local line, col = unpack(vim.api.nvim_win_get_cursor(0))
    return col ~= 0 and vim.api.nvim_buf_get_lines(0, line - 1, line, true)[1]:sub(col, col):match "%s" == nil
  end

  return {
    enabled = function()
      if vim.api.nvim_get_option_value("buftype", { buf = 0 }) == "prompt" then return false end
      return vim.g.cmp_enabled
    end,
    preselect = cmp.PreselectMode.None,
    formatting = {
      fields = { "kind", "abbr", "menu" },
      format = lspkind_status_ok and lspkind.cmp_format(astronvim.lspkind) or nil,
    },
    snippet = {
      expand = function(args) luasnip.lsp_expand(args.body) end,
    },
    duplicates = {
      nvim_lsp = 1,
      luasnip = 1,
      cmp_tabnine = 1,
      buffer = 1,
      path = 1,
    },
    confirm_opts = {
      behavior = cmp.ConfirmBehavior.Replace,
      select = false,
    },
    window = {
      completion = cmp.config.window.bordered(border_opts),
      documentation = cmp.config.window.bordered(border_opts),
    },
    mapping = {
      ["<Up>"] = cmp.mapping.select_prev_item { behavior = cmp.SelectBehavior.Select },
      ["<Down>"] = cmp.mapping.select_next_item { behavior = cmp.SelectBehavior.Select },
      ["<C-p>"] = cmp.mapping.select_prev_item { behavior = cmp.SelectBehavior.Insert },
      ["<C-n>"] = cmp.mapping.select_next_item { behavior = cmp.SelectBehavior.Insert },
      ["<C-k>"] = cmp.mapping.select_prev_item { behavior = cmp.SelectBehavior.Insert },
      ["<C-j>"] = cmp.mapping.select_next_item { behavior = cmp.SelectBehavior.Insert },
      ["<C-u>"] = cmp.mapping(cmp.mapping.scroll_docs(-4), { "i", "c" }),
      ["<C-d>"] = cmp.mapping(cmp.mapping.scroll_docs(4), { "i", "c" }),
      ["<C-Space>"] = cmp.mapping(cmp.mapping.complete(), { "i", "c" }),
      ["<C-y>"] = cmp.config.disable,
      ["<C-e>"] = cmp.mapping { i = cmp.mapping.abort(), c = cmp.mapping.close() },
      ["<CR>"] = cmp.mapping.confirm { select = false },
      ["<Tab>"] = cmp.mapping(function(fallback)
        if cmp.visible() then
          cmp.select_next_item()
        elseif luasnip.expand_or_jumpable() then
          luasnip.expand_or_jump()
        elseif has_words_before() then
          cmp.complete()
        else
          fallback()
        end
      end, { "i", "s" }),
      ["<S-Tab>"] = cmp.mapping(function(fallback)
        if cmp.visible() then
          cmp.select_prev_item()
        elseif luasnip.jumpable(-1) then
          luasnip.jump(-1)
        else
          fallback()
        end
      end, { "i", "s" }),
    },
    sources = cmp.config.sources {
      { name = "nvim_lsp", priority = 1000 },
      { name = "luasnip", priority = 750 },
      { name = "buffer", priority = 500 },
      { name = "path", priority = 250 },
    },
  }
end
```

## nvim-colorizer.lua

```lua
opts = { user_default_options = { names = false } }
```

## nvim-dap-ui

```lua
opts = { floating = { border = "rounded" } }
```

## nvim-notify

```lua
opts = { stages = "fade" }
```

## nvim-treesitter

```lua
opts = {
  highlight = { enable = true },
  incremental_selection = { enable = true },
  autotag = { enable = true },
  context_commentstring = { enable = true, enable_autocmd = false },
}
```

## nvim-ufo

```lua
opts = {
  preview = {
    mappings = {
      scrollB = "<C-b>",
      scrollF = "<C-f>",
      scrollU = "<C-u>",
      scrollD = "<C-d>",
    },
  },
  provider_selector = function(_, filetype, buftype)
    return (filetype == "" or buftype == "nofile") and "indent" -- only use indent until a file is opened
      or { "treesitter", "indent" } -- if file opened, try to use treesitter if available
  end,
}
```

## nvim-web-devicons

```lua
opts = {
  deb = { icon = "", name = "Deb" },
  lock = { icon = "", name = "Lock" },
  mp3 = { icon = "", name = "Mp3" },
  mp4 = { icon = "", name = "Mp4" },
  out = { icon = "", name = "Out" },
  ["robots.txt"] = { icon = "ﮧ", name = "Robots" },
  ttf = { icon = "", name = "TrueTypeFont" },
  rpm = { icon = "", name = "Rpm" },
  woff = { icon = "", name = "WebOpenFontFormat" },
  woff2 = { icon = "", name = "WebOpenFontFormat2" },
  xz = { icon = "", name = "Xz" },
  zip = { icon = "", name = "Zip" },
}
```

## nvim-window-picker

```lua
opts = { use_winbar = "smart" }
```

## smart-splits.nvim

```lua
opts = {
  ignored_filetypes = { "nofile", "quickfix", "qf", "prompt" },
  ignored_buftypes = { "nofile" },
}
```

## telescope.nvim

```lua
opts = function()
  local actions = require "telescope.actions"
  return {
    defaults = {

      prompt_prefix = string.format("%s ", astronvim.get_icon "Search"),
      selection_caret = string.format("%s ", astronvim.get_icon "Selected"),
      path_display = { "truncate" },
      sorting_strategy = "ascending",
      layout_config = {
        horizontal = {
          prompt_position = "top",
          preview_width = 0.55,
        },
        vertical = {
          mirror = false,
        },
        width = 0.87,
        height = 0.80,
        preview_cutoff = 120,
      },

      mappings = {
        i = {
          ["<C-n>"] = actions.cycle_history_next,
          ["<C-p>"] = actions.cycle_history_prev,
          ["<C-j>"] = actions.move_selection_next,
          ["<C-k>"] = actions.move_selection_previous,
        },
        n = { ["q"] = actions.close },
      },
    },
  }
end
```

## toggleterm.nvim

```lua
opts{
  size = 10,
  open_mapping = [[<F7>]],
  shading_factor = 2,
  direction = "float",
  float_opts = {
    border = "curved",
    highlights = { border = "Normal", background = "Normal" },
  },
}
```
