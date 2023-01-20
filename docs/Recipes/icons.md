---
id: icons
title: Customize Icons
---

### Disable Icons

Some users may want to disable icons across the entire user interface because they don't like icons or simply because they are using a machine that is unable to install a nerd font for whatever reason. To assist with this use case we have added a new option variable `vim.g.icons_enabled` (default: `true`) that lets you disable the icons entirely and just have a text based user interface. To opt into this text based UI, it does require a user configuration setting the appropriate option. Here is a minimal `user/init.lua` file that just disables the icons. _Note:_ This does require the user to restart and run `:PackerSync` to remove the icon plugins as well:

```lua
return {
  options = {
    g = {
      icons_enabled = false,
    },
  },
}
```

### Customize User Interface Icons

AstroNvim uses a large set of icons across the entire user interface to maintain continuity between plugins and places where we display the same types of information. Because of this centralized icon management, we are able to allow the user to completely customize the user interface easily and let them change the icons in the `icons` table in a `user/init.lua` file or in `user/icons.lua` file. Here is an example `user/init.lua` file that sets all of the available user interface icons to what is currently the default in AstroNvim:

```lua
return {
  icons = {
    MacroRecording = "",
    ActiveLSP = "",
    ActiveTS = "綠",
    BufferClose = "",
    NeovimClose = "",
    DefaultFile = "",
    Diagnostic = "裂",
    DiagnosticError = "",
    DiagnosticHint = "",
    DiagnosticInfo = "",
    DiagnosticWarn = "",
    Ellipsis = "…",
    FileModified = "",
    FileReadOnly = "",
    FolderClosed = "",
    FolderEmpty = "",
    FolderOpen = "",
    Git = "",
    GitAdd = "",
    GitBranch = "",
    GitChange = "",
    GitConflict = "",
    GitDelete = "",
    GitIgnored = "◌",
    GitRenamed = "➜",
    GitStaged = "✓",
    GitUnstaged = "✗",
    GitUntracked = "★",
    LSPLoaded = "",
    LSPLoading1 = "",
    LSPLoading2 = "",
    LSPLoading3 = "",
  },
}
```

#### Text Icons

If you have `vim.g.icons_enabled = false`, you can still customize the text based icons, but make modifications to the `text_icons` table similar to the `icons` described above:

```lua
return {
  text_icons = {
    ActiveLSP = "LSP:",
    ActiveTS = "",
    BufferClose = "x",
    DefaultFile = "[F]",
    Diagnostic = "",
    DiagnosticError = "X",
    DiagnosticHint = "?",
    DiagnosticInfo = "i",
    DiagnosticWarn = "!",
    Ellipsis = "...",
    FileModified = "*",
    FileReadOnly = "[lock]",
    FolderClosed = "[D]",
    FolderEmpty = "[E]",
    FolderOpen = "[O]",
    Git = "",
    GitAdd = "[+]",
    GitBranch = "",
    GitChange = "[/]",
    GitConflict = "[!]",
    GitDelete = "[-]",
    GitIgnored = "[I]",
    GitRenamed = "[R]",
    GitStaged = "[S]",
    GitUnstaged = "[U]",
    GitUntracked = "[?]",
    LSPLoaded = "",
    LSPLoading1 = "",
    LSPLoading2 = "",
    LSPLoading3 = "",
    MacroRecording = "Recording:",
    NeovimClose = "X",
  },
}
```

### VS Code Style Icons

If you have the [`codicon.ttf` font](https://github.com/microsoft/vscode-codicons/tree/main/dist) installed then you can easily modify the `lspkind` options and the user interface `icons` table in your `user/init.lua` file to match the icons used in VS Code. Here is an example `user/init.lua` file that sets the necessary values:

```lua
return {
  -- set up UI icons
  icons = {
    ActiveLSP = "",
    ActiveTS = " ",
    BufferClose = "",
    DefaultFile = "",
    Diagnostic = "",
    DiagnosticError = "",
    DiagnosticHint = "",
    DiagnosticInfo = "",
    DiagnosticWarn = "",
    Ellipsis = "",
    FileModified = "",
    FileReadOnly = "",
    FolderClosed = "",
    FolderEmpty = "",
    FolderOpen = "",
    Git = "",
    GitAdd = "",
    GitBranch = "",
    GitChange = "",
    GitConflict = "",
    GitDelete = "",
    GitIgnored = "",
    GitRenamed = "",
    GitStaged = "",
    GitUnstaged = "",
    GitUntracked = "",
    LSPLoaded = "",
    LSPLoading1 = "",
    LSPLoading2 = "",
    LSPLoading3 = "",
    MacroRecording = "",
    NeovimClose = "",
  },
  plugins = {
    {
      "onsails/lspkind.nvim",
      opts = function(_, opts)
        -- use codicons preset
        opts.preset = "codicons"
        -- set some missing symbol types
        opts.symbol_map = {
          Array = "",
          Boolean = "",
          Key = "",
          Namespace = "",
          Null = "",
          Number = "",
          Object = "",
          Package = "",
          String = "",
        }
        return opts
      end,
    },
  },
}
```
