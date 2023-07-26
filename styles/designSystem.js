import { images } from '@/assets/images';
import styled from '@emotion/styled';

export const hex = {
  Black: '#000',
  Dark: '#222',
  Charcoal: '#2D2A27',
  Ocean: '#9ab4e1',
  Primary: '#485CC1',
  Secondary: '#1EBBEF',
  Tertiary: '#005DB9',
  Info: '#5A433D',
  Success: '#80BE5B',
  Danger: '#C14848',
  Warning: '#F3B3BC',
  Light: '#F2F2F2',
  White: '#FFF',
};

export const rgba = {
  Black87: '0, 0, 0, 0.87',
  Black70: '0, 0, 0, 0.7',
  Black60: '0, 0, 0, 0.6',
  Black10: '0, 0, 0, 0.1',
  Black5: '0, 0, 0, 0.05',
  Dark95: '34, 34, 34, 0.95',
  Dark90: '34, 34, 34, 0.9',
  Dark70: '34, 34, 34, 0.7',
  Dark50: '34, 34, 34, 0.5',
  Dark30: '34, 34, 34, 0.3',
  Dark20: '34, 34, 34, 0.2',
  Light95: '242, 242, 242, 0.95',
  Light90: '242, 242, 242, 0.9',
  Light70: '242, 242, 242, 0.7',
  Light30: '242, 242, 242, 0.3',
  Light20: '242, 242, 242, 0.2',
  White87: '255, 255, 255, 0.87',
  White70: '255, 255, 255, 0.7',
  White60: '255, 255, 255, 0.6',
  White20: '255, 255, 255, 0.2',
  White10: '255, 255, 255, 0.1',
  Primary87: '72, 92, 193, 0.87',
  Primary70: '72, 92, 193, 0.7',
  Primary50: '72, 92, 193, 0.5',
  Secondary87: '30, 187, 239, 0.87',
  Secondary50: '30, 187, 239, 0.5',
  Secondary20: '30, 187, 239, 0.2',
  Danger87: '193, 72, 72, 0.87',
  Danger70: '193, 72, 72, 0.7',
  Warning87: '243, 179, 188, 0.87',
  Warning50: '243, 179, 188, 0.5',
};

export const mq = {
  minContent: `@media screen and (max-width: ${Rem(1600)})`,
}

export const ar = {
  support: `@supports not (aspect-ratio: 1)`,
};

export const mixin = {
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    '&>*': {
      flexShrink: 0,
      width: '100%',
      maxWidth: '100%',
    },
  },
  col: {
    flex: '1 0 0%',
  },
  coln: {
    flex: '0 0 auto',
  },
  colAuto: {
    flex: '0 0 auto',
    width: 'auto',
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  clearfix: {
    '&::before, &::after': {
      content: '""',
      display: 'block',
      clear: 'both',
    },
  },
  screenReaderOnly: {
    position: 'absolute',
    overflow: 'hidden',
    margin: 0,
    width: '1px',
    height: '1px',
    clip: 'rect(1px, 1px, 1px, 1px)',
  },
  visuallyHiddenFocuable: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 20,
    margin: 0,
    width: 'auto',
    height: 'auto',
    clip: 'auto',
  },
  imageRendering: {
    imageRendering: '-webkit-optimize-contrast',
    backfaceVisibility: 'hidden',
  },
};

export const Clamp = (clamp, height, lineheight) => (`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${clamp};
  max-height: ${height / 16}rem;
  line-height: ${lineheight};
`);

export function Rem(px) {
  const result = px / 16;
  return `${result}rem`;
};

export function Vw(px, width) {
  const result = px * 100 / width;
  return `${result}vw`;
}
