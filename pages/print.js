import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { useAuth } from '@/components/hooks/authContext'
import LinkButton from '@/components/hooks/linkButton';
import { Container, IsNotSession } from '@/styles/serviceSystem';
import styles from '@/styles/print.module.sass';

export default function Home() {
  const { loggedIn } = useAuth();

  const [resumeData, setResumeData] = useState('');

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/resume', { headers: { Authorization: `Bearer ${token}` } });
      setResumeData(response.data);
    } catch (error) {
      console.error('Failed to fetch resume:', error);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  function RenderDescription({ description }) {
    if (description.includes('\n')) {
      return (
        <div>
          {description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      );
    } else {
      return <div>{description}</div>;
    }
  }

  return (
    <Container className={styles['print-only']}>
      {loggedIn ? (
        <>
          <Head>
            {resumeData.username_show ?
              <title>{resumeData.username} 이력서</title>
              :
              <title>이력서</title>
            }
          </Head>
          <h1>이력서</h1>
          <blockquote>
            <p>사용하실 때는 웹브라우저의 <code>인쇄</code> 기능을 사용해 주세요. <code>Mac: command + p / xWin: ctrl + p</code></p>
            <LinkButton href='/'>이전 화면으로 이동</LinkButton>
          </blockquote>
          <section className={styles.profile}>
            <h2>인적사항</h2>
            <dl>
              {resumeData.username_show &&
                <>
                  <dt>성명</dt>
                  <dd>{resumeData.username}</dd>
                </>
              }
              {resumeData.username_show &&
                <>
                  <dt>이메일</dt>
                  <dd>{resumeData.email}</dd>
                </>
              }
              {resumeData.address &&
                <>
                  <dt>주소</dt>
                  <dd>{resumeData.address}</dd>
                </>
              }
              {resumeData.telephone &&
                <>
                  <dt>연락처</dt>
                  <dd>{resumeData.telephone}</dd>
                </>
              }
              {resumeData.veteran &&
                <>
                  <dt>보훈대상</dt>
                  <dd>{resumeData.veteran}</dd>
                </>
              }
              {resumeData.disability &&
                <>
                  <dt>장애대상</dt>
                  <dd>{resumeData.disability}</dd>
                </>
              }
            </dl>
          </section>
          {resumeData?.educations?.length > 0 && (
            <section className={styles.education}>
              <h2>학력사항</h2>
              <ul className={styles.array}>
                {resumeData?.educations?.map((education) => (
                  <li key={education.id}>
                    <p>
                      <strong>{education.school} {education.major} {education.degree} {education.stats}</strong>
                      {' '}
                      <span>{education.start_date} ~ {education.end_date}</span>
                    </p>
                    <dl>
                      <dt>분류</dt>
                      <dd>{education.category}</dd>
                    </dl>
                    {education.degree_num &&
                      <dl>
                        <dt>학위등록번호</dt>
                        <dd>{education.degree_num}</dd>
                      </dl>
                    }
                  </li>
                ))}
              </ul>
            </section>
          )}
          {resumeData?.certificates?.length > 0 && (
            <section className={styles.certificate}>
              <h2>자격증</h2>
              <dl>
                {resumeData?.certificates?.map((certificate) => (
                  <div key={certificate.id}>
                    <div>
                      <dt>자격증명</dt>
                      <dd>{certificate.certificate_name}</dd>
                    </div>
                    <div>
                      <dt>발행처</dt>
                      <dd>{certificate.organization}</dd>
                    </div>
                    <div>
                      <dt>자격증번호</dt>
                      <dd>{certificate.certificate_num}</dd>
                    </div>
                    <div>
                      <dt>발행일자</dt>
                      <dd>{certificate.issue_date}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {resumeData?.skills?.length > 0 && (
            <section className={styles.skill}>
              <h2>기술</h2>
              <dl className={styles.array}>
                {resumeData?.skills.map((skill) => (
                  <div key={skill.id}>
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
          {resumeData?.references?.length > 0 && (
            <section className={styles.reference}>
              <h2>레퍼런스</h2>
              <dl>
                {resumeData?.references?.[0].github && (
                  <>
                    <dt>깃헙</dt>
                    <dd>
                      <LinkButton href={`https://github.com/${resumeData?.references?.[0].github}`}>{`https://github.com/${resumeData?.references?.[0].github}`}</LinkButton>
                    </dd>
                  </>
                )}
                {resumeData?.references?.[0].blog && (
                  <>
                    <dt>블로그</dt>
                    <dd>
                      <LinkButton href={resumeData?.references?.[0].blog}>{resumeData?.references?.[0].blog}</LinkButton>
                    </dd>
                  </>
                )}
              </dl>
            </section>
          )}
          {resumeData?.careers?.length > 0 && (
            <section className={styles.career}>
              <h2>경력사항</h2>
              <dl>
                {resumeData?.careers?.map((career) => (
                  <div key={`career-${career.id}`}>
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
                        {career.projects.map((project) => (
                          <div key={`project-${career.id}-${project.id}`} className={styles['project-item']}>
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
