import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import axios from 'axios';
import { useAuth } from '@/components/hooks/authContext'
import { ProfileContainer } from '@/styles/sectionSystem';
import LinkButton from '@/components/hooks/linkButton';
import { Container, Fragment, IsNotSession } from '@/styles/serviceSystem';

export default function Home() {
  const { loggedIn } = useAuth();

  const [userProfile, setUserProfile] = useState({});
  const [educations, setEducations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState('');
  const [blog, setBlog] = useState('');
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchEducations();
    fetchCertificates();
    fetchSkills();
    fetchReferences();
    fetchData();
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

  const fetchEducations = async () => {
    try {
      const response = await axios.get('/api/education');
      setEducations(response.data);
    } catch (error) {
      console.error('Failed to fetch educations:', error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('/api/certificate');
      setCertificates(response.data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skill');
      setSkills(response.data);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };

  const fetchReferences = async () => {
    try {
      const response = await axios.get('/api/reference');
      const references = response.data;
      if (references.length > 0) {
        setGithub(references[0].github);
        setBlog(references[0].blog);
      }
    } catch (error) {
      console.error('Failed to fetch references:', error);
    }
  };

  async function fetchData() {
    const careerResponse = await axios.get('/api/career');
    setCareers(careerResponse.data || []);
  }

  return (
    <Container className='css-0'>
      {loggedIn ? (
        <>
          <h1>이력서 정보</h1>
          <blockquote>
            <p>프린트는 프린트 전용 화면으로 이동하신 뒤에 프린트 해주세요.</p>
            <LinkButton href='/print'>프린트 화면으로 이동</LinkButton>
          </blockquote>
          <section>
            <h2>인적사항</h2>
            <dl>
              <dt>성명</dt>
              <dd>
                {userProfile.username}
                {' '}
                {!userProfile.username_show && <strong>프린트 할 때는 공개되지 않습니다</strong>}
              </dd>
              <dt>주소</dt>
              <dd>
                {userProfile.address ? userProfile.address : <strong>주소를 입력하지 않아 프린트 할 때 공개되지 않습니다</strong>}
              </dd>
              <dt>이메일</dt>
              <dd>
                {userProfile.email}
                {' '}
                {!userProfile.email_show && <strong>프린트 할 때는 공개되지 않습니다</strong>}
              </dd>
            </dl>
          </section>
          <section>
            <h2>학력사항</h2>
            {educations.length > 0 ? (
              <dl className='array'>
                {educations.map((education, index) => (
                  <Fragment key={index}>
                    <dt>학교명</dt>
                    <dd>{education.school}</dd>
                    <dt>전공</dt>
                    <dd>{education.category}</dd>
                    <dt>분류</dt>
                    <dd>{education.major}</dd>
                    <dt>상태</dt>
                    <dd>{education.stats}</dd>
                    <dt>입학일</dt>
                    <dd>{education.start_date}</dd>
                    <dt>졸업일</dt>
                    <dd>{education.end_date}</dd>
                  </Fragment>
                ))}
              </dl>
            ) : (
              <p>아직 학력사항을 등록하지 않으셨습니다</p>
            )}
          </section>
          <section>
            <h2>자격증</h2>
            {certificates.length > 0 ? (
              <dl className='array'>
                {certificates.map((certificate, index) => (
                  <Fragment key={index}>
                    <dt>자격증명</dt>
                    <dd>{certificate.certificate_name}</dd>
                    <dt>발행처</dt>
                    <dd>{certificate.organization}</dd>
                    <dt>발행일자</dt>
                    <dd>{certificate.issue_date}</dd>
                    <dt>자격증번호</dt>
                    <dd>{certificate.certificate_num}</dd>
                  </Fragment>
                ))}
              </dl>
            ) : (
              <p>아직 자격증을 등록하지 않으셨습니다</p>
            )}
          </section>
          <section>
            <h2>기술</h2>
            {skills.length > 0 ? (
              <dl className='array'>
                {skills.map((skill, index) => (
                  <Fragment key={index}>
                    <dt>기술명</dt>
                    <dd>{skill.skill_name}</dd>
                    <dt>숙련도</dt>
                    <dd>{skill.skill_level}</dd>
                    <dt>경험</dt>
                    <dd>{skill.skill_career}</dd>
                  </Fragment>
                ))}
              </dl>
            ) : (
              <p>아직 기술을 등록하지 않으셨습니다</p>
            )}
          </section>
          <section>
            <h2>레퍼런스</h2>
            <dl>
              <dt>깃헙</dt>
              <dd>
                {github ? (
                  <LinkButton href={`https://github.com/${github}`}>{`https://github.com/${github}`}</LinkButton>
                ) : (
                  <p>아직 Github 계정 이름을 등록하지 않으셨습니다</p>
                )}
              </dd>
              <dt>블로그</dt>
              <dd>
                {blog ? (
                  <LinkButton href={blog}>{blog}</LinkButton>
                ) : (
                  <p>아직 블로그 주소를 등록하지 않으셨습니다</p>
                )}
              </dd>
            </dl>
          </section>
          <section>
            <h2>경력사항</h2>
            {careers.length > 0 ? (
              <dl className='array'>
                {careers.map((career, careerIndex) => (
                  <Fragment key={`career-${careerIndex}`} className='array'>
                    <div className='array'>
                      <dt>회사/단체/팀명</dt>
                      <dd>{career.org_name}</dd>
                      <dt>부서/팀명</dt>
                      <dd>{career.team}</dd>
                      <dt>역할</dt>
                      <dd>{career.role}</dd>
                      <dt>직업/일</dt>
                      <dd>{career.occupation}</dd>
                      <dt>입사일/합류일</dt>
                      <dd>{career.start_date}</dd>
                      <dt>퇴사일/만료일</dt>
                      <dd>{career.end_date}</dd>
                    </div>
                    {career.projects.length > 0 && (
                      <div className='projects-list'>
                        {career.projects.map((project, projectIndex) => (
                          <Fragment key={`project-${projectIndex}`}>
                            <dt>프로젝트명</dt>
                            <dd>{project.project_name}</dd>
                            <dt>프로젝트 시작일</dt>
                            <dd>{project.start_date}</dd>
                            <dt>프로젝트 종료</dt>
                            <dd>{project.end_date}</dd>
                            <dt>프로젝트 설명</dt>
                            <dd>{project.description ? project.description : <p><strong>설명이 없습니다</strong></p>}</dd>
                          </Fragment>
                        ))}
                      </div>
                    )}
                  </Fragment>
                ))}
              </dl>
            ) : (
              <p>아직 경력사항을 등록하지 않으셨습니다</p>
            )}
          </section>
        </>
      ) : (
        <IsNotSession><p>개인정보를 다루는 페이지이므로 로그인이 필요합니다</p></IsNotSession>
      )}
    </Container>
  )
}
