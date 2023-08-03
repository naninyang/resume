import styled from '@emotion/styled';
import { Rem, hex, mixin, rgba } from './designSystem';

export const ManagementPage = styled.div({
  display: 'flex',
  flexDirection: 'column',
  background: 'fixed linear-gradient(225deg, #CD313A 0%, #000 37.55%, #000 57.70%, #0047A0 100%)',
  minHeight: '100vh',
})

export const Nav = styled.nav({
  flexFlow: 1,
  display: 'flex',
  justifyContent: 'center',
  backdropFilter: 'saturate(1.8) blur(20px)',
  backgroundColor: 'rgba(22, 22, 23, 0.8)',
  height: Rem(52),
  '& ol': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  '& li': {
    '& p': {
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${Rem(25)}`,
      height: '100%',
      fontSize: Rem(16),
      color: hex.yellow,
    },
  },
  '& a, & button': {
    padding: `0 ${Rem(25)}`,
    height: '100%',
    fontSize: Rem(16),
    color: hex.light,
  },
  '& a': {
    display: 'flex',
    alignItems: 'center',
  },
  '& button': {
    backgroundColor: 'transparent',
  },
})

export const Container = styled.main({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
})

export const Content = styled.div({
  padding: `${Rem(50)} ${Rem(25)}`,
})

export const ManagementContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(50),
  '& h1': {
    fontSize: Rem(32),
    fontWeight: '900',
    color: hex.light,
  },
})

export const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  '& > div': {
    display: 'flex',
    gap: Rem(15),
    '& > div': {
      ...mixin.col,
    },
  },
})

export const FieldGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(5),
  position: 'relative',
  height: Rem(97),
  '& > input': {
    height: Rem(60),
  },
  '& > textarea': {
    height: Rem(270),
  },
  '& > input, & > textarea': {
    backgroundColor: hex.light,
    padding: `${Rem(18)} ${Rem(15)}`,
    borderRadius: Rem(5),
    border: `1px rgba(${rgba.light20}) solid`,
    width: '100%',
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
  width: `calc(100vw - ${Rem(50)})`,
  '& > div': {
    display: 'flex',
    gap: Rem(15),
  },
})

export const ItemGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(10),
  ...mixin.col,
  position: 'relative',
  height: Rem(97),
  '& dt, & dd': {
    whiteSpace: 'nowrap',
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
  '& dd': {
    display: 'block',
    padding: `${Rem(28)} ${Rem(15)} ${Rem(8)}`,
    borderRadius: Rem(5),
    width: '100%',
    height: Rem(60),
    fontWeight: '700',
    lineHeight: 1,
    appearance: 'none',
    position: 'relative',
    '& span': {
      fontSize: Rem(24),
      color: hex.light,
    },
    '& p': {
      position: 'absolute',
      bottom: Rem(-15),
      left: Rem(15),
      fontSize: Rem(12),
      fontWeight: '900',
      color: hex.yellow,
    },
  },
})

export const ButtonGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(15),
  '& > button, & > a': {
    padding: `0 ${Rem(35)}`,
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
  display: 'flex',
  flexDirection: 'column',
  gap: Rem(50),
  '& h1': {
    fontSize: Rem(32),
    fontWeight: '900',
    color: hex.light,
  },
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
  '& .data-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: Rem(50),
    '& .list': {
      display: 'flex',
      flexDirection: 'column',
      gap: Rem(15),
      border: `${Rem(1)} solid ${hex.light}`,
      borderRight: 0,
      borderLeft: 0,
      '& .item': {
        position: 'relative',
        paddingTop: Rem(25),
        borderTop: `${Rem(1)} solid ${hex.light}`,
        '&:first-of-type': {
          borderTop: 0,
        },
        '& .item-management': {
          display: 'flex',
          flexDirection: 'column',
          gap: Rem(15),
          position: 'absolute',
          top: Rem(15),
          right: 0,
          '& button': {
            borderRadius: Rem(2),
            width: Rem(50),
            height: Rem(30),
            fontSize: Rem(16),
            fontWeight: '700',
            lineHeight: 1,
            '&.edit': {
              backgroundColor: hex.mint,
              color: hex.dark,
            },
            '&.del': {
              backgroundColor: hex.danger,
              color: hex.light,
            },
          },
        },
      },
    },
  },
})

export const Fragment = styled.div({
  display: 'grid',
  width: 'max-content',
  gap: Rem(15),
  '&.array-education': {
    gridTemplateColumns: 'auto auto auto auto',
    '& > div': {
      width: Rem(230),
      '&:nth-of-type(3)': {
        gridColumn: 'span 2',
      },
    },
  },
  '&.array-certificate': {
    gridTemplateColumns: 'auto auto auto',
    '& > div': {
      width: Rem(230),
      '&:nth-of-type(2)': {
        gridColumn: 'span 2',
      },
    },
  },
  '&.array-skill': {
    gridTemplateColumns: 'auto auto auto auto',
    '& > div': {
      width: Rem(230),
    },
  },
  '&.array-career': {
    display: 'block',
    '& .array-career': {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      gap: Rem(15),
      '& > div': {
        width: Rem(230),
        '&:nth-of-type(3)': {
          gridColumn: 'span 2',
        },
      },
    },
    '& .project-add': {
      display: 'flex',
      justifyContent: 'flex-end',
      '& button': {
        backgroundColor: hex.yellow,
        padding: `0 ${Rem(15)}`,
        borderRadius: Rem(5),
        border: `1px rgba(${rgba.dark20}) solid`,
        width: 'auto',
        height: Rem(50),
        fontSize: Rem(16),
        fontWeight: '700',
        lineHeight: 1,
        color: hex.dark,
      },
    },
  },
  '&.array-projects': {
    gridTemplateColumns: 'auto auto auto auto',
    '& > div': {
      width: Rem(230),
      '&:last-of-type': {
        gridColumn: 'span 3',
        width: '100%',
      },
    },
  },
  '& .projects-list': {
    display: 'flex',
    flexDirection: 'column',
    gap: Rem(50),
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
  '& button': {
    background: 'none',
  },
  '& a, & button': {
    padding: `${Rem(5)} ${Rem(10)}`,
    fontSize: Rem(14),
    lineHeight: '1.42857143',
    color: hex.mint,
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  },
})
