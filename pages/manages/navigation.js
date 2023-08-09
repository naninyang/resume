import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Rem, hex, mixin, mq, rgba } from '@/styles/designSystem'
import styled from '@emotion/styled'
import { Nav } from '@/styles/manageSystem'
import { useAuth } from '@/components/hooks/authContext'
import LinkButton from '@/components/hooks/linkButton'

export default function Navigation() {
  const router = useRouter();
  const { loggedIn, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    router.push('/');
  }

  return (
    <Nav>
      <ol>
        {loggedIn ? (
          <>
            <li><LinkButton href='/manages/profile'>프로필/인적사항</LinkButton></li>
            <li><LinkButton href='/manages/military-service'>병역사항</LinkButton></li>
            <li><LinkButton href='/manages/education'>학력사항</LinkButton></li>
            <li><LinkButton href='/manages/certificate'>자격증</LinkButton></li>
            <li><LinkButton href='/manages/language'>외국어능력</LinkButton></li>
            <li><LinkButton href='/manages/award'>수상기록</LinkButton></li>
            <li><LinkButton href='/manages/skill'>보유기술</LinkButton></li>
            <li><LinkButton href='/manages/reference'>레퍼런스</LinkButton></li>
            <li><LinkButton href='/manages/activity'>대외활동</LinkButton></li>
            <li><LinkButton href='/manages/career'>경력사항</LinkButton></li>
            <li><LinkButton href='/'>이력서보기</LinkButton></li>
            <li><button type='button' onClick={handleSignOut}>로그아웃</button></li>
          </>
        ) : (
          <li><p>로그인 필요</p></li>
        )}
      </ol>
    </Nav>
  )
}
