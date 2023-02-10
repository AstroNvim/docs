---
id: config_mechanism
title: Configuration Mechanism
---

## Value of `runtimepath` option

The AstroNvim start-up code extends the value of `runtimepath` and it contains
not only `$XDG_CONFIG_HOME/nvim` but also `$XDG_CONFIG_HOME/astronvim`. Here,
`$XDG_CONFIG_HOME` is normally set to `~/.config`.

This allows us to place user settings under the normal path of
`~/.config/nvim/lua/user` and the offset path of
`~/.config/astronvim/lua/user`.

Its value can be verified by `:lua print(vim.go.runtimepath)`.

## Shim function and its hook points

Configuration mechanism of AstroNvim uses the shim function
`astronvim.user_opts` (usually aliased to local variable
`user_opts`) when setting default values in the upstream source. The
resulting default values returned by this shim function are the user requested
combination of corresponding upstream and user settings.

Running `rg user_opts` at the root of the source tree should reveal many
hook points of `user_opts` calls in the source where the upstream sets
default values.

## How AstroNvim works for user settings

Let us describe tersely in plain words how this shim function
`astronvim.user_opts` works in AstroNvim when it is called as
`user_opts("MODULE", DEFAULT, EXTEND)` with a twist of
oversimplification. This should provide some perspective for how AstroNvim
works for user settings.

- The `DEFAULT` contains a table setting the upstream default values.
- The `"MODULE"` contains a string specifying user settings by the module or
  variable name.
- If the module named `user.MODULE` exists, then AstroNvim obtains user
  settings from the `user.MODULE` module.
  - This is the [Splitting Up Configuration](/configuration/splitting_up) case.
  - If the `EXTEND` is `nil` (missing) or `true`, settings are extended:
    - If the `user.MODULE` module returns a table, then AstroNvim assigns the
      returned table to the `MODULE` variable, and generates settings by
      calling the `vim.tbl_deep_extend("force", DEFAULT, MODULE)` function
      extending the `DEFAULT` table by the `MODULE` table.
    - If the `user.MODULE` module returns a function, then AstroNvim assigns
      the returned function to the `MODULE` variable, and generates custom
      extended settings by calling the `MODULE` function with the `DEFAULT` as
      its argument.
  - If the `EXTEND` is `false`, settings are overridden:
    - If the `user.MODULE` module returns a table, then AstroNvim ignores
      `DEFAULT` and generates settings from the `MODULE` table.
    - If the `user.MODULE` module returns a function, then AstroNvim ignores
      `DEFAULT` and generates settings by executing the `MODULE` function.
- If the module named `user.MODULE` doesn't exist, then AstroNvim obtains user
  settings from the `user/init.lua` file while looking for the `MODULE`
  variable in it.
  - This is the single setting file case using the `user/init.lua` file as
    discussed before.
  - If the `EXTEND` is `nil` (missing) or `true`, settings are extended:
    - If the `MODULE` variable contains a table, then AstroNvim generates
      settings by calling the `vim.tbl_deep_extend("force", DEFAULT, MODULE)`
      function extending the `DEFAULT` table by the `MODULE` table.
    - If the `MODULE` variable contains a function, then AstroNvim generates
      custom extended settings by calling the `MODULE` function with the
      `DEFAULT` as its argument.
  - If the `EXTEND` is `false`, settings are overridden:
    - If the `MODULE` variable contains a table, then AstroNvim ignores
      `DEFAULT` and generates settings from the `MODULE` table.
    - If the `MODULE` variable contains a function, then AstroNvim ignores
      `DEFAULT` and generates settings by executing the `MODULE` function.
- If neither the module named `user.MODULE` nor the variable named `MODULE` in
  the `user/init.lua` file exist, then AstroNvim generates settings from the
  original upstream `DEFAULT`.

:::tip

Please note `.` in the lua module path corresponds to `/` in the directory
path. Also the `foo.bar` lua module may be at `$runtimepath/foo/bar.lua` or
`$runtimepath/foo/bar/init.lua`.

:::

:::tip

For the definition of `vim.tbl_deep_extend`, see `:help tbl_deep_extend`.

:::

:::tip

For the actual definition of `user_opts` and related functions, see
their definition in `lua/core/utils/init.lua`.

:::
