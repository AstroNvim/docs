---
id: mappings
title: Default Mappings
---

## General Mappings

| Action                      | Mappings            |
| --------------------------- | ------------------- |
| Leader key                  | `Space`             |
| Resize up                   | `Ctrl + Up`         |
| Resize Down                 | `Ctrl + Down`       |
| Resize Left                 | `Ctrl + Left`       |
| Resize Right                | `Ctrl + Right`      |
| Up Window                   | `Ctrl + k`          |
| Down Window                 | `Ctrl + j`          |
| Left Window                 | `Ctrl + h`          |
| Right Window                | `Ctrl + l`          |
| Force Write                 | `Ctrl + s`          |
| Force Quit                  | `Ctrl + q`          |
| New File                    | `Leader + n`        |
| Close Buffer                | `Leader + c`        |
| Next Tab (real vim tab)     | `]t`                |
| Previous Tab (real vim tab) | `[t`                |
| Comment                     | `Leader + /`        |
| Horizontal Split            | `\`                 |
| Vertical Split              | <code>&#124;</code> |

## Buffers

| Action                                                              | Mappings                      |
| ------------------------------------------------------------------- | ----------------------------- |
| Next Buffer                                                         | `]b`                          |
| Previous Buffer                                                     | `[b`                          |
| Move Buffer Right                                                   | `>b`                          |
| Move Buffer Left                                                    | `<b`                          |
| Navigate to buffer tab with interactive picker                      | `Leader + bb`                 |
| Delete a buffer tab with interactive picker                         | `Leader + bd`                 |
| Open a buffer tab in a new horizontal split with interactive picker | `Leader + b\`                 |
| Open a buffer tab in a new vertical split with interactive picker   | <code>Leader + b&#124;</code> |

## Better Escape

| Action     | Mappings   |
| ---------- | ---------- |
| Escape key | `jj`, `jk` |

## Neo-Tree

| Action         | Mappings     |
| -------------- | ------------ |
| Neotree toggle | `Leader + e` |
| Neotree focus  | `Leader + o` |

## Dashboard Mappings

| Action           | Mappings     |
| ---------------- | ------------ |
| Dashboard (Home) | `Leader + h` |

## Session Manager Mappings

| Action                         | Mappings      |
| ------------------------------ | ------------- |
| Save Session                   | `Leader + Ss` |
| Last Session                   | `Leader + Sl` |
| Delete Session                 | `Leader + Sd` |
| Search Sessions                | `Leader + Sf` |
| Load Current Directory Session | `Leader + S.` |

## Package Management Mappings

| Action                    | Mappings      |
| ------------------------- | ------------- |
| AstroNvim Packages Update | `Leader + pa` |
| AstroNvim Updater         | `Leader + pA` |
| AstroNvim Changelog       | `Leader + pl` |
| AstroNvim Version         | `Leader + pv` |
| Mason Installer           | `Leader + pm` |
| Mason Updater             | `Leader + pM` |
| Packer Install            | `Leader + pi` |
| Plugins Status            | `Leader + ps` |
| Plugins Sync              | `Leader + pS` |
| Plugins Check for Updates | `Leader + pu` |
| Plugins Update            | `Leader + pU` |

## LSP Mappings

| Action               | Mappings            |
| -------------------- | ------------------- |
| LSP Info             | `Leader + li`       |
| Null-ls Info         | `Leader + lI`       |
| Hover Document       | `Shift + k`         |
| Format Document      | `Leader + lf`       |
| Symbols Outline      | `Leader + lS`       |
| Line Diagnostics     | `gl`, `Leader + ld` |
| All Diagnostics      | `Leader + lD`       |
| Code Actions         | `Leader + la`       |
| Signature Help       | `Leader + lh`       |
| Rename               | `Leader + lr`       |
| Document Symbols     | `Leader + ls`       |
| Workspace Symbols    | `Leader + lG`       |
| Diagnostic Next      | `]d`                |
| Diagnostics Previous | `[d`                |
| Declaration          | `gD`                |
| Type Definition      | `gT`                |
| Definition           | `gd`                |
| Implementation       | `gI`                |
| References           | `gr`                |

## Debugger Mappings

| Action                  | Mappings                   |
| ----------------------- | -------------------------- |
| Start/Continue Debugger | `Leader + dc` or `<F5>`    |
| Pause Debugger          | `Leader + dp` or `<F6>`    |
| Restart Debugger        | `Leader + dr` or `<C-F5>`  |
| Close Debugger Session  | `Leader + dq`              |
| Terminate Debugger      | `Leader + dQ` or `<S-F5>`  |
| Toggle Breakpoint       | `Leader + db` or `<F9>`    |
| Clear Breakpoints       | `Leader + dB`              |
| Step Over               | `Leader + do` or `<F10>`   |
| Step Into               | `Leader + di` or `<F11>`   |
| Step Out                | `Leader + dO` or `<S-F11>` |
| Toggle REPL             | `Leader + dR`              |
| Toggle Debugger UI      | `Leader + du`              |
| Debugger Hover          | `Leader + dh`              |

## Telescope Mappings

| Action                            | Mappings      |
| --------------------------------- | ------------- |
| Marks                             | `Leader + f'` |
| Buffers                           | `Leader + fb` |
| Word at cursor                    | `Leader + fc` |
| Commands                          | `Leader + fC` |
| Find files                        | `Leader + ff` |
| Find files (include hidden files) | `Leader + fF` |
| Help Tags                         | `Leader + fh` |
| Keymaps                           | `Leader + fk` |
| Man Pages                         | `Leader + fm` |
| Notifications                     | `Leader + fn` |
| Old Files                         | `Leader + fo` |
| Registers                         | `Leader + fr` |
| Themes                            | `Leader + ft` |
| Live Grep                         | `Leader + fw` |
| Live Grep (include hidden files)  | `Leader + fW` |
| Git Branches                      | `Leader + gb` |
| Git Commits                       | `Leader + gc` |
| Git Status                        | `Leader + gt` |
| LSP Symbols                       | `Leader + ls` |
| LSP Workspace Symbols             | `Leader + lG` |
| LSP References                    | `Leader + lR` |
| LSP Diagnostics                   | `Leader + lD` |

## Toggle Terminal Mappings

| Action                    | Mappings                     |
| ------------------------- | ---------------------------- |
| Toggle Terminal           | `F7`                         |
| Floating Terminal         | `Leader + tf`                |
| Horizontal Split Terminal | `Leader + th`                |
| Vertical Split Terminal   | `Leader + tv`                |
| LazyGit                   | `Leader + tl`, `Leader + gg` |
| Node                      | `Leader + tn`                |
| Python                    | `Leader + tp`                |
| GDU                       | `Leader + tu`                |
| Btm                       | `Leader + tt`                |

## Git Mappings

| Action        | Mappings      |
| ------------- | ------------- |
| Next Hunk     | `Leader + gj` |
| Previous Hunk | `Leader + gk` |
| Blame Line    | `Leader + gl` |
| Preview Hunk  | `Leader + gp` |
| Reset Hunk    | `Leader + gr` |
| Stage Hunk    | `Leader + gs` |
| Unstage Hunk  | `Leader + gu` |
| Git Diff      | `Leader + gd` |

## UI Mappings

| Action                  | Mappings      |
| ----------------------- | ------------- |
| Toggle autopairs        | `Leader + ua` |
| Toggle background       | `Leader + ub` |
| Toggle autocompletion   | `Leader + uc` |
| Toggle color highlights | `Leader + uC` |
| Toggle diagnostics      | `Leader + ud` |
| Toggle auto formatting  | `Leader + uf` |
| Toggle signcolumn       | `Leader + ug` |
| Change indent setting   | `Leader + ui` |
| Toggle statusline       | `Leader + ul` |
| Toggle CodeLens         | `Leader + uL` |
| Change line numbering   | `Leader + un` |
| Toggle UI notifications | `Leader + uN` |
| Toggle paste mode       | `Leader + up` |
| Toggle spellcheck       | `Leader + us` |
| Toggle conceal          | `Leader + uS` |
| Toggle tabline          | `Leader + ut` |
| Toggle URL highlight    | `Leader + uu` |
| Toggle wrap             | `Leader + uw` |
| Toggle syntax highlight | `Leader + uy` |
