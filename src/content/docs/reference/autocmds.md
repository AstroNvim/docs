---
id: autocmds
title: Exposed Autocommands
---

AstroNvim has many internally built features to help ease both user experience
and configuration. Some of these features work asynchronously, so we provide a
few `User` autocommand events that can be accessed by the user. All of the
autocommand events that we provide are in the `User` autocommand space and the
patterns begin with `Astro`. Here is a complete list of all of the events that
we provide as well as descriptions on when they happen. For a list of the core
Neovim autocmd events, check the help page with `:h autocmd-events`.

- `AstroBufsUpdated`: AstroNvim uses a vim-tab local variable for managing
  buffers displayed in our custom `tabline`. This is stored in `vim.t.bufs`.
  `AstroBufsUpdated` is triggered every time we update this `vim.t.bufs`
  variable internally.

- `AstroColorScheme`: The `highlights` configuration option in the user
  configuration provides an easy to use API for customizing highlight groups
  for all themes or specific themes even if the theme plugins do not provide
  good configuration APIs. `AstroColorScheme` is triggered after we finish
  applying these custom highlights when a new colorscheme is applied.

- `AstroFile`: AstroNvim uses this autocmd event for lazy loading plugins
  on the first real file opened for editing. This can also be used by the user.
  This event fires every time a file is opened with a non-empty filename.

- `AstroGitFile`: AstroNvim uses this autocmd event for lazy loading git related
  plugins. This event fires every time a file is opened that is in a git tracked
  directory.

- `AstroLspSetup`: AstroNvim has a lot of internal tooling surrounding setting
  up handlers for the internal LSP mechanisms. `AstroLspSetup` is triggered when
  we have finished setting up these handlers and configuring `lspconfig`.

- `AstroMasonUpdateCompleted`: AstroNvim provides a custom command for easily
  updating all packages that are currently installed with Mason using
  `:AstroMasonUpdateAll`. `AstroMasonUpdateCompleted` is triggered after all of the
  available updates have been applied.

### Example Autocommand Usage

Just to demonstrate the usage of `User` autocommand events in Neovim here is an
example `autocmd` that disables the `tabline` if there is only a single buffer
and a single tab available. The following plugin specification adds a new
autocommand with AstroCore and can be added to your own plugins in your
configuration:

```lua
return {
  "AstroNvim/astrocore",
  ---@type AstroCoreOpts
  opts = {
    autocmds = {
      -- autocommands are organized into augroups for easy management
      autohidetabline = {
        {
          -- create a new autocmd on the "User" event
          event = "User",
          desc = "Hide tabline when only one buffer and one tab", -- nice description
          -- triggered when vim.t.bufs is updated
          pattern = "AstroBufsUpdated", -- the pattern is the name of our User autocommand events
          group = "autohidetabline", -- add the autocmd to the newly created augroup
          callback = function()
            -- if there is more than one buffer in the tab, show the tabline
            -- if there are 0 or 1 buffers in the tab, only show the tabline if there is more than one vim tab
            local new_showtabline = #vim.t.bufs > 1 and 2 or 1
            -- check if the new value is the same as the current value
            if new_showtabline ~= vim.opt.showtabline:get() then
              -- if it is different, then set the new `showtabline` value
              vim.opt.showtabline = new_showtabline
            end
          end,
        },
      },
    },
  },
}
```
