import { alpha, tints } from '../color';
import type { CodeRoles, Output, Variant } from '../palette';
import { Variants } from '../palette';

type Role = (typeof CodeRoles)[number] | 'comment' | 'faint';
const Italic = { font_style: 'italic' };
const Bold = { font_weight: 700 };
type Row = { role: Role; font?: typeof Italic | typeof Bold; captures: string[] };

const AnsiNames = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

const Tokens: Record<string, Row> = {
  'Comments and doc comments': {
    role: 'comment',
    captures: ['comment', 'comment.doc', 'string.doc', 'type.jsdoc', 'variable.jsdoc'],
  },
  'Tags inside doc comments': { role: 'keyword', captures: ['keyword.jsdoc'] },
  'Keywords, storage, modifiers, control flow, imports': {
    role: 'keyword',
    captures: [
      'keyword',
      'keyword.control',
      'keyword.declaration',
      'keyword.definition',
      'keyword.import',
      'keyword.modifier',
    ],
  },
  'Preprocessor directives': { role: 'keyword', captures: ['keyword.directive', 'keyword.preproc', 'preproc'] },
  'Generic punctuation': { role: 'keyword', captures: ['punctuation', 'punctuation.delimiter.jsx'] },
  'Operators, in symbols or words': {
    role: 'keyword',
    captures: ['keyword.operator', 'operator', 'operator.spaceship'],
  },
  'Constructor calls': {
    role: 'keyword',
    captures: ['constructor', 'constructor.javascript', 'constructor.tsx', 'constructor.typescript', 'type.class.call'],
  },
  'String escapes and interpolation marks': {
    role: 'keyword',
    captures: ['punctuation.special', 'string.css', 'string.escape', 'string.special'],
  },
  'Functions, methods, calls, macros, decorators': {
    role: 'function',
    captures: [
      'attribute.builtin',
      'function',
      'function.annotation',
      'function.builtin',
      'function.call',
      'function.decorator',
      'function.decorator.call',
      'function.definition',
      'function.macro',
      'function.method',
      'function.method.call',
      'function.method.constructor',
      'function.special',
      'function.special.definition',
      'lsp.type.decorator',
      'lsp.type.function',
      'lsp.type.method',
      'lsp.typemod.function.defaultLibrary.lua',
      'lsp.typemod.method.defaultLibrary',
      'function.defaultLibrary.lua',
      'method',
      'method.defaultLibrary',
    ],
  },
  'Functions from the standard library': {
    role: 'type',
    captures: ['function.defaultLibrary', 'lsp.typemod.function.defaultLibrary'],
  },
  'Attributes in HTML, XML and JSX': {
    role: 'function',
    font: Italic,
    captures: ['attribute', 'attribute.jsx', 'attribute.xml'],
  },
  'Types, classes, interfaces, structs, enums, traits': {
    role: 'type',
    captures: [
      'concept',
      'lsp.type.class',
      'lsp.type.enum',
      'lsp.type.interface',
      'lsp.type.macro',
      'lsp.type.namespace',
      'lsp.type.struct',
      'lsp.type.type',
      'lsp.typemod.class.defaultLibrary',
      'lsp.typemod.interface.defaultLibrary',
      'lsp.typemod.type.defaultLibrary',
      'module.c_sharp',
      'namespace.c_sharp',
      'type',
      'type.class',
      'type.class.definition',
      'type.class.inheritance',
      'type.defaultLibrary',
      'type.definition',
      'type.enum',
      'type.event',
      'type.interface',
      'type.name',
      'type.struct',
    ],
  },
  'Built-in types': { role: 'type', captures: ['type.builtin', 'type.class.builtin'] },
  'Type parameters': {
    role: 'type',
    font: Italic,
    captures: [
      'lifetime',
      'lsp.type.typeParameter',
      'lsp.typemod.typeParameter.declaration',
      'type.parameter',
      'type.parameter.definition',
      'type.super',
      'typeParameter',
      'typeParameter.declaration',
    ],
  },
  'Tags in HTML, XML and JSX': { role: 'keyword', captures: ['tag', 'tag.doctype', 'tag.jsx', 'tag.xml'] },
  'Components in JSX': { role: 'type', font: Italic, captures: ['tag.component.jsx'] },
  'Keys in JSON, YAML and TOML': { role: 'type', captures: ['property.json', 'property.json_key'] },
  'Strings and characters': { role: 'string', captures: ['string', 'string.special.path', 'text.literal'] },
  'Regular expressions': {
    role: 'regex',
    captures: [
      'keyword.operator.regex',
      'label.regex',
      'number.quantifier.regex',
      'operator.regex',
      'punctuation.bracket.regex',
      'punctuation.delimiter.regex',
      'string.escape.regex',
      'string.regex',
      'string.regexp',
    ],
  },
  'Numbers, booleans, null, enum members, symbols': {
    role: 'constant',
    captures: [
      'boolean',
      'constant.builtin',
      'enum',
      'lsp.type.enumMember',
      'number',
      'string.special.symbol',
      'type.enum.member',
      'variant',
    ],
  },
  'Constants and read-only variables': {
    role: 'constant',
    captures: [
      'constant',
      'lsp.mod.variable.readonly',
      'lsp.typemod.variable.declaration.readonly',
      'lsp.typemod.variable.readonly',
      'lsp.typemod.variable.readonly.declaration',
      'variable.constant',
      'variable.declaration.readonly',
      'variable.readonly',
      'variable.readonly.declaration',
    ],
  },
  'Globals from the standard library': {
    role: 'constant',
    captures: [
      'lsp.mod.defaultLibrary',
      'lsp.mod.global',
      'lsp.typemod.variable.defaultLibrary',
      'variable.builtin',
      'variable.defaultLibrary',
      'variable.default_library',
    ],
  },
  'this, self and super, and labels': { role: 'constant', font: Italic, captures: ['label', 'variable.special'] },
  Parameters: { role: 'param', font: Italic, captures: ['function.kwargs', 'lsp.type.parameter', 'variable.parameter'] },
  'Variables, properties, fields, object keys': {
    role: 'foreground',
    captures: [
      'attribute.special',
      'lsp.type.property',
      'lsp.type.variable',
      'none',
      'property',
      'property.name',
      'variable',
      'variable.member',
      'variable.other.member',
    ],
  },
  'Modules and namespaces': {
    role: 'foreground',
    captures: ['module', 'module.go', 'module.javascript', 'module.typescript', 'namespace'],
  },
  'Brackets, commas, semicolons, tag brackets': {
    role: 'foreground',
    captures: [
      'punctuation.bracket',
      'punctuation.bracket.html',
      'punctuation.bracket.jsx',
      'punctuation.delimiter',
      'punctuation.delimiter.css',
      'punctuation.delimiter.html',
    ],
  },
  'Plain text': { role: 'foreground', captures: ['embedded', 'primary', 'text', 'text.jsx'] },
  Headings: { role: 'keyword', font: Bold, captures: ['markup.heading', 'title', 'title.markup'] },
  'Bold text': { role: 'param', font: Bold, captures: ['emphasis.strong', 'emphasis.strong.markup'] },
  'Italic text': { role: 'string', font: Italic, captures: ['emphasis', 'emphasis.markup'] },
  'Inline code and code fences': { role: 'function', captures: ['punctuation.embedded.markup', 'text.literal.markup'] },
  'Link text': { role: 'foreground', captures: ['link_text', 'link_text.markup', 'markup.link.label'] },
  'Link addresses': { role: 'type', captures: ['link_uri', 'link_uri.markup', 'markup.link.url'] },
  'List markers and rules': {
    role: 'type',
    captures: ['punctuation.list_marker', 'punctuation.list_marker.markup'],
  },
  Quotes: { role: 'comment', captures: ['punctuation.markup'] },
  'Struck text': { role: 'comment', captures: ['strikethrough.markup'] },
  'CSS selectors and units': {
    role: 'function',
    captures: ['selector.class', 'selector.id', 'selector.pseudo', 'type.css', 'type.unit'],
  },
  'Added lines': { role: 'string', captures: ['diff.plus'] },
  'Removed lines': { role: 'regex', captures: ['diff.minus'] },
  'Changed lines': { role: 'function', captures: ['diff.delta', 'diff.delta.moved'] },
  'Inlay hints': { role: 'constant', font: Bold, captures: ['hint'] },
  'Predicted text': { role: 'comment', captures: ['predictive'] },
};

function syntax(variant: Variant) {
  const entries = Object.values(Tokens).flatMap(({ role, font, captures }) =>
    captures.map((capture) => [capture, { color: variant[role], ...font }]),
  );
  return Object.fromEntries(entries);
}

function signal(name: string, color: string, background: string, border = color) {
  return { [name]: color, [`${name}.background`]: background, [`${name}.border`]: border };
}

function ansi(variant: Variant) {
  const entries = variant.ansi.flatMap((color, index) => {
    const name = AnsiNames[index % AnsiNames.length];
    if (index < AnsiNames.length) {
      return [
        [`terminal.ansi.${name}`, color],
        [`terminal.ansi.dim_${name}`, alpha(color, 0.7)],
      ];
    }
    return [[`terminal.ansi.bright_${name}`, color]];
  });
  return Object.fromEntries(entries);
}

function players(variant: Variant) {
  const others = [
    variant.param,
    variant.function,
    variant.type,
    variant.constant,
    variant.string,
    variant.regex,
    variant.keyword,
  ];
  return [
    { cursor: variant.accent, background: variant.accent, selection: variant.selection },
    ...others.map((color) => ({ cursor: color, background: color, selection: alpha(color, 0.25) })),
  ];
}

function theme(variant: Variant) {
  const tint = tints(variant);
  const clear = alpha(variant.background, 0);
  return {
    name: variant.name,
    appearance: variant.appearance,
    style: {
      accents: [variant.keyword, variant.param, variant.function, variant.type, variant.constant],
      background: variant.background,
      'background.appearance': 'opaque',
      border: variant.border,
      'border.disabled': alpha(variant.border, 0.5),
      'border.focused': variant.accent,
      'border.selected': variant.accent,
      'border.transparent': clear,
      'border.variant': alpha(variant.border, 0.6),
      'drop_target.background': alpha(variant.accent, 0.15),
      'editor.active_line.background': tint.line,
      'editor.active_line_number': variant.accentText,
      'editor.active_wrap_guide': variant.faint,
      'editor.background': variant.background,
      'editor.document_highlight.bracket_background': alpha(variant.accentText, 0.25),
      'editor.document_highlight.read_background': tint.reference,
      'editor.document_highlight.write_background': tint.referenceWrite,
      'editor.foreground': variant.foreground,
      'editor.gutter.background': variant.background,
      'editor.highlighted_line.background': variant.raised,
      'editor.indent_guide': variant.border,
      'editor.indent_guide_active': variant.faint,
      'editor.invisible': variant.faint,
      'editor.line_number': variant.faint,
      'editor.subheader.background': variant.panel,
      'editor.wrap_guide': variant.border,
      'element.active': alpha(variant.accent, 0.2),
      'element.background': variant.raised,
      'element.disabled': variant.panel,
      'element.hover': alpha(variant.accent, 0.12),
      'element.selected': variant.selection,
      'elevated_surface.background': variant.float,
      'ghost_element.active': alpha(variant.accent, 0.2),
      'ghost_element.background': clear,
      'ghost_element.disabled': clear,
      'ghost_element.hover': variant.raised,
      'ghost_element.selected': variant.selection,
      icon: variant.foreground,
      'icon.accent': variant.accentText,
      'icon.disabled': variant.faint,
      'icon.muted': alpha(variant.foreground, 0.7),
      'icon.placeholder': variant.comment,
      'link_text.hover': variant.function,
      'pane.focused_border': variant.accent,
      'pane_group.border': variant.border,
      'panel.background': variant.panel,
      'panel.focused_border': variant.accent,
      'panel.indent_guide': variant.border,
      'panel.indent_guide_active': variant.faint,
      'panel.indent_guide_hover': variant.comment,
      players: players(variant),
      'scrollbar.thumb.background': alpha(variant.faint, 0.4),
      'scrollbar.thumb.border': clear,
      'scrollbar.thumb.hover_background': alpha(variant.faint, 0.7),
      'scrollbar.track.background': clear,
      'scrollbar.track.border': clear,
      'search.match_background': tint.search,
      'status_bar.background': variant.panel,
      'surface.background': variant.panel,
      syntax: syntax(variant),
      'tab.active_background': tint.line,
      'tab.inactive_background': variant.panel,
      'tab_bar.background': variant.panel,
      'terminal.ansi.background': variant.background,
      'terminal.background': variant.background,
      'terminal.bright_foreground': variant.foreground,
      'terminal.dim_foreground': variant.comment,
      'terminal.foreground': variant.foreground,
      text: variant.foreground,
      'text.accent': variant.accentText,
      'text.disabled': variant.faint,
      'text.muted': alpha(variant.foreground, 0.7),
      'text.placeholder': variant.comment,
      'title_bar.background': variant.panel,
      'title_bar.inactive_background': variant.panel,
      'toolbar.background': variant.background,
      ...ansi(variant),
      ...signal('error', variant.regex, tint.errorBackground),
      ...signal('warning', variant.warning, tint.warningBackground),
      ...signal('info', variant.function, tint.infoBackground),
      ...signal('hint', variant.type, tint.hintBackground),
      ...signal('success', variant.string, tint.diffAdded),
      ...signal('created', variant.string, tint.diffAdded),
      ...signal('deleted', variant.regex, tint.diffRemoved),
      ...signal('modified', variant.function, tint.diffChanged),
      ...signal('renamed', variant.function, tint.diffChanged),
      ...signal('conflict', variant.warning, tint.warningBackground),
      ...signal('hidden', variant.comment, variant.raised, variant.border),
      ...signal('ignored', variant.comment, variant.raised, variant.border),
      ...signal('predictive', variant.comment, variant.raised, variant.border),
      ...signal('unreachable', variant.comment, variant.raised, variant.border),
    },
  };
}

export function zed(): Output {
  const family = {
    $schema: 'https://zed.dev/schema/themes/v0.2.0.json',
    name: 'Favo',
    author: 'Irwin Arruda',
    themes: Variants.map(theme),
  };
  return { path: 'zed/themes/favo.json', text: `${JSON.stringify(family, undefined, 2)}\n` };
}
