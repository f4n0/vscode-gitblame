# Git Blame

See Git Blame information in the status bar for the currently selected line.

Quick link to open the latest commit on the current line in the most popular online git tools.

## How to use

![Feature Usage](https://raw.githubusercontent.com/Sertion/vscode-gitblame/master/images/preview.png)

Git blame adds git blame information to your vscode compatible view. See information about what commit last changed a line and how long ago it was. Click the message to see more information about the commit. It is possible to edit both of these information messages in the settings. There are multiple tokens avalible. These are described below.

Git Blame works very well with WSL but does not work with the web browser based vscode compatible editors.

## Install

1. Open _Visual Studio Code_
1. Press `Ctrl+Shift+X` or `⇧⌘X`
1. Type `blame`
1. Click install on _Git Blame_

## Configuration

### `gitblame.commitUrl`
> Type: `string`

> Default value: `"${tool.protocol}://${gitorigin.hostname}${gitorigin.port}${gitorigin.path}${tool.basepath}/${hash}"`

Url where you can see the commit by hash

If set to an empty value it will try to guess the URL based on your remote origin. Can only support servers that don't require auth.

Available tokens:
* `${hash}` - the commit hash
* `${file.path}` - path to the final file
* `${file.path.result}` - path to the final file
* `${file.path.source}` - path to the original file
* `${file.line}` - the line number of the line in the final file
* `${file.line.result}` - the line number of the line in the final file
* `${file.line.source}` - the line number of the line in the original file
* `${project.name}` - your project name (e.g. `project_name` in `https://github.com/user/project_name.git`)
* `${project.remote}` - the current default remote's URL with the protocol, port-specifiers, and trailing `.git` stripped. (e.g. `github.com/user/project_name` in `https://github.com/user/project_name.git`)
* `${gitorigin.hostname}` - the git origin domain (e.g. `github.com` in `https://github.com/ckb-next/ckb-next.git`)
* `${gitorigin.hostname,n}` - the nth part of the git origin domain (e.g. if the git origin is `https://github.com/ckb-next/ckb-next.git` `${gitorigin.hostname,1}` will return `com`)
* `${gitorigin.path}` - the git origin path (e.g. `/ckb-next/ckb-next.git` in `https://github.com/ckb-next/ckb-next.git`)
* `${gitorigin.path,n}` - the nth part of the git origin path (e.g. if the git origin is `https://github.com/ckb-next/ckb-next.git` `${gitorigin.path,1}` will return `ckb-next.git`)
* `${gitorigin.port}` - the git origin port (if it uses http/https) including prefixed `:`
* `${tool.protocol}` - `http:` or `https:`
* `${tool.commitpath}` - `/commit/` or `/commits`

### `gitblame.pluralWebPathSubstrings`
> Type: `string[]`

> Default value: `["bitbucket", "atlassian"]`

An array of substrings that, when present in the git origin URL, replaces _commit_ with _commits_ in the `gitblame.commitUrl` token `tool.commitpath`. Set the value to something that matches anything to recreate the old `gitblame.isWebPathPlural`-setting.

### `gitblame.ignoreWhitespace`
> Type: `boolean`

> Default value: `false`

Use the git blame `-w` flag.

### `gitblame.infoMessageFormat`
> Type: `string`

> Default value: `"${commit.hash} ${commit.summary}"`

Message that appears when the <code>gitblame.quickInfo</code> command executes (when you click the status bar message).

### `gitblame.statusBarMessageFormat`
> Type: `string`

> Default value: `"Blame ${author.name} (${time.ago})"`

Message in the status bar about the current line's git blame commit. (Available tokens)[#message-tokens].

### `gitblame.statusBarMessageNoCommit`
> Type: `string`

> Default value: `"Not Committed Yet"`

Message in the status bar about the current line when no commit can be found. _No available tokens_.

### `gitblame.statusBarPositionPriority`
> Type: `number`

> Default value: `500`

Priority where the status bar view should be placed. Higher value should be placed further to the left.

### `gitblame.inlineBlameMargin`
> Type: `number`

> Default value: `2`

The amount of margin between line and inline blame view

### `gitblame.inlineBlameColor`
> Type: `string`

> Default value: `#888987`

The inline blame view text color (as CSS Rule)

### Message Tokens

| Token | Function | Parameter | Default Value | Description |
|-------|----------|-----------|---------------|-------------|
| `${commit.hash,length}` | Yes | `length` | 40 | the first `length` characters of the 40-bit hash unique to the commit |
| `${commit.hash_short,length}` | Yes | `length` | 7 | the first `length` characters of the 40-bit hash unique to the commit |
| `${commit.summary}` | Yes | `length` | 65536 | the first `length` characters of the first line of the commit message |
| `${author.name}` | No | - | - | the commit author's name |
| `${author.mail}` | No | - | - | the commit author's e-mail |
| `${author.timestamp}` | No | - | - | timestamp for the commit author's commit |
| `${author.tz}` | No | - | - | the commit author's time zone |
| `${author.date}` | No | - | - | the commit author's date (ex: 1990-09-16) |
| `${committer.name}` | No | - | - | the committer's name |
| `${committer.mail}` | No | - | - | the committer's e-mail |
| `${committer.timestamp}` | No | - | - | timestamp for the committer's commit |
| `${committer.tz}` | No | - | - | the committer's time zone |
| `${committer.date}` | No | - | - | the committer's date (ex: Sep 16 1990) |
| `${time.ago}` | No | - | - | displays an estimation of how long ago the author committed (e.g. `10 hours ago`, `20 days ago`, `4 months ago`) |
| `${time.c_ago}` | No | - | - | displays an estimation of how long ago the committer committed (e.g. `10 hours ago`, `20 days ago`, `4 months ago`) |

## Housekeeping
 * [Planned Features](https://github.com/Sertion/vscode-gitblame/labels/Planned)
 * [Known Issues](https://github.com/Sertion/vscode-gitblame/issues)

## Acknowledgements

* Logo by [Jason Long](https://twitter.com/jasonlong).
