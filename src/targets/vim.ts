import { distance, tints } from '../color';
import type { Output, Variant } from '../palette';

type Style = { fg?: string; bg?: string; sp?: string; attr?: string };

const CubeSteps = [0, 95, 135, 175, 215, 255];
const GrayRamp = Array.from({ length: 24 }, (_, index) => 8 + index * 10);

function hex(red: number, green: number, blue: number) {
  const pairs = [red, green, blue].map((value) => value.toString(16).padStart(2, '0'));
  return `#${pairs.join('')}`;
}

const XtermColors = [
  ...CubeSteps.flatMap((red) => CubeSteps.flatMap((green) => CubeSteps.map((blue) => hex(red, green, blue)))),
  ...GrayRamp.map((gray) => hex(gray, gray, gray)),
];

function xterm(color: string) {
  const distances = XtermColors.map((candidate) => distance(color, candidate));
  return 16 + distances.indexOf(Math.min(...distances));
}

function groups(variant: Variant): Record<string, Style> {
  const { accent, accentText, background, border, comment, constant, faint, fill, float } = variant;
  const { foreground, keyword, onFill, panel, param, raised, regex, selection, string, type, warning } = variant;
  const func = variant.function;
  const tint = tints(variant);

  const words = { fg: keyword };
  const plain = { fg: foreground };
  const quiet = { fg: faint };
  const fixed = { fg: constant };
  const shapes = { fg: type };
  const calls = { fg: func };
  const canvas = { fg: foreground, bg: background };
  const gutter = { fg: faint, bg: background };
  const popup = { fg: foreground, bg: float };
  const bar = { fg: foreground, bg: panel };
  const inactiveBar = { fg: comment, bg: panel };
  const cursor = { fg: background, bg: accent };
  const strong = { fg: onFill, bg: fill, attr: 'bold' };
  const activeTab = { fg: background, bg: accent, attr: 'bold' };
  const picked = { bg: selection };
  const match = { fg: accentText, attr: 'bold' };
  const lineNumber = { fg: faint };

  return {
    Normal: canvas,
    Terminal: canvas,
    MsgArea: canvas,

    Cursor: cursor,
    lCursor: cursor,
    CursorIM: cursor,
    CursorLine: { bg: tint.line },
    CursorColumn: { bg: tint.line },
    CursorLineNr: { fg: accentText, attr: 'bold' },
    CursorLineFold: gutter,
    CursorLineSign: gutter,
    ColorColumn: { bg: raised },

    LineNr: lineNumber,
    LineNrAbove: lineNumber,
    LineNrBelow: lineNumber,
    SignColumn: gutter,
    FoldColumn: gutter,
    Folded: { fg: comment, bg: raised },

    Visual: { bg: selection },
    VisualNOS: { bg: selection },
    Search: { bg: tint.search },
    CurSearch: strong,
    IncSearch: strong,
    MatchParen: { fg: accentText, attr: 'bold,underline' },
    QuickFixLine: picked,

    DiffAdd: { bg: tint.diffAdded },
    DiffChange: { bg: tint.diffChanged },
    DiffDelete: { bg: tint.diffRemoved },
    DiffText: { bg: tint.diffText },
    DiffTextAdd: { bg: tint.diffText },

    Conceal: quiet,
    NonText: quiet,
    EndOfBuffer: quiet,
    SpecialKey: quiet,
    Directory: { fg: accentText },
    Title: { fg: keyword, attr: 'bold' },

    ModeMsg: { fg: accentText, attr: 'bold' },
    MoreMsg: { fg: accentText },
    Question: { fg: accentText },
    WarningMsg: { fg: warning },
    ErrorMsg: { fg: regex },
    MessageWindow: popup,

    Pmenu: popup,
    PmenuSel: picked,
    PmenuKind: { fg: type, bg: float },
    PmenuKindSel: { fg: type, bg: selection },
    PmenuExtra: { fg: comment, bg: float },
    PmenuExtraSel: { fg: comment, bg: selection },
    PmenuMatch: match,
    PmenuMatchSel: match,
    PmenuSbar: { bg: raised },
    PmenuThumb: { bg: border },
    PopupSelected: picked,
    PopupNotification: popup,
    ComplMatchIns: { fg: accentText },
    PreInsert: quiet,
    WildMenu: picked,

    SpellBad: { sp: regex, attr: 'undercurl' },
    SpellCap: { sp: warning, attr: 'undercurl' },
    SpellLocal: { sp: func, attr: 'undercurl' },
    SpellRare: { sp: type, attr: 'undercurl' },

    StatusLine: bar,
    StatusLineNC: inactiveBar,
    StatusLineTerm: bar,
    StatusLineTermNC: inactiveBar,
    TabLine: inactiveBar,
    TabLineFill: { bg: panel },
    TabLineSel: activeTab,
    TabPanel: inactiveBar,
    TabPanelFill: { bg: panel },
    TabPanelSel: activeTab,
    VertSplit: { fg: border },
    ToolbarLine: { bg: panel },
    ToolbarButton: strong,

    User1: activeTab,
    User2: { fg: background, bg: string, attr: 'bold' },
    User3: { fg: background, bg: constant, attr: 'bold' },
    User4: { fg: background, bg: regex, attr: 'bold' },
    User5: { fg: background, bg: func, attr: 'bold' },
    User6: { fg: background, bg: type, attr: 'bold' },
    User7: { fg: background, bg: param, attr: 'bold' },
    User8: { fg: foreground, bg: raised },
    User9: inactiveBar,

    Menu: popup,
    Scrollbar: { fg: border, bg: panel },
    Tooltip: popup,
    TOhtmlProgress: { bg: fill },

    debugPC: { bg: tint.warningBackground },
    debugBreakpoint: { fg: regex, bg: tint.errorBackground },

    Comment: { fg: comment },

    Constant: fixed,
    String: { fg: string },
    Character: { fg: string },
    Number: fixed,
    Boolean: fixed,
    Float: fixed,

    Identifier: plain,
    Function: calls,

    Statement: words,
    Conditional: words,
    Repeat: words,
    Label: words,
    Operator: words,
    Keyword: words,
    Exception: words,

    PreProc: words,
    Include: words,
    Define: words,
    Macro: calls,
    PreCondit: words,

    Type: shapes,
    StorageClass: words,
    Structure: words,
    Typedef: shapes,

    Special: words,
    SpecialChar: words,
    Tag: calls,
    Delimiter: plain,
    SpecialComment: words,
    Debug: words,

    Underlined: { fg: func, attr: 'underline' },
    Bold: { fg: param, attr: 'bold' },
    Italic: { fg: string, attr: 'italic' },
    BoldItalic: { fg: param, attr: 'bold,italic' },
    Ignore: { fg: background },
    Error: { fg: regex, bg: tint.errorBackground },
    Todo: { fg: func, bg: tint.infoBackground, attr: 'bold' },

    Added: { fg: string },
    Changed: calls,
    Removed: { fg: regex },
  };
}

function cterm(color: string | undefined) {
  return color === undefined ? 'NONE' : xterm(color);
}

function highlight(name: string, { fg, bg, sp, attr = 'NONE' }: Style) {
  const gui = `guifg=${fg ?? 'NONE'} guibg=${bg ?? 'NONE'} gui=${attr}`;
  const terminal = `ctermfg=${cterm(fg)} ctermbg=${cterm(bg)} cterm=${attr.replace('undercurl', 'underline')}`;
  return `hi ${name} ${gui} ${terminal}${sp ? ` guisp=${sp}` : ''}`;
}

export function vim(variant: Variant): Output {
  const lines = [
    'unlet! g:colors_name',
    `set background=${variant.appearance}`,
    'hi clear',
    "if exists('syntax_on')",
    '  syntax reset',
    'endif',
    `let g:colors_name = 'favo-${variant.id}'`,
    ...Object.entries(groups(variant)).map(([name, style]) => highlight(name, style)),
    `let g:terminal_ansi_colors = [${variant.ansi.map((color) => `'${color}'`).join(', ')}]`,
  ];
  return { path: `vim/colors/favo-${variant.id}.vim`, text: `${lines.join('\n')}\n` };
}
