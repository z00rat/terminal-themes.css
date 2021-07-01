# terminal-themes.css

Terminal color schemes/themes as css or json file for using those in browser.

---

## status

there is not much to here,
color plate is not something that ever got an update.
so, for the most part after writing the converter script this repo will be kinda dead.
unless any new color plate got released or any bug can be found.
please open an issue if needed.

---

## variants

|                                   branch names                                    |         description          | compact naming | cursor | selection |
| :-------------------------------------------------------------------------------: | :--------------------------: | :------------: | :----: | :-------: |
|          [json](https://github.com/z00rat/terminal-themes.css/tree/json)          |       raw json version       |       🔴       |   🟢   |    🟢     |
|      [json-min](https://github.com/z00rat/terminal-themes.css/tree/json-min)      |   json with compact naming   |       🟢       |   🟢   |    🟢     |
|     [css-class](https://github.com/z00rat/terminal-themes.css/tree/css-class)     |     colors as css class      |       🔴       |   🔴   |    🔴     |
| [css-class-min](https://github.com/z00rat/terminal-themes.css/tree/css-class-min) | css-class but compact naming |       🟢       |   🔴   |    🔴     |
|       [css-var](https://github.com/z00rat/terminal-themes.css/tree/css-var)       |   colors as css variables    |       🔴       |   🟢   |    🟢     |
|   [css-var-min](https://github.com/z00rat/terminal-themes.css/tree/css-var-min)   |  css-var but compact naming  |       🟢       |   🟢   |    🟢     |

|      color name      |        json [1]         | json min [1] |    css class [2]    | css class min [3] |         css var [4]         | css var min [4] |
| :------------------: | :---------------------: | :----------: | :-----------------: | :---------------: | :-------------------------: | :-------------: |
|     normal black     |     JT.normal.black     |    JT.N0     |    .normal-black    |        .N0        |     var(--normal-black)     |    var(--N0)    |
|      normal red      |      JT.normal.red      |    JT.N1     |     .normal-red     |        .N1        |      var(--normal-red)      |    var(--N1)    |
|     normal green     |     JT.normal.green     |    JT.N2     |    .normal-green    |        .N2        |     var(--normal-green)     |    var(--N2)    |
|    normal yellow     |    JT.normal.yellow     |    JT.N3     |   .normal-yellow    |        .N3        |    var(--normal-yellow)     |    var(--N3)    |
|     normal blue      |     JT.normal.blue      |    JT.N4     |    .normal-blue     |        .N4        |     var(--normal-blue)      |    var(--N4)    |
|    normal magenta    |    JT.normal.magenta    |    JT.N5     |   .normal-magenta   |        .N5        |    var(--normal-magenta)    |    var(--N5)    |
|     normal cyan      |     JT.normal.cyan      |    JT.N6     |    .normal-cyan     |        .N6        |     var(--normal-cyan)      |    var(--N6)    |
|     normal white     |     JT.normal.white     |    JT.N7     |    .normal-white    |        .N7        |     var(--normal-white)     |    var(--N7)    |
|     bright black     |     JT.bright.black     |    JT.B0     |    .bright-black    |        .B0        |     var(--bright-black)     |    var(--B0)    |
|      bright red      |      JT.bright.red      |    JT.B1     |     .bright-red     |        .B1        |      var(--bright-red)      |    var(--B1)    |
|     bright green     |     JT.bright.green     |    JT.B2     |    .bright-green    |        .B2        |     var(--bright-green)     |    var(--B2)    |
|    bright yellow     |    JT.bright.yellow     |    JT.B3     |   .bright-yellow    |        .B3        |    var(--bright-yellow)     |    var(--B3)    |
|     bright blue      |     JT.bright.blue      |    JT.B4     |    .bright-blue     |        .B4        |     var(--bright-blue)      |    var(--B4)    |
|    bright magenta    |    JT.bright.magenta    |    JT.B5     |   .bright-magenta   |        .B5        |    var(--bright-magenta)    |    var(--B5)    |
|     bright cyan      |     JT.bright.cyan      |    JT.B6     |    .bright-cyan     |        .B6        |     var(--bright-cyan)      |    var(--B6)    |
|     bright white     |     JT.bright.white     |    JT.B7     |    .bright-white    |        .B7        |     var(--bright-white)     |    var(--B7)    |
|  primary background  |  JT.primary.background  |    JT.Pb     | .primary-background |        .Pb        |  var(--primary-background)  |    var(--Pb)    |
|  primary foreground  |  JT.primary.foreground  |    JT.Pf     | .primary-foreground |        .Pf        |  var(--primary-foreground)  |    var(--Pf)    |
| selection background | JT.selection.background |    JT.Sb     |         🚫          |        🚫         | var(--selection-background) |    var(--Sb)    |
|    selection text    |    JT.selection.text    |    JT.St     |         🚫          |        🚫         |    var(--selection-text)    |    var(--St)    |
|    cursor cursor     |    JT.cursor.cursor     |    JT.Cc     |         🚫          |        🚫         |    var(--cursor-cursor)     |    var(--Cc)    |
|     cursor text      |     JT.cursor.text      |    JT.Ct     |         🚫          |        🚫         |     var(--cursor-text)      |    var(--Ct)    |

🚫 means there is no support for that color in the version
for example: there is no point to have `selection` or `cursor` color as class, because you can't use them.

[1] => import **any json version** by `import JT from "assets/css-var/nord.css";`
[2] => add "-bg" at the end of the **css-class** name to use it as background color. e.g. `.bright-blue-bg` for back as background color.
[3] => add "B" at the end of the **css-class-min** name to use it as background color. e.g. `.B4B` for back as background color.
[4] => import **any variable version** by `<link rel="stylesheet" href="assets/css-var/nord.css" />` and use the color anywhere you want.

- short color name's numerical color code is taken from https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit

if you need or have any idea about any other possible variant please open an issue.

---

### color scheme sources

###### - https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/alacritty

---

### tools i used

- **shell script** _for basic automation_
- [nodejs](https://nodejs.org) _for generator/converter_
- [pnpm](https://pnpm.io) _for nodejs package management_
- [chalk](https://www.npmjs.com/package/chalk) _for colorful output from nodejs code_
- [commander](https://www.npmjs.com/package/commander) _for parsing cli arguments_
- [js-yaml](https://www.npmjs.com/package/js-yaml) _for YAML to JSON_
- [VSCode](https://code.visualstudio.com/) _as code editor_
- [css](https://www.npmjs.com/package/css) _for css to json_
- [csso](https://www.npmjs.com/package/csso) _for compressing hex color_
- [json-to-css](https://www.npmjs.com/package/json-to-css) _for json to css_
- **git & github** _why not ??_
- ***

  star it if you like
