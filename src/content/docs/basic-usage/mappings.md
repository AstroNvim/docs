---
id: mappings
title: Default Mappings
sidebar:
  # Set a custom label for the link
  label: Mappings
  # Set a custom order for the link (lower numbers are displayed higher up)
  order: 0
  # Add a badge to the link
---

## General Mappings

| Action                      | Mappings            |
| --------------------------- | ------------------- |
| Leader key                  | `Space`             |
| Local Leader key            | `,`                 |
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
| Close all buffers except the current                                | `Leader + bc`                 |
| Close all buffers                                                   | `Leader + bC`                 |
| Delete a buffer tab with interactive picker                         | `Leader + bd`                 |
| Close all buffers to the left of the current                        | `Leader + bl`                 |
| Go to the previous buffer                                           | `Leader + bp`                 |
| Close all buffers to the right of the current                       | `Leader + br`                 |
| Sort buffers by extension                                           | `Leader + bse`                |
| Sort buffers by buffer number                                       | `Leader + bsi`                |
| Sort buffers by last modification                                   | `Leader + bsm`                |
| Sort buffers by full path                                           | `Leader + bsp`                |
| Sort buffers by relative path                                       | `Leader + bsr`                |
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
| Update Lazy and Mason     | `Leader + pa` |
| Plugins Install           | `Leader + pi` |
| Mason Installer           | `Leader + pm` |
| Mason Updater             | `Leader + pM` |
| Plugins Status            | `Leader + ps` |
| Plugins Sync              | `Leader + pS` |
| Plugins Check for Updates | `Leader + pu` |
| Plugins Update            | `Leader + pU` |

## LSP Mappings

| Action               | Mappings            |
| -------------------- | ------------------- |
| LSP Info             | `Leader + li`       |
| None-ls Info         | `Leader + lI`       |
| Hover Document       | `K`                 |
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
| Type Definition      | `gy`                |
| Definition           | `gd`                |
| Implementation       | `gI`                |
| References           | `gr`, `Leader + lR` |

## Debugger Mappings

| Action                  | Mappings                   |
| ----------------------- | -------------------------- |
| Start/Continue Debugger | `Leader + dc` or `<F5>`    |
| Pause Debugger          | `Leader + dp` or `<F6>`    |
| Restart Debugger        | `Leader + dr` or `<C-F5>`  |
| Run Debugger to Cursor  | `Leader + ds`              |
| Close Debugger Session  | `Leader + dq`              |
| Terminate Debugger      | `Leader + dQ` or `<S-F5>`  |
| Toggle Breakpoint       | `Leader + db` or `<F9>`    |
| Conditional Breakpoint  | `Leader + dC` or `<S-F9>`  |
| Clear Breakpoints       | `Leader + dB`              |
| Step Over               | `Leader + do` or `<F10>`   |
| Step Into               | `Leader + di` or `<F11>`   |
| Step Out                | `Leader + dO` or `<S-F11>` |
| Evaluate Expression     | `Leader + dE`              |
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
| Colorschemes                      | `Leader + ft` |
| Live Grep                         | `Leader + fw` |
| Live Grep (include hidden files)  | `Leader + fW` |
| Git Branches                      | `Leader + gb` |
| Git Commits (repository)          | `Leader + gc` |
| Git Commits (current file)        | `Leader + gC` |
| Git Status                        | `Leader + gt` |
| LSP Symbols                       | `Leader + ls` |
| LSP Workspace Symbols             | `Leader + lG` |

## Terminal Mappings

| Action                   | Mappings                |
| ------------------------ | ----------------------- |
| Open Floating Terminal   | `Leader + tf` or `<F7>` |
| Open Horizontal Terminal | `Leader + th`           |
| Open Vertical Terminal   | `Leader + tv`           |
| Open Toggle Lazygit      | `Leader + tl`           |
| Open Toggle node         | `Leader + tn`           |
| Open Toggle Python       | `Leader + tp`           |
| Open Toggle btm          | `Leader + tt`           |
