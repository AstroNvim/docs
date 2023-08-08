---
id: status
title: Customizing Statusline
---

AstroNvim uses [`Heirline.nvim`](https://github.com/rebelot/heirline.nvim) for both the custom statusline and winbar. Heirline is an extremely minimal statusline plugin that does not come with any preconfigured elements but focuses on speed and extensibility. To build our statusline, we have build an internal lua module of statusline elements that we use to build our own statusline, but can in turn be used in your user configuration to customize the statusline.

:::info

Customizing the statusline can be very manual and require a lot of knowledge of the API that we have provided. It is **highly** recommended to only do this if you are comfortable with programming Lua and reading the source code of AstroNvim.

We have provided a couple recipes below for common use cases that can be copy/pasted without needing to worry about the API.

:::

## Basic Options

There are some basic options that we have exposed outside of the `plugins.heirline` table for overriding the Heirline `setup(...)` function. These options are used to easily change the colors of sections and the separators used for sections. These would be in a top level `heirline` table in your `user/init.lua` file or split up into files `heirline/colors.lua` and `heirline/separators.lua` in your `user/` folder.

- `heirline.separators` provides an easy way to change the character that surrounds your statusline components. The key is the side of the component and the two characters are the characters to be put on the left and right of the component respectively.

- `heirline.colors` provides an easy way to override the color of each component that we provide in the statusline. We have provided the default options for these which are derived from the current theme that is loaded. The values that we show are the highlight group name and the property that they are using. If you are curious how these values are evaluated, please check out the source code in `lus/configs/heirline.lua`. Also we set values for `git_branch_fg` and `treesitter_fg` correspond to the names of components in `astronvim.status.component`. Any component can be given a color here followed by `_fg` and `_bg` to control the foreground and background colors. If a value is not provided then it defaults to `section_fg` and `section_bg`. We don't use custom colors for the other sections by default which is why only `git_branch_fg` and `treesitter_fg` are set.

Default Options:

```lua
heirline = {
  separators = {
    none = { "", "" },
    left = { "", "  " },
    right = { "  ", "" },
    center = { "  ", "  " },
  }
  colors = {
    fg = StatusLine.fg,
    bg = StatusLine.bg,
    section_fg = StatusLine.fg,
    section_bg = StatusLine.bg,
    git_branch_fg = Conditional.fg,
    treesitter_fg = String.fg,
    scrollbar = TypeDef.fg,
    git_added = GitSignsAdd.fg,
    git_changed = GitSignsChange.fg,
    git_removed = GitSignsDelete.fg,
    diag_ERROR = DiagnosticError.fg,
    diag_WARN = DiagnosticWarn.fg,
    diag_INFO = DiagnosticInfo.fg,
    diag_HINT = DiagnosticHint.fg,
    normal = HeirlineNormal.fg,
    insert = HeirlineInsert.fg,
    visual = HeirlineVisual.fg,
    replace = HeirlineReplace.fg,
    command = HeirlineCommand.fg,
    inactive = HeirlineInactive.fg,
    winbar_fg = WinBar.fg,
    winbar_bg = WinBar.bg,
    winbarnc_fg = WinBarNC.fg,
    winbarnc_bg = WinBarNC.bg,
  }
}
```

## Using `astronvim.status` Module

AstroNvim provides a module loaded as `astronvim.status` for building components in Heirline for both the statusline and winbar. It has several submodules:

:::info

For the complete documentation on this API checkout the [AstroNvim Lua API docs](https://astronvim.github.io/AstroNvim/modules/core.utils.status.html)

:::

| Module                       | Description                                                                                                                                   |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `astronvim.status.component` | A collection of methods to assist in building entire components. This is the main piece to interact with when building custom statuslines     |
| `astronvim.status.hl`        | A collection of methods to assist in setting the color of a component                                                                         |
| `astronvim.status.provider`  | A collection of methods that can be set as Heirline providers                                                                                 |
| `astronvim.status.condition` | A collection of methods that can be use as Heirline conditions for controlling when components are enabled                                    |
| `astronvim.status.init`      | A collection of methods that can be set as Heirline init functions for building components with dynamic subcomponents such as LSP breadcrumbs |
| `astronvim.status.utils`     | A collection of miscellaneous helper functions that `astronvim.status` uses such as surrounding components and getting buffers                 |
| `astronvim.status.env`       | A place to store globally accessible variables such as separators, mode text, etc.                                                            |

Heirline is built through building up components in a nested way, where each component either has it's own sub components or a provider to tell what content should be displayed. For a detailed description on the basic concepts of configuring Heirline, please check out their extremely well written [cookbook](https://github.com/rebelot/heirline.nvim/blob/master/cookbook.md).

### Building a Component From Scratch

To build a component from the ground up, we can first start by selecting a `provider` from the `astronvim.status.provider` module, for example we can use the `astronvim.status.provider.mode_text` provider to get the text for the current mode (i.e. `NORMAL`, `INSERT`, etc.). Each provider takes a single argument table with options. Some providers have their own options, but all have a common set of options for stylizing the string they provide. These options include padding, separator characters, and an icon to be used.

Using these options we can start building our component:

```lua
local component = {
  provider = astronvim.status.provider.mode_text({ padding = { left = 1, right = 1 } }),
}
```

This will give us a component where the text will be the current mode displayed as text. But now we want to be able to have the background of the mode to change colors along with the mode. This is where the `astronvim.status.hl` module comes into play. There is a method there for getting the highlight for a mode with `astronvim.status.hl.mode`. Each of these `hl` methods are designed to be passed in by name instead of resolving the function to the `hl` field in a Heirline component. For example, we can add the mode highlighting to our component as such:

```lua
local component = {
  provider = astronvim.status.provider.mode_text({ padding = { left = 1, right = 1 } }),
  hl = astronvim.status.hl.mode,
}
```

This will give us a simple component where the background changes colors with each mode and displays the text of the current mode. If we want to make this component a bit prettier and add surrounding characters, we can use the `astronvim.status.utils.surround` function with our component to do this. This surround method also handles setting the highlight group so we no longer need to set that inside of our component. An example of this would be:

```lua
local component = {
  provider = astronvim.status.provider.mode_text({ padding = { left = 1, right = 1 } }),
}
local surrounded_component = astronvim.status.utils.surround({ "", " "}, astronvim.status.hl.mode_bg, component)
```

This function takes three parameters: the first parameter (left and right side respectively), the second parameter is the function for setting the color for the background of the component and the foreground of the separators, and the third parameter is the component that should be surrounded. In turn it gives us our final component that can be used inside of Heirline.

### Using the Predefined Components in `astronvim.status.component`

Building components from scratch is a powerful method that gives users complete control, but for the most part it's nice to have fully built components without having to think as much about what's going on internally. For this we have created several out of the box component building functions for things such as the mode, file details, git information, etc. With these, it becomes much easier to build components that you would want in your statusline. For example, to recreate our previous mode text component we can do this:

```lua
local component = astronvim.status.component.mode({
  mode_text = { padding = { left = 1, right = 1 } },
})
```

This will automatically set up the surrounding and colors that we want and defaults to it being a left aligned component. If you are going to place the component on the right side and want it to have the right side separators instead, you can do this:

```lua
local component = astronvim.status.component.mode({
  mode_text = { padding = { left = 1, right = 1 } },
  surround = { separator = "right" },
})
```

## Default Heirline Configuration

This is a code block that redefines the default statusline and winbar that are used in AstroNvim inside of the user configuration file for reference and a starting point to make modifications:

```lua
return {
  plugins = {
    heirline = function(config)
      -- statusline
      config[1] = {
        hl = { fg = "fg", bg = "bg" },
        astronvim.status.component.mode(),
        astronvim.status.component.git_branch(),
        astronvim.status.component.file_info(
          astronvim.is_available "bufferline.nvim" and { filetype = {}, filename = false, file_modified = false } or nil
        ),
        astronvim.status.component.git_diff(),
        astronvim.status.component.diagnostics(),
        astronvim.status.component.fill(),
        astronvim.status.component.lsp(),
        astronvim.status.component.treesitter(),
        astronvim.status.component.nav(),
        astronvim.status.component.mode { surround = { separator = "right" } },
      }

      -- winbar
      config[2] = {
        fallthrough = false,
        -- if the current buffer matches the following buftype or filetype, disable the winbar
        {
          condition = function()
            return astronvim.status.condition.buffer_matches {
              buftype = { "terminal", "prompt", "nofile", "help", "quickfix" },
              filetype = { "NvimTree", "neo-tree", "dashboard", "Outline", "aerial" },
            }
          end,
          init = function() vim.opt_local.winbar = nil end,
        },
        -- if the window is currently active, show the breadcrumbs
        {
          condition = astronvim.status.condition.is_active,
          astronvim.status.component.breadcrumbs { hl = { fg = "winbar_fg", bg = "winbar_bg" } },
        },
        -- if the window is not currently active, show the file information
        {
          astronvim.status.component.file_info {
            file_icon = { highlight = false },
            hl = { fg = "winbarnc_fg", bg = "winbarnc_bg" },
            surround = false,
          },
        },
      }

      -- return the final configuration table
      return config
    end,
  },
}
```

## Default Statusline With Mode Text

Some users want to be able to add the mode text to their statusline easily, AstroNvim's new `astronvim.status` lua module as well as Heirline make that very easy to do in their user configuration file.

![Screenshot of the statusline with mode text](/img/recipes/mode_text_statusline.png)

Minimal `user/init.lua` that adds the mode text to the statusline:

```lua
return {
  plugins = {
    heirline = function(config)
      -- the first element of the default configuration table is the statusline
      config[1] = {
        -- set the fg/bg of the statusline
        hl = { fg = "fg", bg = "bg" },
        -- when adding the mode component, enable the mode text with padding to the left/right of it
        astronvim.status.component.mode { mode_text = { padding = { left = 1, right = 1 } } },
        -- add all the other components for the statusline
        astronvim.status.component.git_branch(),
        astronvim.status.component.file_info(),
        astronvim.status.component.git_diff(),
        astronvim.status.component.diagnostics(),
        astronvim.status.component.fill(),
        astronvim.status.component.lsp(),
        astronvim.status.component.treesitter(),
        astronvim.status.component.nav(),
      }
      -- return the final configuration table
      return config
    end,
  },
}
```

## Replicate NvChad Statusline

NvChad comes with a very specific statusline configuration that a lot of people like, so we figured it would be a nice exercise of the extensibility of our `astronvim.status` API to show how to build that statusline in AstroNvim. _Warning:_ This is a fairly complicated example and is meant to be used by people who want it and to demonstrate how much you can customize the statusline.

![Screenshot of the NvChad style statusline](/img/recipes/nvchad_statusline.png)

Minimal `user/init.lua` that recreates the NvChad statusline in AstroNvim:

```lua
return {
  -- add new user interface icon
  icons = {
    VimIcon = "",
  },
  -- modify variables used by heirline but not defined in the setup call directly
  heirline = {
    -- define the separators between each section
    separators = {
      left = { "", " " }, -- separator for the left side of the statusline
      right = { " ", "" }, -- separator for the right side of the statusline
    },
    -- add new colors that can be used by heirline
    colors = {
      blank_bg = "#5c6370",
      file_info_bg = "#3e4452",
      nav_icon_bg = "#89b06d",
      folder_icon_bg = "#ec5f67",
    },
  },
  plugins = {
    -- override the heirline setup call
    heirline = function(config)
      -- the first element of the configuration table is the statusline
      config[1] = {
        -- default highlight for the entire statusline
        hl = { fg = "fg", bg = "bg" },
        -- each element following is a component in astronvim.status module

        -- add the vim mode component
        astronvim.status.component.mode {
          -- enable mode text with padding as well as an icon before it
          mode_text = { icon = { kind = "VimIcon", padding = { right = 1, left = 1 } } },
          -- define the highlight color for the text
          hl = { fg = "bg" },
          -- surround the component with a separators
          surround = {
            -- it's a left element, so use the left separator
            separator = "left",
            -- set the color of the surrounding based on the current mode using astronvim.status module
            color = function() return { main = astronvim.status.hl.mode_bg(), right = "blank_bg" } end,
          },
        },
        -- we want an empty space here so we can use the component builder to make a new section with just an empty string
        astronvim.status.component.builder {
          { provider = "" },
          -- define the surrounding separator and colors to be used inside of the component
          -- and the color to the right of the separated out section
          surround = { separator = "left", color = { main = "blank_bg", right = "file_info_bg" } },
        },
        -- add a section for the currently opened file information
        astronvim.status.component.file_info {
          -- enable the file_icon and disable the highlighting based on filetype
          file_icon = { highlight = false, padding = { left = 0 } },
          -- add padding
          padding = { right = 1 },
          -- define the section separator
          surround = { separator = "left", condition = false },
        },
        -- add a component for the current git branch if it exists and use no separator for the sections
        astronvim.status.component.git_branch { surround = { separator = "none" } },
        -- add a component for the current git diff if it exists and use no separator for the sections
        astronvim.status.component.git_diff { padding = { left = 1 }, surround = { separator = "none" } },
        -- fill the rest of the statusline
        -- the elements after this will appear in the middle of the statusline
        astronvim.status.component.fill(),
        -- add a component to display if the LSP is loading, disable showing running client names, and use no separator
        astronvim.status.component.lsp { lsp_client_names = false, surround = { separator = "none", color = "bg" } },
        -- fill the rest of the statusline
        -- the elements after this will appear on the right of the statusline
        astronvim.status.component.fill(),
        -- add a component for the current diagnostics if it exists and use the right separator for the section
        astronvim.status.component.diagnostics { surround = { separator = "right" } },
        -- add a component to display LSP clients, disable showing LSP progress, and use the right separator
        astronvim.status.component.lsp { lsp_progress = false, surround = { separator = "right" } },
        -- NvChad has some nice icons to go along with information, so we can create a parent component to do this
        -- all of the children of this table will be treated together as a single component
        {
          -- define a simple component where the provider is just a folder icon
          astronvim.status.component.builder {
            -- astronvim.get_icon gets the user interface icon for a closed folder with a space after it
            { provider = astronvim.get_icon "FolderClosed" },
            -- add padding after icon
            padding = { right = 1 },
            -- set the foreground color to be used for the icon
            hl = { fg = "bg" },
            -- use the right separator and define the background color
            surround = { separator = "right", color = "folder_icon_bg" },
          },
          -- add a file information component and only show the current working directory name
          astronvim.status.component.file_info {
            -- we only want filename to be used and we can change the fname
            -- function to get the current working directory name
            filename = { fname = function() return vim.fn.getcwd() end, padding = { left = 1 } },
            -- disable all other elements of the file_info component
            file_icon = false,
            file_modified = false,
            file_read_only = false,
            -- use no separator for this part but define a background color
            surround = { separator = "none", color = "file_info_bg" },
          },
        },
        -- the final component of the NvChad statusline is the navigation section
        -- this is very similar to the previous current working directory section with the icon
        { -- make nav section with icon border
          -- define a custom component with just a file icon
          astronvim.status.component.builder {
            { provider = astronvim.get_icon "DefaultFile" },
            -- add padding after icon
            padding = { right = 1 },
            -- set the icon foreground
            hl = { fg = "bg" },
            -- use the right separator and define the background color
            -- as well as the color to the left of the separator
            surround = { separator = "right", color = { main = "nav_icon_bg", left = "file_info_bg" } },
          },
          -- add a navigation component and just display the percentage of progress in the file
          astronvim.status.component.nav {
            -- add some padding for the percentage provider
            percentage = { padding = { left = 1, right = 1 } },
            -- disable all other providers
            ruler = false,
            scrollbar = false,
            -- define the foreground color
            hl = { fg = "nav_icon_bg" },
            -- use no separator and define the background color
            surround = { separator = "none", color = "file_info_bg" },
          },
        },
      }

      -- a second element in the heirline setup would override the winbar
      -- by only providing a single element we will only override the statusline
      -- and use the default winbar in AstroNvim

      -- return the final configuration table
      return config
    end,
  },
}
```
