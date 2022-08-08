---
id: updater
title: Managing AstroNvim Updates
---

:::caution

AstroNvim v1.4.0 has added `stable` and `nightly` update channels. For the time being we have kept the default update channel to `nightly` so that the behavior of AstroNvim doesn't change (this could be considered a breaking change to some). We are planning to make the `stable` channel the default update channel when Neovim v0.8 is released and we tag AstroNvim v2.0.0 to incorporate this "breaking" change.

:::

## Features

- `stable` and `nightly` update channels
- pinning your updater to a specific commit/branch/stable version
- allow AstroNvim to completely manage updates for core provided plugins in a stable way
- will prompt the user if there are breaking changes before updating as well as show the full changelog after a successful update
- setting and managing custom remote repositories
- show the changelog at the end of an update

## Update Channels

As of AstroNvim `v1.4.0` we have adopted a release model using two channels: `stable` and `nightly`. They each have a few different features and goals:

**Stable**

The `stable` update channel is meant to provide tracking of officially tagged releases that should be the most stable experience that you can achieve with no fear of plugin updates breaking your editor or anything. With each stable release we release a snapshot of the core provided plugins and their latest working commit at the time of release. By default on the `stable` channel AstroNvim will use these snapshots to pin all of the core plugins to these commits and keep them from updating and potentially bringing in breaking changes. These tagged releases also will happen a lot less frequently and each update will come with several changes/bug fixes/features/etc. There is also the ability to filter what versions you want to update to for example if you only want to stay in `v1.X` and never upate to `v2` whenever it gets released that can be configured. The updater will also warn you if there are any breaking changes included in the update that may require manual updating of your user configuration, and ask if you want to continue or abort the process.

**Stable**

The `nightly` update channel is meant for people who want more regular updates and follow the latest and greatest features real time. This also by default does not track pinned plugin versions and the core plugins are able to update freely with `:PackerSync`.

## Configuration

Here is the complete set of configuration options for the `updater` table in your `user/init.lua` file as well as the default values:

```lua
updater = {
  channel = "nightly",
  remote = "origin",
  version = "latest",
  branch = "main",
  commit = nil,
  pin_plugins = nil,
  skip_prompts = false,
  show_changelog = true,
  -- remotes = { -- easily add new remotes to track
  --   ["remote_name"] = "https://remote_url.come/repo.git", -- full remote url
  --   ["remote2"] = "github_user/repo", -- GitHub user/repo shortcut,
  --   ["remote3"] = "github_user", -- GitHub user assumes user/AstroNvim.git
  -- },
},
```

### Options

- `channel`: This can be either `"nightly"` or `"stable"` and those two options are described above
- `remote`: This lets you choose to use a separate remote outside of the `origin` which can be useful for checking out other forks and testing PRs from community members
- `version`: (`stable` only) This allows you to apply a filter for searching for versions. `"latest"` is automatically treated as `"v*"`, other examples can be exact versions (`v1.4.0`) or search filters (`v1.*`)
- `branch`: (`nightly` only) This allows you to check out a different branch on the specified `remote`
- `commit`: (`nightly` only) This allows you to pin the `nightly` updates to a specific commit
- `pin_plugins`: This value controls the automatic management of core plugin commits. This can either be `nil` (default) which will pin plugin commits only on `stable`, `false` which completely disables it, `true` which enables it for both `stable` and `nightly`.
- `skip_prompts`: This lets you skip the confirmation prompts in the update process and automatically accept each one
- `show_changelog`: This allows you to skip the printing of the complete changelog at the end of the update
- `remotes`: This is a configuration table for easily setting up more remotes for AstroNvim to pull from. The above example shows the different formats for the URL that are supported and once a remote is defined, the key can be used in the `remote` option field.
