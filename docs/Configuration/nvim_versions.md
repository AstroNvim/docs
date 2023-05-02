---
id: nvim_versions
title: Using Old Versions of Neovim
---

If you need to use AstroNvim with a specific version of Neovim, you can use the
`updater` table in your user configuration to limit the versions that AstroNvim
will update to to maintain compatibility. These versions will not be receiving
new updates but with our pinned plugin commits, will guarantee that the old
version of AstroNvim will start using new plugin versions that have breaking
changes. Put these setting in your `user/init.lua` file in the `updater` table
as described in the [Updater Documentation](./updater.md):

## Neovim v0.7

```lua
updater = {
  channel = "stable",
  version = "v1.*"
}
```

## Neovim v0.8

```lua
updater = {
  channel = "stable",
  version = "v2.*"
}
```

## Neovim v0.9

```lua
updater = {
  channel = "stable",
  version = "v3.*"
}
```
