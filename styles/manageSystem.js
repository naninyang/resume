import styled from '@emotion/styled';
import { Rem, hex, rgba } from './designSystem';

export const Container = styled.main({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'fixed linear-gradient(225deg, #CD313A 0%, #000 37.55%, #000 57.70%, #0047A0 100%)',
  height: '100vh',
})

export const Content = styled.div({
  padding: `${Rem(50)} ${Rem(25)}`,
})

export const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const FieldGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(5),
  position: 'relative',
  height: Rem(97),
  '& > input': {
    backgroundColor: hex.light,
    padding: `${Rem(18)} ${Rem(15)}`,
    borderRadius: Rem(5),
    border: `1px rgba(${rgba.light20}) solid`,
    width: '100%',
    height: Rem(60),
    fontSize: Rem(24),
    fontWeight: '700',
    lineHeight: 1,
    color: hex.dark,
    transition: 'all .15s ease-in-out,box-shadow .15s ease-in-out',
    appearance: 'none',
    '&::placeholder': {
      color: 'transparent',
    },
    '&:focus, &:not(:placeholder-shown)': {
      padding: `${Rem(28)} ${Rem(15)} ${Rem(8)}`,
      '& ~ label': {
        padding: `${Rem(8)} ${Rem(15)}`,
        transform: `scale(.5) translateY(-.${Rem(10)})`,
        fontSize: Rem(12),
        color: `rgba(${rgba.dark70})`,
      },
    },
  },
  '& > label': {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: `${Rem(18)} ${Rem(15)}`,
    pointerEvents: 'none',
    transformOrigin: '0 0',
    transition: 'all .1s ease-in-out,transform .1s ease-in-out',
    color: hex.dark,
    fontSize: Rem(24),
    fontWeight: '700',
    lineHeight: 1,
  },
  '& p': {
    display: 'flex',
    gap: Rem(2),
    alignItems: 'center',
    fontSize: Rem(12),
    fontWeight: '900',
    lineHeight: 1,
    color: hex.yellow,
    '& label': {
      color: hex.mint,
    },
  },
})

export const DefinitionGroup = styled.dl({
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(5),
  position: 'relative',
})

export const ItemGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(10),
  position: 'relative',
  height: Rem(97),
  '& dd': {
    padding: `${Rem(28)} ${Rem(15)} ${Rem(8)}`,
    borderRadius: Rem(5),
    width: '100%',
    height: Rem(60),
    fontSize: Rem(24),
    fontWeight: '700',
    lineHeight: 1,
    color: hex.light,
    transition: 'all .15s ease-in-out,box-shadow .15s ease-in-out',
    appearance: 'none',
  },
  '& dt': {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: `${Rem(8)} ${Rem(15)}`,
    pointerEvents: 'none',
    color: `rgba(${rgba.light70})`,
    fontSize: Rem(12),
    fontWeight: '700',
    lineHeight: 1,
  },
})

export const ButtonGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(15),
  '& button[type="submit"], & > a': {
    borderRadius: Rem(5),
    border: 0,
    width: '100%',
    height: Rem(70),
    backgroundColor: hex.mint,
    position: 'relative',
    fontSize: Rem(24),
    fontWeight: '700',
    color: hex.dark,
    lineHeight: 1,
  },
  '& > a': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Rem(370),
    lineHeight: Rem(70),
  }
})

export const ArrayContainer = styled.div({
  '& fieldset': {
    display: 'flex',
    flexDirection: 'column',
    gap: Rem(50),
  },
  '& .form-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: Rem(25),
  },
  '& .item-add': {
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      backgroundColor: hex.dark,
      padding: `0 ${Rem(15)}`,
      borderRadius: Rem(5),
      border: `1px rgba(${rgba.dark20}) solid`,
      width: 'auto',
      height: Rem(50),
      fontSize: Rem(16),
      lineHeight: 1,
      color: hex.light,
    },
  },
})

export const Fragment = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto',
  width: 'max-content',
  gap: Rem(15),
  '& > div': {
    width: Rem(230),
    '&:nth-of-type(3)': {
      gridColumn: 'span 2',
    },
  },
  '& button': {
    backgroundColor: hex.danger,
    padding: `0 ${Rem(15)}`,
    borderRadius: Rem(5),
    border: `1px rgba(${rgba.light20}) solid`,
    width: 'auto',
    height: Rem(60),
    fontSize: Rem(24),
    lineHeight: 1,
    color: hex.light,
  },
})

export const Util = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
})

export const SessionUtil = styled.div({
  display: 'flex',
  '& a': {
    padding: `${Rem(5)} ${Rem(10)}`,
    fontSize: Rem(14),
    fontWeight: '700',
    lineHeight: '1.42857143',
    color: hex.yellow,
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  },
})

export const FindUtil = styled.div({
  display: 'flex',
  '& a': {
    padding: `${Rem(5)} ${Rem(10)}`,
    fontSize: Rem(14),
    lineHeight: '1.42857143',
    color: hex.mint,
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  },
})
