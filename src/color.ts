import type { Variant } from './palette';

function channels(hex: string) {
  return [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16));
}

function toHex(values: number[]) {
  const pairs = values.map((value) => Math.round(value).toString(16).padStart(2, '0'));
  return `#${pairs.join('').toUpperCase()}`;
}

export function mix(top: string, bottom: string, amount: number) {
  const from = channels(top);
  const to = channels(bottom);
  return toHex(from.map((value, index) => value * amount + (to[index] ?? 0) * (1 - amount)));
}

export function alpha(hex: string, amount: number) {
  const value = Math.round(amount * 255);
  return `${hex}${value.toString(16).padStart(2, '0').toUpperCase()}`;
}

function linear(channel: number) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const [red = 0, green = 0, blue = 0] = channels(hex).map(linear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrast(first: string, second: string) {
  const [high = 0, low = 0] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (high + 0.05) / (low + 0.05);
}

function oklab(hex: string) {
  const [red = 0, green = 0, blue = 0] = channels(hex).map(linear);
  const long = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
  const medium = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
  const short = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);
  return [
    0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short,
    1.9779984951 * long - 2.428592205 * medium + 0.4505937099 * short,
    0.0259040371 * long + 0.7827717662 * medium - 0.808675766 * short,
  ];
}

export function distance(first: string, second: string) {
  const to = oklab(second);
  return Math.hypot(...oklab(first).map((value, index) => value - (to[index] ?? 0)));
}

function paintTints(variant: Variant, paint: (color: string, amount: number) => string) {
  const { accent, foreground, regex, string, type, warning } = variant;
  return {
    line: paint(accent, 0.08),
    search: paint(accent, 0.35),
    reference: paint(foreground, 0.1),
    referenceWrite: paint(accent, 0.2),
    diffAdded: paint(string, 0.18),
    diffRemoved: paint(regex, 0.16),
    diffChanged: paint(variant.function, 0.12),
    diffText: paint(variant.function, 0.28),
    errorBackground: paint(regex, 0.1),
    warningBackground: paint(warning, 0.1),
    infoBackground: paint(variant.function, 0.1),
    hintBackground: paint(type, 0.1),
  };
}

export function tints(variant: Variant) {
  return paintTints(variant, (color, amount) => mix(color, variant.background, amount));
}

export function overlays(variant: Variant) {
  return paintTints(variant, alpha);
}

export function halfOverlays(variant: Variant) {
  return paintTints(variant, (color, amount) => alpha(color, 1 - Math.sqrt(1 - amount)));
}
