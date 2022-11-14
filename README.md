# Obsidian Emacs


This is a plugin for Obsidian (https://obsidian.md).

## `C-l` recenter-top-bottom

Scroll the window so that current line is in the middle of the window.
Successive invocations scroll the window in a cyclical order to put
the current line at certain places within the window, as determined by
‘recenter-positions’.  By default, the second invocation puts the
current line at the top-most window line, the third invocation puts it
on the bottom-most window line, and then the order is reused in a
cyclical manner.

## `C-k` kill-line

Kill the rest of the current line; if no nonblanks there, kill thru newline.
