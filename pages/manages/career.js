import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup, Fragment } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Career() {
  const { loggedIn } = useAuth();

  const [careers, setCareers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const careerResponse = await axios.get('/api/career');
    setCareers(careerResponse.data || []);
  }

  const addCareer = () => {
    setCareers([...careers, { org_name: '', team: '', role: '', occupation: '', start_date: '', end_date: '', projects: [] }]);
  }

  const addProject = (careerIndex) => {
    event.preventDefault();
    const newCareers = [...careers];
    newCareers[careerIndex].projects.push({ project_name: '', start_date: '', end_date: '', description: '' });
    setCareers(newCareers);
  }

  const removeCareer = (careerIndex) => {
    const newCareers = [...careers];
    newCareers.splice(careerIndex, 1);
    setCareers(newCareers);
  }

  const removeProject = (careerIndex, projectIndex) => {
    const newCareers = [...careers];
    newCareers[careerIndex].projects.splice(projectIndex, 1);
    setCareers(newCareers);
  }

  const handleSubmit = async () => {
    event.preventDefault();
    await axios.post('/api/career', { careers });
  }

  return (
    <Container>
      <Content>
        {!loggedIn ? (
          <IsNotSession />
        ) : (
          <ArrayContainer>
            <form>
              <fieldset>
                <legend>경력 수정 양식</legend>
                <FormGroup className='form-group'>
                  <div className='item-add'>
                    <button type='button' onClick={addCareer}>경력 추가</button>
                  </div>
                  {careers.map((career, careerIndex) => (
                    <Fragment key={`career-${careerIndex}`} className='array-career'>
                      <div className='array-career'>
                        <FieldGroup>
                          <input
                            type='text'
                            value={career.org_name}
                            placeholder='회사/단체/팀명'
                            id='org_name'
                            required
                            onChange={e => {
                              const newCareers = [...careers];
                              newCareers[careerIndex].org_name = e.target.value;
                              setCareers(newCareers);
                            }}
                          />
                          <label htmlFor='org_name'>회사/단체/팀명</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type='text'
                            value={career.team}
                            placeholder='부서/팀명'
                            id='team'
                            required
                            onChange={e => {
                              const newCareers = [...careers];
                              newCareers[careerIndex].team = e.target.value;
                              setCareers(newCareers);
                            }}
                          />
                          <label htmlFor='team'>부서/팀명</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type='text'
                            value={career.role}
                            placeholder='역할'
                            id='role'
                            required
                            onChange={e => {
                              const newCareers = [...careers];
                              newCareers[careerIndex].role = e.target.value;
                              setCareers(newCareers);
                            }}
                          />
                          <label htmlFor='role'>역할</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type='text'
                            value={career.occupation}
                            placeholder='직업/일'
                            id='occupation'
                            required
                            onChange={e => {
                              const newCareers = [...careers];
                              newCareers[careerIndex].occupation = e.target.value;
                              setCareers(newCareers);
                            }}
                          />
                          <label htmlFor='occupation'>직업/일</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type='month'
                            value={career.start_date}
                            placeholder='입사일/합류일'
                            id='start_date'
                            required
                            onChange={e => {
                              const newCareers = [...careers];
                              newCareers[careerIndex].start_date = e.target.value;
                              setCareers(newCareers);
                            }}
                          />
                          <label htmlFor='start_date'>입사일/합류일</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type='month'
                            value={career.end_date}
                            placeholder='퇴사일/만료일'
                            id='end_date'
                            onChange={e => {
                              const newCareers = [...careers];
                              newCareers[careerIndex].end_date = e.target.value;
                              setCareers(newCareers);
                            }}
                          />
                          <label htmlFor='end_date'>입사일/합류일</label>
                        </FieldGroup>
                        <button type='button' onClick={() => removeCareer(careerIndex)}>경력 삭제</button>
                      </div>
                      <div className='project-add'>
                        <button type='button' onClick={() => addProject(careerIndex)}>프로젝트 추가</button>
                      </div>
                      <div className='projects-list'>
                        {career.projects.map((project, projectIndex) => (
                          <Fragment key={`project-${projectIndex}`} className='array-projects'>
                            <FieldGroup>
                              <input
                                type='text'
                                value={project.project_name}
                                placeholder='프로젝트명'
                                id='project_name'
                                required
                                onChange={e => {
                                  const newCareers = [...careers];
                                  newCareers[careerIndex].projects[projectIndex].project_name = e.target.value;
                                  setCareers(newCareers);
                                }}
                              />
                              <label htmlFor='project_name'>프로젝트명</label>
                            </FieldGroup>
                            <FieldGroup>
                              <input
                                type='month'
                                value={project.start_date}
                                placeholder='프로젝트 시작'
                                id='start_date'
                                required
                                onChange={e => {
                                  const newCareers = [...careers];
                                  newCareers[careerIndex].projects[projectIndex].start_date = e.target.value;
                                  setCareers(newCareers);
                                }}
                              />
                              <label htmlFor='start_date'>프로젝트 시작</label>
                            </FieldGroup>
                            <FieldGroup>
                              <input
                                type='month'
                                value={project.end_date}
                                placeholder='프로젝트 종료'
                                id='end_date'
                                onChange={e => {
                                  const newCareers = [...careers];
                                  newCareers[careerIndex].projects[projectIndex].end_date = e.target.value;
                                  setCareers(newCareers);
                                }}
                              />
                              <label htmlFor='end_date'>프로젝트 종료</label>
                            </FieldGroup>
                            <FieldGroup>
                              <textarea
                                value={project.description}
                                placeholder='프로젝트 설명'
                                id='description'
                                onChange={e => {
                                  const newCareers = [...careers];
                                  newCareers[careerIndex].projects[projectIndex].description = e.target.value;
                                  setCareers(newCareers);
                                }}
                              />
                              <label htmlFor='description'>프로젝트 설명</label>
                            </FieldGroup>
                            <button onClick={() => removeProject(careerIndex, projectIndex)}>프로젝트 삭제</button>
                          </Fragment>
                        ))}
                      </div>
                    </Fragment>
                  ))}
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>경력 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
