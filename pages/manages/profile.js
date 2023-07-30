import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import axios from 'axios';
import { useAuth } from '@/components/hooks/authContext'
import { ButtonGroup, Container, Content, DefinitionGroup, ItemGroup } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';
import { ProfileContainer } from '@/styles/sectionSystem';
import LinkButton from '@/components/hooks/linkButton';

export default function Profile() {
  const { loggedIn } = useAuth();

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/profile`, { headers: { Authorization: `Bearer ${token}` } });
      setUserProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  return (
    <Container>
      <Content>
        {!loggedIn ? (
          <IsNotSession />
        ) : (
          <ProfileContainer>
            <DefinitionGroup>
              <ItemGroup>
                <dt>
                  이름
                  - {userProfile.username_show ? '이력서 이름 공개' : '이력서 이름 미공개'}
                </dt>
                <dd>{userProfile.username}</dd>
              </ItemGroup>
              <ItemGroup>
                <dt>
                  이메일
                  - {userProfile.email_show ? '이력서 이메일 공개' : '이력서 이메일 미공개'}
                </dt>
                <dd>{userProfile.email}</dd>
              </ItemGroup>
              <ItemGroup>
                <dt>
                  주소
                  {' '}
                  {userProfile.address && '- 이력서에 공개하고 싶지 않으면 주소를 지우세요'}
                </dt>
                <dd>{userProfile.address ? userProfile.address : '주소 미등록'}</dd>
              </ItemGroup>
              <ItemGroup>
                <dt>
                  연락처
                  {' '}
                  {userProfile.telephone && '- 이력서에 공개하고 싶지 않으면 연락처를 지우세요'}
                </dt>
                <dd>{userProfile.telephone ? userProfile.telephone : '연락처 미등록'}</dd>
              </ItemGroup>
            </DefinitionGroup>
            <ButtonGroup>
              <LinkButton href='/manages/profile-edit'>프로필 업데이트하러 가기</LinkButton>
            </ButtonGroup>
          </ProfileContainer>
        )}
      </Content>
    </Container>
  );
}
