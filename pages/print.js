import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { useAuth } from '@/components/hooks/authContext'
import LinkButton from '@/components/hooks/linkButton';
import { Container, IsNotSession } from '@/styles/serviceSystem';
import styles from '@/styles/print.module.sass';

export default function Home() {
  const { loggedIn } = useAuth();

  const [userProfile, setUserProfile] = useState({});
  const [educations, setEducations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState('');
  const [blog, setBlog] = useState('');
  const [reference, serReference] = useState('');
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
      } else {
        serReference(0)
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
    <Container className={styles['print-only']}>
      {loggedIn ? (
        <>
          <Head>
            <title>{userProfile.username} 이력서</title>
          </Head>
          <h1>이력서</h1>
          <blockquote>
            <p>사용하실 때는 웹브라우저의 <code>인쇄</code> 기능을 사용해 주세요. <code>Mac: command + p / xWin: ctrl + p</code></p>
            <LinkButton href='/'>이전 화면으로 이동</LinkButton>
          </blockquote>
          <section className={styles.profile}>
            <h2>인적사항</h2>
            <dl>
              {userProfile.username_show &&
                <>
                  <dt>성명</dt>
                  <dd>{userProfile.username}</dd>
                </>
              }
              {userProfile.address &&
                <>
                  <dt>주소</dt>
                  <dd>{userProfile.address}</dd>
                </>
              }
              {userProfile.username_show &&
                <>
                  <dt>이메일</dt>
                  <dd>{userProfile.email}</dd>
                </>
              }
            </dl>
          </section>
          {educations.length > 0 && (
            <section className={styles.education}>
              <h2>학력사항</h2>
              <ul className={styles.array}>
                {educations.map((education, index) => (
                  <li key={index}>
                    <p>
                      <strong>{education.school} {education.major} {education.stats}</strong>
                      {' '}
                      <span>{education.start_date} ~ {education.end_date}</span>
                    </p>
                    <dl>
                      <dt>분류</dt>
                      <dd>{education.category}</dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {certificates.length > 0 && (
            <section className={styles.certificate}>
              <h2>자격증</h2>
              <dl>
                {certificates.map((certificate, index) => (
                  <div key={index}>
                    <div>
                      <dt>자격증명</dt>
                      <dd>{certificate.certificate_name}</dd>
                    </div>
                    <div>
                      <dt>발행처</dt>
                      <dd>{certificate.organization}</dd>
                    </div>
                    <div>
                      <dt>발행일자</dt>
                      <dd>{certificate.issue_date}</dd>
                    </div>
                    <div>
                      <dt>자격증번호</dt>
                      <dd>{certificate.certificate_num}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {skills.length > 0 && (
            <section className={styles.skill}>
              <h2>기술</h2>
              <dl className={styles.array}>
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div>
                      <dt>기술명</dt>
                      <dd>{skill.skill_name}</dd>
                    </div>
                    <div>
                      <dt>숙련도</dt>
                      <dd>
                        {skill.skill_level === '초급' && <span><i className={styles.circle} /><i /><i /></span>}
                        {skill.skill_level === '중급' && <span><i className={styles.circle} /><i className={styles.circle} /><i /></span>}
                        {skill.skill_level === '고급' && <span><i className={styles.circle} /><i className={styles.circle} /><i className={styles.circle} /></span>}
                      </dd>
                    </div>
                    <div>
                      <dt>경험</dt>
                      <dd>{skill.skill_career}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {!reference && (
            <section className={styles.reference}>
              <h2>레퍼런스</h2>
              <dl>
                {github && (
                  <>
                    <dt>깃헙</dt>
                    <dd>
                      <LinkButton href={`https://github.com/${github}`}>{`https://github.com/${github}`}</LinkButton>
                    </dd>
                  </>
                )}
                {blog && (
                  <>
                    <dt>블로그</dt>
                    <dd>
                      <LinkButton href={blog}>{blog}</LinkButton>
                    </dd>
                  </>
                )}
              </dl>
            </section>
          )}
          {careers.length > 0 && (
            <section className={styles.career}>
              <h2>경력사항</h2>
              <dl>
                {careers.map((career, careerIndex) => (
                  <div key={`career-${careerIndex}`}>
                    <div className={styles['career-item']}>
                      <dt>{career.org_name}</dt>
                      <dd>
                        <span>{career.team} {career.role}</span>
                        {' '}
                        {career.occupation}
                        <time>{career.start_date} ~ {career.end_date}</time>
                      </dd>
                    </div>
                    {career.projects.length > 0 && (
                      <div className={styles['project-list']}>
                        {career.projects.map((project, projectIndex) => (
                          <div key={`project-${projectIndex}`} className={styles['project-item']}>
                            <dt>{project.project_name}</dt>
                            <dd>
                              <time>{project.start_date} ~ {project.end_date}</time>
                              {project.description && <p>{project.description}</p>}
                            </dd>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </dl>
            </section>
          )}
        </>
      ) : (
        <IsNotSession><p>개인정보를 다루는 페이지이므로 로그인이 필요합니다</p></IsNotSession>
      )}
    </Container>
  )
}
