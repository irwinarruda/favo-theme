import raw from '../palette.json';
import { fromOklch, oklch } from './color';
import { GrayChroma, onColors, scales } from './interface';

export const CodeRoles = ['foreground', 'keyword', 'function', 'type', 'string', 'constant', 'param', 'regex'] as const;

const Sources = [
  { id: 'honey', ...raw.honey },
  { id: 'wax', ...raw.wax },
];
export type Variant = (typeof Sources)[number];
export type Output = { path: string; text: string };

const NeutralAnsi = [0, 7, 8, 15];

function calm(hex: string) {
  const { lightness, chroma, hue } = oklch(hex);
  return fromOklch(lightness, chroma * GrayChroma, hue);
}

function calmVariant(source: Variant, id: string, name: string): Variant {
  const mode = source.appearance === 'dark' ? 'dark' : 'light';
  const { gray = [], honey = [] } = scales(mode);
  const step = (scale: string[], number: number) => scale[number - 1] ?? '';
  return {
    ...source,
    id,
    name,
    background: step(gray, 1),
    panel: step(gray, 2),
    raised: step(gray, 3),
    float: calm(source.float),
    border: step(gray, 6),
    selection: step(honey, mode === 'dark' ? 5 : 4),
    faint: step(gray, 9),
    comment: step(gray, 11),
    foreground: step(gray, 12),
    fill: step(honey, 9),
    fillHover: step(honey, 10),
    onFill: onColors(mode).honey ?? source.onFill,
    ansi: source.ansi.map((color, index) => (NeutralAnsi.includes(index) ? calm(color) : color)),
  };
}

export const Variants = [
  ...Sources,
  calmVariant(Sources[0] as Variant, 'smoke', 'Favo Smoke'),
  calmVariant(Sources[1] as Variant, 'veil', 'Favo Veil'),
];
