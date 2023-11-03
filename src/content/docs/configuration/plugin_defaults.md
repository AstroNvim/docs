---
id: plugin_defaults
title: Default Plugin Configurations
---

::::danger

UNVALIDATED: NEED UPDATING FOR V4

::::

This page documents the default options that are set by AstroNvim for each individual plugin. All of these options can be changed in the `plugins` table in the `user/init.lua` configuration file as described in the [Custom Plugins Documentation](../custom_plugins).

## [aerial.nvim](https://github.com/stevearc/aerial.nvim)

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

## [alpha-nvim](https://github.com/goolord/alpha-nvim)

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

  local button = require("astronvim.utils").alpha_button
  dashboard.section.buttons.val = {
    button("LDR n", "  New File  "),
    button("LDR f f", "  Find File  "),
    button("LDR f o", "󰈙  Recents  "),
    button("LDR f w", "󰈭  Find Word  "),
    button("LDR f '", "  Bookmarks  "),
    button("LDR S l", "  Last Session  "),
  }

  dashboard.config.layout[1].val = vim.fn.max { 2, vim.fn.floor(vim.fn.winheight(0) * 0.2) }
  dashboard.config.layout[3].val = 5
  dashboard.config.opts.noautocmd = true
  return dashboard
end
```

## [astrotheme](https://github.com/AstroNvim/astrotheme)

```lua
opts = { plugins = { ["dashboard-nvim"] = true } }
```

## [better-escape.nvim](https://github.com/max397574/better-escape.nvim)

```lua
opts = { timeout = 300 }
```

## [Comment.nvim](https://github.com/numToStr/Comment.nvim)

```lua
opts = function()
  return { pre_hook = require("ts_context_commentstring.integrations.comment_nvim").create_pre_hook() }
end
```

## [dressing.nvim](https://github.com/stevearc/dressing.nvim)

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

## [gitsigns.nvim](https://github.com/lewis6991/gitsigns.nvim)

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

## [heirline.nvim](https://github.com/rebelot/heirline.nvim)

See [Customizing Statusline](../../recipes/status)

## [indent-blankline.nvim](https://github.com/lukas-reineke/indent-blankline.nvim)

```lua
opts = {
  indent = { char = "▏" },
  scope = { show_start = false, show_end = false },
  exclude = {
    buftypes = {
      "nofile",
      "terminal",
    },
    filetypes = {
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
  },
}
```

## [lspkind.nvim](https://github.com/onsails/lspkind.nvim)

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

## [LuaSnip](https://github.com/L3MON4D3/LuaSnip)

```lua
opts = {
  store_selection_keys = "<C-x>",
}
```

## [mason-null-ls.nvim](https://github.com/jay-babu/mason-null-ls.nvim)

```lua
opts = { automatic_setup = true }
```

## [mason-nvim-dap](https://github.com/jay-babu/mason-nvim-dap.nvim)

```lua
opts = { automatic_setup = true }
```

## [mason.nvim](https://github.com/williamboman/mason.nvim)

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

## [neo-tree.nvim](https://github.com/nvim-neo-tree/neo-tree.nvim)

```lua
local get_icon = require("astronvim.utils").get_icon
opts = {
  auto_clean_after_session_restore = true,
  close_if_last_window = true,
  source_selector = {
    winbar = true,
    content_layout = "center",
    sources = {
      { source = "filesystem", display_name = get_icon "FolderClosed" .. " File" },
      { source = "buffers", display_name = get_icon "DefaultFile" .. " Bufs" },
      { source = "git_status", display_name = get_icon "Git" .. " Git" },
      { source = "diagnostics", display_name = get_icon "Diagnostic" .. " Diagnostic" },
    },
  },
  default_component_configs = {
    indent = { padding = 0, indent_size = 1 },
    icon = {
      folder_closed = get_icon "FolderClosed",
      folder_open = get_icon "FolderOpen",
      folder_empty = get_icon "FolderEmpty",
      default = get_icon "DefaultFile",
    },
    modified = { symbol = get_icon "FileModified" },
    git_status = {
      symbols = {
        added = get_icon "GitAdd",
        deleted = get_icon "GitDelete",
        modified = get_icon "GitChange",
        renamed = get_icon "GitRenamed",
        untracked = get_icon "GitUntracked",
        ignored = get_icon "GitIgnored",
        unstaged = get_icon "GitUnstaged",
        staged = get_icon "GitStaged",
        conflict = get_icon "GitConflict",
      },
    },
  },
  commands = {
    system_open = function(state) require("astronvim.utils").system_open(state.tree:get_node():get_id()) end,
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
    copy_selector = function(state)
      local node = state.tree:get_node()
      local filepath = node:get_id()
      local filename = node.name
      local modify = vim.fn.fnamemodify

      local results = {
        e = { val = modify(filename, ":e"), msg = "Extension only" },
        f = { val = filename, msg = "Filename" },
        F = { val = modify(filename, ":r"), msg = "Filename w/o extension" },
        h = { val = modify(filepath, ":~"), msg = "Path relative to Home" },
        p = { val = modify(filepath, ":."), msg = "Path relative to CWD" },
        P = { val = filepath, msg = "Absolute path" },
      }

      local messages = {
        { "\nChoose to copy to clipboard:\n", "Normal" },
      }
      for i, result in pairs(results) do
        if result.val and result.val ~= "" then
          vim.list_extend(messages, {
            { ("%s."):format(i), "Identifier" },
            { (" %s: "):format(result.msg) },
            { result.val, "String" },
            { "\n" },
          })
        end
      end
      vim.api.nvim_echo(messages, false, {})
      local result = results[vim.fn.getcharstr()]
      if result and result.val and result.val ~= "" then
        vim.notify("Copied: " .. result.val)
        vim.fn.setreg("+", result.val)
      end
    end,
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
      Y = "copy_selector",
    },
  },
  filesystem = {
    follow_current_file = { enabled = true },
    hijack_netrw_behavior = "open_current",
    use_libuv_file_watcher = true,
  },
  event_handlers = {
    {
      event = "neo_tree_buffer_enter",
      handler = function(_) vim.opt_local.signcolumn = "auto" end,
    },
  },
}
```

## [neodev.nvim](https://github.com/folke/neodev.nvim)

```lua
opts = {
  override = function(root_dir, library)
    if root_dir:match(astronvim.install.config) then library.plugins = true end
    vim.b.neodev_enabled = library.enabled
  end,
}
```

## [none-ls.nvim](https://github.com/nvimtools/none-ls.nvim)

```lua
opts = function() return { on_attach = require("astronvim.utils.lsp").on_attach } end
```

## [nvim-autopairs](https://github.com/windwp/nvim-autopairs)

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

## [nvim-cmp](https://github.com/hrsh7th/nvim-cmp)

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

## [nvim-colorizer.lua](https://github.com/NvChad/nvim-colorizer.lua)

```lua
opts = { user_default_options = { names = false } }
```

## [nvim-dap-ui](https://github.com/rcarriga/nvim-dap-ui)

```lua
opts = { floating = { border = "rounded" } }
```

## [nvim-notify](https://github.com/rcarriga/nvim-notify)

```lua
opts = { stages = "fade" }
```

## [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)

```lua
opts = {
  autotag = { enable = true },
  context_commentstring = { enable = true, enable_autocmd = false },
  highlight = {
    enable = true,
    disable = function(_, bufnr) return vim.api.nvim_buf_line_count(bufnr) > 10000 end,
  },
  incremental_selection = { enable = true },
  indent = { enable = true },
  textobjects = {
    select = {
      enable = true,
      lookahead = true,
      keymaps = {
        ["ak"] = { query = "@block.outer", desc = "around block" },
        ["ik"] = { query = "@block.inner", desc = "inside block" },
        ["ac"] = { query = "@class.outer", desc = "around class" },
        ["ic"] = { query = "@class.inner", desc = "inside class" },
        ["a?"] = { query = "@conditional.outer", desc = "around conditional" },
        ["i?"] = { query = "@conditional.inner", desc = "inside conditional" },
        ["af"] = { query = "@function.outer", desc = "around function " },
        ["if"] = { query = "@function.inner", desc = "inside function " },
        ["al"] = { query = "@loop.outer", desc = "around loop" },
        ["il"] = { query = "@loop.inner", desc = "inside loop" },
        ["aa"] = { query = "@parameter.outer", desc = "around argument" },
        ["ia"] = { query = "@parameter.inner", desc = "inside argument" },
      },
    },
    move = {
      enable = true,
      set_jumps = true,
      goto_next_start = {
        ["]k"] = { query = "@block.outer", desc = "Next block start" },
        ["]f"] = { query = "@function.outer", desc = "Next function start" },
        ["]a"] = { query = "@parameter.inner", desc = "Next argument start" },
      },
      goto_next_end = {
        ["]K"] = { query = "@block.outer", desc = "Next block end" },
        ["]F"] = { query = "@function.outer", desc = "Next function end" },
        ["]A"] = { query = "@parameter.inner", desc = "Next argument end" },
      },
      goto_previous_start = {
        ["[k"] = { query = "@block.outer", desc = "Previous block start" },
        ["[f"] = { query = "@function.outer", desc = "Previous function start" },
        ["[a"] = { query = "@parameter.inner", desc = "Previous argument start" },
      },
      goto_previous_end = {
        ["[K"] = { query = "@block.outer", desc = "Previous block end" },
        ["[F"] = { query = "@function.outer", desc = "Previous function end" },
        ["[A"] = { query = "@parameter.inner", desc = "Previous argument end" },
      },
    },
    swap = {
      enable = true,
      swap_next = {
        [">K"] = { query = "@block.outer", desc = "Swap next block" },
        [">F"] = { query = "@function.outer", desc = "Swap next function" },
        [">A"] = { query = "@parameter.inner", desc = "Swap next argument" },
      },
      swap_previous = {
        ["<K"] = { query = "@block.outer", desc = "Swap previous block" },
        ["<F"] = { query = "@function.outer", desc = "Swap previous function" },
        ["<A"] = { query = "@parameter.inner", desc = "Swap previous argument" },
      },
    },
  },
}
```

## [nvim-ufo](https://github.com/kevinhwang91/nvim-ufo)

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

## [nvim-web-devicons](https://github.com/nvim-tree/nvim-web-devicons)

```lua
opts = {
  override = {
    default_icon = { icon = require("astronvim.utils").get_icon "DefaultFile" },
    deb = { icon = "", name = "Deb" },
    lock = { icon = "󰌾", name = "Lock" },
    mp3 = { icon = "󰎆", name = "Mp3" },
    mp4 = { icon = "", name = "Mp4" },
    out = { icon = "", name = "Out" },
    ["robots.txt"] = { icon = "󰚩", name = "Robots" },
    ttf = { icon = "", name = "TrueTypeFont" },
    rpm = { icon = "", name = "Rpm" },
    woff = { icon = "", name = "WebOpenFontFormat" },
    woff2 = { icon = "", name = "WebOpenFontFormat2" },
    xz = { icon = "", name = "Xz" },
    zip = { icon = "", name = "Zip" },
  },
}
```

## [nvim-window-picker](https://github.com/s1n7ax/nvim-window-picker)

```lua
opts = { use_winbar = "smart" }
```

## [smart-splits.nvim](https://github.com/mrjones2014/smart-splits.nvim)

```lua
opts = {
  ignored_filetypes = { "nofile", "quickfix", "qf", "prompt" },
  ignored_buftypes = { "nofile" },
}
```

## [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)

```lua
opts = function()
  local actions = require "telescope.actions"
  local get_icon = require("astronvim.utils").get_icon
  return {
    defaults = {
      git_worktrees = vim.g.git_worktrees,
      prompt_prefix = string.format("%s ", get_icon "Search"),
      selection_caret = string.format("%s ", get_icon "Selected"),
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

## [toggleterm.nvim](https://github.com/akinsho/toggleterm.nvim)

```lua
opts = {
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
