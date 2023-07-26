import React from 'react';
import styled from '@emotion/styled';
import LinkButton from '@/components/hooks/linkButton';
import { Rem, hex } from '@/styles/designSystem';

const Container = styled.div({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: Rem(100),
  '& p': {
    fontSize: Rem(24),
    fontWeight: '700',
    color: hex.light,
  },
  '& a': {
    borderRadius: Rem(5),
    border: 0,
    width: Rem(430),
    height: Rem(70),
    backgroundColor: hex.mint,
    position: 'relative',
    fontSize: Rem(24),
    fontWeight: '700',
    color: hex.dark,
    textAlign: 'center',
    lineHeight: Rem(70),
  },
})

const LinkGroup = styled.div({
  display: 'flex',
})

export default function IsSession() {
  return (
    <Container>
      <p>이미 로그인이 되어 있습니다</p>
      <LinkGroup><LinkButton href='/'>서비스 화면으로 이동</LinkButton></LinkGroup>
    </Container>
  )
}
