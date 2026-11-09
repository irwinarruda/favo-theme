import raw from '../palette.json';
import { blend, contrast, fromOklch, oklch } from './color';

export const Modes = ['dark', 'light'] as const;
export type Mode = (typeof Modes)[number];
export const Neutrals = ['gray', 'sand'] as const;
export type Neutral = (typeof Neutrals)[number];
export const Hues = [
  { name: 'honey', role: 'keyword' },
  { name: 'sky', role: 'function' },
  { name: 'mint', role: 'type' },
  { name: 'meadow', role: 'string' },
  { name: 'lavender', role: 'constant' },
  { name: 'rose', role: 'param' },
  { name: 'coral', role: 'regex' },
] as const;
export const GrayChroma = 0.15;

const Source = { dark: raw.honey, light: raw.wax };
const SolidLightness = 0.7;
const White = '#FFFFFF';

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function interpolate(known: Record<number, number>, step: number) {
  const steps = Object.keys(known).map(Number);
  const below = Math.max(...steps.filter((known) => known <= step));
  const above = Math.min(...steps.filter((known) => known >= step));
  if (below === above) return known[below] ?? 0;
  return lerp(known[below] ?? 0, known[above] ?? 0, (step - below) / (above - below));
}

function lightness(mode: Mode) {
  const source = Source[mode];
  const [first, second, third, sixth, twelfth] = [
    source.background,
    source.panel,
    source.raised,
    source.border,
    source.foreground,
  ].map((hex) => oklch(hex).lightness) as [number, number, number, number, number];
  const direction = mode === 'dark' ? 1 : -1;
  return [
    first,
    second,
    third,
    lerp(third, sixth, 1 / 3),
    lerp(third, sixth, 2 / 3),
    sixth,
    sixth + direction * 0.05,
    sixth + direction * 0.13,
    mode === 'dark' ? 0.56 : 0.62,
    mode === 'dark' ? 0.61 : 0.57,
    oklch(source.comment).lightness,
    twelfth,
  ];
}

function darkenUntil(hex: string, readsOn: string[], ratio: number) {
  const { lightness: start, chroma, hue } = oklch(hex);
  let color = hex;
  for (let value = start; readsOn.some((surface) => contrast(color, surface) < ratio); value -= 0.002) {
    color = fromOklch(value, chroma, hue);
  }
  return color;
}

function neutral(mode: Mode, flavor: Neutral) {
  const source = Source[mode];
  const anchors: Record<number, string> = {
    1: source.background,
    2: source.panel,
    3: source.raised,
    6: source.border,
    9: source.faint,
    11: source.comment,
    12: source.foreground,
  };
  const chroma = Object.fromEntries(Object.entries(anchors).map(([step, hex]) => [step, oklch(hex).chroma]));
  const hue = Object.fromEntries(Object.entries(anchors).map(([step, hex]) => [step, oklch(hex).hue]));
  const share = flavor === 'gray' ? GrayChroma : 1;
  const scale = lightness(mode).map((value, index) => {
    const step = index + 1;
    const anchor = anchors[step];
    if (flavor === 'sand' && anchor && step !== 9 && step !== 11) return anchor;
    return fromOklch(value, interpolate(chroma, step) * share, interpolate(hue, step));
  });
  scale[10] = darkenUntil(scale[10] as string, mode === 'dark' ? [] : [scale[1] as string, scale[2] as string], 4.6);
  return scale;
}

function hue(mode: Mode, role: (typeof Hues)[number]['role'], name: string) {
  const dark = oklch(Source.dark[role]);
  const solid = name === 'honey' ? Source.dark.accent : fromOklch(SolidLightness, dark.chroma * 1.1, dark.hue);
  const solidColor = oklch(solid);
  const share = mode === 'dark' ? [0.1, 0.14, 0.2, 0.26, 0.32, 0.4, 0.5, 0.62] : [0.1, 0.15, 0.22, 0.28, 0.34, 0.42, 0.52, 0.64];
  const ladder = lightness(mode);
  const boost = name === 'honey' && mode === 'light' ? 1.6 : 1;
  const tints = share.map((amount, index) =>
    fromOklch(ladder[index] ?? 0, solidColor.chroma * amount * boost, solidColor.hue),
  );
  const hover =
    name === 'honey' && mode === 'dark'
      ? Source.dark.fillHover
      : fromOklch(solidColor.lightness + (mode === 'dark' ? 0.05 : -0.05), solidColor.chroma, solidColor.hue);
  const surfaces = Neutrals.flatMap((flavor) => neutral(mode, flavor).slice(0, 3));
  const text = mode === 'dark' ? Source.dark[role] : darkenUntil(Source.light[role], [tints[2] as string, ...surfaces], 4.5);
  const strong =
    mode === 'dark'
      ? fromOklch(0.94, solidColor.chroma * 0.25, solidColor.hue)
      : fromOklch(0.33, solidColor.chroma * 0.6, solidColor.hue);
  return [...tints, solid, hover, text, strong];
}

function onSolid(solid: string, hover: string) {
  const dark = Source.dark.onFill;
  return Math.min(contrast(dark, solid), contrast(dark, hover)) >= Math.min(contrast(White, solid), contrast(White, hover))
    ? dark
    : White;
}

export function scales(mode: Mode) {
  const result: Record<string, string[]> = { gray: neutral(mode, 'gray'), sand: neutral(mode, 'sand') };
  for (const { name, role } of Hues) result[name] = hue(mode, role, name);
  return result;
}

export function onColors(mode: Mode) {
  const all = scales(mode);
  return Object.fromEntries(Hues.map(({ name }) => [name, onSolid(all[name]?.[8] ?? '', all[name]?.[9] ?? '')]));
}

export const Status = { success: 'meadow', warning: 'honey', danger: 'coral', info: 'sky' } as const;

export const Semantic = {
  page: { dark: 'neutral-1', light: 'neutral-2' },
  surface: { dark: 'neutral-2', light: 'neutral-1' },
  raised: { dark: 'neutral-3', light: 'neutral-2' },
  hover: { dark: 'neutral-4', light: 'neutral-3' },
  pressed: { dark: 'neutral-5', light: 'neutral-4' },
  overlay: { dark: 'neutral-3', light: 'neutral-1' },
  'line-subtle': { dark: 'neutral-6', light: 'neutral-6' },
  line: { dark: 'neutral-7', light: 'neutral-7' },
  'line-strong': { dark: 'neutral-8', light: 'neutral-8' },
  'line-control': { dark: 'neutral-9', light: 'neutral-9' },
  fg: { dark: 'neutral-12', light: 'neutral-12' },
  'fg-muted': { dark: 'neutral-11', light: 'neutral-11' },
  'fg-faint': { dark: 'neutral-9', light: 'neutral-9' },
  primary: { dark: 'honey-9', light: 'honey-9' },
  'primary-hover': { dark: 'honey-10', light: 'honey-10' },
  'on-primary': { dark: 'on-honey', light: 'on-honey' },
  'primary-soft': { dark: 'honey-3', light: 'honey-3' },
  'primary-fg': { dark: 'honey-11', light: 'honey-11' },
  focus: { dark: 'honey-9', light: 'honey-11' },
  selection: { dark: 'honey-5', light: 'honey-4' },
  ...Object.fromEntries(
    Object.entries(Status).flatMap(([status, name]) => [
      [status, { dark: `${name}-11`, light: `${name}-11` }],
      [`${status}-soft`, { dark: `${name}-3`, light: `${name}-3` }],
      [`${status}-line`, { dark: `${name}-6`, light: `${name}-6` }],
      [`${status}-solid`, { dark: `${name}-9`, light: `${name}-9` }],
      [`on-${status}`, { dark: `on-${name}`, light: `on-${name}` }],
    ]),
  ),
} as Record<string, Record<Mode, string>>;

export const Mixes = { 'fg-reading': { first: 'fg', second: 'fg-muted', amount: 0.45 } } as const;
export type Mix = keyof typeof Mixes;

export function mixed(name: Mix, mode: Mode, flavor: Neutral) {
  const { first, second, amount } = Mixes[name];
  return blend(resolve(Semantic[first]?.[mode] ?? '', mode, flavor), resolve(Semantic[second]?.[mode] ?? '', mode, flavor), amount);
}

export function resolve(reference: string, mode: Mode, flavor: Neutral) {
  const all = scales(mode);
  if (reference.startsWith('on-')) return onColors(mode)[reference.slice(3)] ?? '';
  const [name = '', step = '0'] = reference.split(/-(?=\d+$)/);
  return all[name === 'neutral' ? flavor : name]?.[Number(step) - 1] ?? '';
}
