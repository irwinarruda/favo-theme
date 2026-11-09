import { contrast } from '../color';
import { Hues, Mixes, Modes, type Mix, type Mode, Neutrals, Semantic, mixed, onColors, scales } from '../interface';
import type { Output } from '../palette';

const Steps = Array.from({ length: 12 }, (_, index) => index + 1);
const Scales = [...Neutrals, ...Hues.map(({ name }) => name)];

function variable(reference: string) {
  return `var(--favo-${reference})`;
}

function modeBlock(mode: Mode) {
  const all = scales(mode);
  const on = onColors(mode);
  return [
    `  color-scheme: ${mode};`,
    ...Scales.flatMap((name) => Steps.map((step) => `  --favo-${name}-${step}: ${all[name]?.[step - 1]};`)),
    ...Hues.map(({ name }) => `  --favo-on-${name}: ${on[name]};`),
    ...Object.entries(Semantic).map(([token, value]) => `  --favo-${token}: ${variable(value[mode])};`),
  ].join('\n');
}

const MixNames = Object.keys(Mixes) as Mix[];

function css(): Output {
  const neutral = (flavor: string) => Steps.map((step) => `  --favo-neutral-${step}: var(--favo-${flavor}-${step});`);
  const mixes = MixNames.map((name) => {
    const { first, second, amount } = Mixes[name];
    return `  --favo-${name}: color-mix(in oklab, ${variable(first)} ${amount * 100}%, ${variable(second)});`;
  });
  const dark = modeBlock('dark');
  const text = [
    `:root {\n${modeBlock('light')}\n${neutral('gray').join('\n')}\n${mixes.join('\n')}\n}`,
    `:root[data-neutral="sand"] {\n${neutral('sand').join('\n')}\n}`,
    `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${dark.replaceAll('\n  ', '\n    ').replace(/^ {2}/, '    ')}\n  }\n}`,
    `:root[data-theme="dark"] {\n${dark}\n}`,
  ];
  return { path: 'app/favo.css', text: `${text.join('\n\n')}\n` };
}

function tailwind(): Output {
  const scaleNames = ['neutral', ...Scales];
  const lines = [
    ...scaleNames.flatMap((name) => Steps.map((step) => `  --color-${name}-${step}: var(--favo-${name}-${step});`)),
    ...Hues.map(({ name }) => `  --color-on-${name}: var(--favo-on-${name});`),
    ...[...Object.keys(Semantic), ...MixNames].map((token) => `  --color-${token}: var(--favo-${token});`),
  ];
  return { path: 'app/tailwind.css', text: `@import "./favo.css";\n\n@theme inline {\n${lines.join('\n')}\n}\n` };
}

function tokens(): Output {
  const blends = (mode: Mode) =>
    Object.fromEntries(MixNames.map((name) => [name, Object.fromEntries(Neutrals.map((flavor) => [flavor, mixed(name, mode, flavor)]))]));
  const modes = Object.fromEntries(Modes.map((mode) => [mode, { scales: scales(mode), on: onColors(mode), mixed: blends(mode) }]));
  return { path: 'app/tokens.json', text: `${JSON.stringify({ ...modes, semantic: Semantic, mixes: Mixes }, undefined, 2)}\n` };
}

function picture(mode: Mode): Output {
  const all = scales(mode);
  const cell = { width: 64, height: 40, gap: 3 };
  const left = 82;
  const top = 26;
  const page = all.gray?.[0] ?? '';
  const ink = all.gray?.[11] ?? '';
  const header = Steps.map(
    (step) =>
      `<text x="${left + (step - 1) * (cell.width + cell.gap) + cell.width / 2}" y="17" text-anchor="middle" font-size="12" font-weight="600" fill="${ink}">${step}</text>`,
  );
  const rows = Scales.map((name, row) => {
    const y = top + row * (cell.height + cell.gap);
    const cells = (all[name] ?? []).map((hex, index) => {
      const x = left + index * (cell.width + cell.gap);
      const label = contrast(hex, '#FFFFFF') > contrast(hex, '#14110B') ? '#FFFFFF' : '#14110B';
      return `<rect x="${x}" y="${y}" width="${cell.width}" height="${cell.height}" rx="5" fill="${hex}"/><text x="${x + cell.width / 2}" y="${y + cell.height / 2 + 4}" text-anchor="middle" font-size="10" fill="${label}">${hex.slice(1)}</text>`;
    });
    return `<text x="12" y="${y + cell.height / 2 + 4}" font-size="12" font-weight="600" fill="${ink}">${name}</text>${cells.join('')}`;
  });
  const width = left + 12 * (cell.width + cell.gap) + 9;
  const height = top + Scales.length * (cell.height + cell.gap) + 9;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Favo app palette, ${mode}">`,
    `<title>Favo app palette, ${mode}</title>`,
    `<rect width="${width}" height="${height}" rx="14" fill="${page}"/>`,
    `<g font-family="ui-monospace, SFMono-Regular, Menlo, monospace">${header.join('')}${rows.join('')}</g>`,
    '</svg>',
  ];
  return { path: `assets/app-palette-${mode}.svg`, text: `${svg.join('\n')}\n` };
}

export function app() {
  return [css(), tailwind(), tokens(), ...Modes.map(picture)];
}
