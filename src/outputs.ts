import { Variants } from './palette';
import { ghostty } from './targets/ghostty';
import { herdr } from './targets/herdr';
import { neovim } from './targets/neovim';
import { opencode } from './targets/opencode';
import { swatches } from './targets/swatches';
import { t3code } from './targets/t3code';
import { vim } from './targets/vim';
import { zed } from './targets/zed';

export function outputs() {
  return [
    ...Variants.flatMap((variant) => [
      ghostty(variant),
      herdr(variant),
      opencode(variant),
      swatches(variant),
      t3code(variant),
      vim(variant),
    ]),
    neovim(),
    zed(),
  ];
}
