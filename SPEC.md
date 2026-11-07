# The Favo spec

This page is the whole theme. If you follow it, your port is Favo, whatever the app. Colors live in [`palette.json`](palette.json), which is the one source of truth; the tables here explain what each color is for.

Favo has four variants, in two pairs. Use these names, and the ids where an app needs one.

| Variant        | Id           | Mode  | Surfaces     |
| -------------- | ------------ | ----- | ------------ |
| **Favo Honey** | `favo-honey` | dark  | Honey-tinted |
| **Favo Wax**   | `favo-wax`   | light | Honey-tinted |
| **Favo Smoke** | `favo-smoke` | dark  | Calm gray    |
| **Favo Veil**  | `favo-veil`  | light | Calm gray    |

Honey and Wax come from the hive. Smoke and Veil come from the beekeeper: the smoke that calms a hive and the veil worn to work it. All four share every code color. The tables below define Honey and Wax, and [Smoke and Veil](#smoke-and-veil) says what changes for the calm pair.

## Principles

1. **Honey leads.** Keywords carry the brand color, so the shape of a file reads in honey before you read a word of it.
2. **Each color has one job.** A reader should learn what a color means once, and never have to read around it.
3. **What you read most stays quiet.** Variables, properties and punctuation use the plain text color. Color marks structure, not everything.
4. **Italic means "from somewhere else".** Parameters, type parameters, attributes and components arrive from outside the line you are reading, and italic says so.
5. **Contrast is a contract.** Every number below is checked by `bun run check`, not by eye.

## Palette

### Surfaces and text

| Name         | Honey     | Wax       | Job                                    |
| ------------ | --------- | --------- | -------------------------------------- |
| `background` | `#14110B` | `#FBF5E6` | Editor and terminal background         |
| `panel`      | `#1B170F` | `#F4EBD5` | Sidebars, title bars, inactive tabs    |
| `raised`     | `#221D14` | `#EDE2C6` | Hovered rows, controls, elevated cards |
| `float`      | `#0F0D08` | `#FFFAEF` | Popups, menus, floating windows        |
| `border`     | `#3A3122` | `#DCCDAA` | Borders and separators                 |
| `selection`  | `#3D2E0F` | `#F6DFA6` | Selected text                          |
| `faint`      | `#6E6250` | `#9C8D73` | Line numbers, hints, invisible glyphs  |
| `comment`    | `#A3937A` | `#857559` | Comments                               |
| `foreground` | `#F3E7CF` | `#33291A` | Text                                   |

### Brand

| Name         | Honey     | Wax       | Job                                     |
| ------------ | --------- | --------- | --------------------------------------- |
| `accent`     | `#F5A623` | `#B8720A` | Cursor, focus rings, active indicators  |
| `accentText` | `#F5A623` | `#8F5600` | Brand color when it is used as text     |
| `fill`       | `#F5A623` | `#8F5600` | Primary buttons and strong highlights   |
| `fillHover`  | `#FFC857` | `#7A4900` | `fill` on hover                         |
| `onFill`     | `#14110B` | `#FBF5E6` | Text on top of `fill`                   |
| `warning`    | `#FFC857` | `#8F5600` | Warnings                                |

### Code

| Name       | Honey     | Wax       | Color    | Job                       |
| ---------- | --------- | --------- | -------- | ------------------------- |
| `keyword`  | `#FCAF41` | `#915100` | honey    | The structure of the code |
| `function` | `#74C7FF` | `#1F62A4` | sky      | Things that run           |
| `type`     | `#77EDD1` | `#007D70` | mint     | Shapes of data            |
| `string`   | `#B8EC6D` | `#477C18` | meadow   | Text in the program       |
| `constant` | `#BC9DFB` | `#7145B5` | lavender | Fixed values              |
| `param`    | `#F898C3` | `#AA3069` | rose     | Values passed in          |
| `regex`    | `#F9786A` | `#C43E27` | coral    | Patterns and errors       |

### Terminal

The 16 terminal colors are the `ansi` list in `palette.json`, in the usual order: black, red, green, yellow, blue, magenta, cyan, white, then the bright versions. Red is `regex`, green is `string`, yellow is `keyword`, blue is `function`, magenta is `constant` and cyan is `type`.

## Smoke and Veil

Smoke is Honey and Veil is Wax, with calmer surfaces. Everything not listed here, including every code color, is the same.

| Name                       | Smoke and Veil                                                          |
| -------------------------- | ----------------------------------------------------------------------- |
| `background`               | `gray` step 1 from [APPS.md](APPS.md)                                    |
| `panel`                    | `gray` step 2                                                           |
| `raised`                   | `gray` step 3                                                           |
| `border`                   | `gray` step 6                                                           |
| `faint`                    | `gray` step 9                                                           |
| `comment`                  | `gray` step 11                                                          |
| `foreground`               | `gray` step 12                                                          |
| `float` and the terminal's black, white, bright black and bright white | The same lightness and hue, with 30% of the color |
| `selection`                | `honey` step 5 in Smoke, step 4 in Veil                                 |
| `fill`, `fillHover`, `onFill` | `honey` steps 9 and 10, with near-black text                         |

The gray keeps Favo's lightness and hue, so contrast barely moves, and the last row means Veil's buttons and current search match are honey, not brown. Smoke follows Honey's contrast rules and Veil follows Wax's.

## Code tokens

Where a token fits two rows, the more specific row wins.

| Token                                                  | Role         | Style  |
| ------------------------------------------------------ | ------------ | ------ |
| Comments and doc comments                              | `comment`    |        |
| Tags inside doc comments, such as `@param`             | `keyword`    |        |
| Keywords, storage, modifiers, control flow, imports    | `keyword`    |        |
| Preprocessor directives                                | `keyword`    |        |
| Operators, in symbols or words                         | `keyword`    |        |
| Constructor calls in JavaScript and TypeScript         | `keyword`    |        |
| String escapes and interpolation marks, such as `${ }` | `keyword`    |        |
| Functions, methods, calls, decorators                  | `function`   |        |
| Functions from the standard library, such as `parseInt` | `type`       |        |
| Attributes in HTML, XML and JSX                        | `function`   | italic |
| Types, classes, interfaces, structs, enums, traits     | `type`       |        |
| Built-in types and constructors in other languages     | `type`       |        |
| Type parameters                                        | `type`       | italic |
| Tags in HTML, XML and JSX, such as `div`               | `keyword`    |        |
| Components in JSX, such as `LoginCard`                 | `type`       | italic |
| Keys in JSON, YAML and TOML                            | `type`       |        |
| Strings and characters                                 | `string`     |        |
| Regular expressions                                    | `regex`      |        |
| Numbers, booleans, `null`, enum members, symbols       | `constant`   |        |
| Constants and read-only variables                      | `constant`   |        |
| Globals from the standard library                      | `constant`   |        |
| `this`, `self` and `super`, and labels                 | `constant`   | italic |
| Parameters                                             | `param`      | italic |
| Variables, properties, fields, object keys             | `foreground` |        |
| Modules and namespaces                                 | `foreground` |        |
| Brackets, commas, semicolons, tag brackets             | `foreground` |        |

Comments are not italic: they are read as prose, and `comment` is already quieter than the code.

Language servers follow the same table: `property` is `foreground`; `class`, `interface`, `struct`, `enum` and `type` are `type`; `typeParameter` is `type` in italic; `namespace`, `macro` and `event` are `type`; `enumMember` is `constant`; `parameter` is `param` in italic; `function`, `method` and `decorator` are `function`. A `variable` with the `readonly` or `defaultLibrary` modifier is `constant`, and so is anything else marked `global` or `defaultLibrary`, except that standard library classes, interfaces and types stay `type`, functions become `type`, and methods stay `function`.

### Prose and markup

| Token                         | Role         | Style  |
| ----------------------------- | ------------ | ------ |
| Headings                      | `keyword`    | bold   |
| Bold text                     | `param`      | bold   |
| Italic text                   | `string`     | italic |
| Inline code and code fences   | `function`   |        |
| Link text                     | `foreground` |        |
| Link addresses                | `type`       |        |
| List markers and rules        | `keyword`    |        |
| Quotes                        | `comment`    |        |

### CSS

Selectors and units are `function`, property names and delimiters are `foreground`, and strings and color values are `keyword`.

## Interface

This section is for editors and terminals. For websites and apps, use [APPS.md](APPS.md).

| Element                        | Color                                       |
| ------------------------------ | ------------------------------------------- |
| Cursor                         | `accent`, with `background` for its text    |
| Selection                      | `selection`                                 |
| Current line                   | `line` tint                                 |
| Line numbers                   | `faint`                                     |
| Current line number            | `accentText`, bold                          |
| Search matches                 | `search` tint                               |
| Current search match           | `fill`, with `onFill` for its text, bold    |
| Matching brackets              | `accentText`, bold and underlined           |
| Rainbow brackets, in order     | `keyword`, `param`, `function`, `type`, `constant` |
| Primary buttons                | `fill`, with `onFill` for text              |
| Focus rings, active tabs       | `accent`                                    |
| Word under the cursor          | `reference` tint                            |
| The same word, being written   | `referenceWrite` tint                       |
| Secondary text on panels       | `foreground` at 70%, or `comment` where the app has no transparency |

Status bars show the mode with a block of color: normal `accent`, insert `string`, visual `constant`, replace `regex`, command `function`, terminal `type`. Text on those blocks is `background`.

### Signals

| Signal     | Text       | Background tint     |
| ---------- | ---------- | ------------------- |
| Error      | `regex`    | `errorBackground`   |
| Warning    | `warning`  | `warningBackground` |
| Info       | `function` | `infoBackground`    |
| Hint       | `type`     | `hintBackground`    |
| Added      | `string`   | `diffAdded`         |
| Removed    | `regex`    | `diffRemoved`       |
| Changed    | `function` | `diffChanged`       |

Diffs color the background only, so syntax colors stay readable inside them. The part of a changed line that really changed uses `diffText`.

### Tints

A tint is a color laid over `background` at a fixed strength: `mix(color, background, amount)`, computed on 8-bit sRGB channels. Tints are not extra colors to choose. They always come from this table.

| Tint                | Color        | Amount |
| ------------------- | ------------ | ------ |
| `line`              | `accent`     | 8%     |
| `search`            | `accent`     | 35%    |
| `reference`         | `foreground` | 10%    |
| `referenceWrite`    | `accent`     | 20%    |
| `diffAdded`         | `string`     | 18%    |
| `diffRemoved`       | `regex`      | 16%    |
| `diffChanged`       | `function`   | 12%    |
| `diffText`          | `function`   | 28%    |
| `errorBackground`   | `regex`      | 10%    |
| `warningBackground` | `warning`    | 10%    |
| `infoBackground`    | `function`   | 10%    |
| `hintBackground`    | `type`       | 10%    |

## Contrast

Contrast is the WCAG 2.1 ratio against `background`. Separation is the distance between two colors in OKLab, where equal steps look equally different.

| Rule                                            | Honey, Smoke | Wax, Veil |
| ----------------------------------------------- | --------- | --------- |
| `foreground` and every code color, at least     | 7:1       | 4.5:1     |
| `comment`, at least                             | 4.5:1     | 4:1       |
| `foreground` and every code color on `selection`, at least | 4.5:1 | 3.5:1 |
| Closest two code colors, at least               | 0.10      | 0.10      |

Honey and Smoke clear WCAG AAA, and Wax and Veil clear AA, for all code. `faint` is deliberately low contrast, so use it only for text you can safely ignore.

`bun run check` measures all of this and fails if a rule breaks.

## Writing a port

1. Read colors from `palette.json`. Do not eyeball them or copy them from another port.
2. Map tokens with the tables above, using the app's own public docs for its token names.
3. Ship all four variants, named as above, with no color outside the palette, its tints and the Smoke and Veil rules.
4. If the app can't express something, drop to the next closest row rather than adding a color.
5. Add a target in `src/targets/` when the app reads a generated file, then run `bun run build` and `bun run check`.

Please write each port from this spec and the app's docs, not from another theme's files. That keeps Favo free to be MIT licensed. See [CONTRIBUTING.md](CONTRIBUTING.md).
