import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, DefinitionGroup, FieldGroup, FindUtil, FormGroup, ItemGroup, SessionUtil, Util } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Skill() {
  const { loggedIn } = useAuth();

  const [isAdding, setIsAdding] = useState(false);

  const [skill, setSkill] = useState({
    skill_name: '',
    skill_level: '',
    skill_career: '',
  });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkill();
  }, []);

  const fetchSkill = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/skill`, { headers: { Authorization: `Bearer ${token}` } });
      setSkills(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setSkill({
      ...skill,
      [name]: value
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/skill/${skill.id}`, skill, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('보유기술 정보가 성공적으로 추가되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      fetchSkill();
      setIsAdding(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (skillId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/skill/${skillId}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.error('보유기술 정보가 성공적으로 삭제되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      fetchSkill();
    } catch (error) {
      console.error(error);
    }
  };

  const [skillEdit, setFormData] = useState({ ...skill });
  const [editingSkill, setEditingSkill] = useState(null);

  const handleEditClick = (ski) => {
    setEditingSkill(ski.id);
    setFormData(ski);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...skillEdit,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/skill/${skill.id}`, skillEdit, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('보유기술 정보가 성공적으로 수정되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setEditingSkill(false);
      fetchSkill();
    } catch (error) {
      console.error('Failed to update skill: ', error);
    }
  };

  const handleCancelClick = () => {
    setEditingSkill(false);
  }

  const careerDescription = (value) => {
    switch (value) {
      case 1:
        return '1년 미만';
      case 2:
        return '1년 이상 3년 미만';
      case 3:
        return '3년 이상 5년 미만';
      case 4:
        return '5년 이상 10년 미만';
      case 5:
        return '10년 이상';
      default:
        return '경험 미선택';
    }
  };

  const pageTitle = '보유기술'

  return (
    <Container>
      <Content>
        {!loggedIn ? (
          <IsNotSession />
        ) : (
          <ArrayContainer>
            <Head>
              <title>레주메 {pageTitle}</title>
            </Head>
            <h1>
              {pageTitle}
              {' '}
              <strong>기술명 상관없이 추가하시면 됩니다. 이력서에서는 자동으로 경험 기준 내림차순으로 보여집니다. (동일한 경우 기술명 오름차순 기준)</strong>
            </h1>
            <div className='data-group'>
              <div className='list'>
                {skills.map((ski) => (
                  <div key={ski.id} className='item'>
                    {editingSkill === ski.id ? (
                      <form onSubmit={handleEditSubmit}>
                        <fieldset>
                          <legend>{pageTitle} 갱신</legend>
                          <FormGroup>
                            <div>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="skill_name"
                                  id={`skill_name-${ski.id}`}
                                  value={skillEdit.skill_name}
                                  onChange={handleEditChange}
                                  placeholder="기술명"
                                  required
                                />
                                <label htmlFor={`skill_name-${ski.id}`}>기술명</label>
                              </FieldGroup>
                              <FieldGroup>
                                <select
                                  type="text"
                                  name="skill_level"
                                  id={`skill_level-${ski.id}`}
                                  value={skillEdit.skill_level}
                                  onChange={handleEditChange}
                                  defaultValue=''
                                  required
                                >
                                  <option value='' disabled hidden>숙련도</option>
                                  <option value='초급'>초급</option>
                                  <option value='중급'>중급</option>
                                  <option value='고급'>고급</option>
                                  <option value='특급'>특급</option>
                                </select>
                                <label htmlFor={`skill_level-${ski.id}`}>숙련도</label>
                              </FieldGroup>
                              <FieldGroup>
                                <select
                                  type="text"
                                  name="skill_career"
                                  id={`skill_career-${ski.id}`}
                                  value={skillEdit.skill_career}
                                  onChange={handleEditChange}
                                  defaultValue=''
                                  required
                                >
                                  <option value='' disabled hidden>경험</option>
                                  <option value='1'>1년 미만</option>
                                  <option value='2'>1년 이상 3년 미만</option>
                                  <option value='3'>3년 이상 5년 미만</option>
                                  <option value='4'>5년 이상 10년 미만</option>
                                  <option value='5'>10년 이상</option>
                                </select>
                                <label htmlFor={`skill_career-${ski.id}`}>경험</label>
                              </FieldGroup>
                            </div>
                          </FormGroup>
                          <ButtonGroup>
                            <button type="submit">{pageTitle} 갱신</button>
                            <Util>
                              <SessionUtil />
                              <FindUtil>
                                <button type='button' onClick={handleCancelClick}>취소하기</button>
                              </FindUtil>
                            </Util>
                          </ButtonGroup>
                        </fieldset>
                      </form>
                    ) : (
                      <div className='view'>
                        <DefinitionGroup>
                          <div>
                            <ItemGroup>
                              <dt>기술명</dt>
                              <dd>
                                <span>{ski.skill_name}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>숙련도</dt>
                              <dd>
                                <span>{ski.skill_level}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>경험</dt>
                              <dd>
                                <span>{careerDescription(ski.skill_career)}</span>
                              </dd>
                            </ItemGroup>
                          </div>
                        </DefinitionGroup>
                        <div className='item-management'>
                          <button type='button' className='edit' onClick={() => handleEditClick(ski)}>수정</button>
                          <button type='button' className='del' onClick={() => handleDelete(ski.id)}>삭제</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {!isAdding && (
                <ButtonGroup>
                  <button type='button' onClick={() => {
                    setIsAdding(true);
                    setSkill({
                      skill_name: '',
                      skill_level: '',
                      skill_career: '',
                    })
                  }}>
                    {pageTitle} 추가
                  </button>
                </ButtonGroup>
              )}
              {isAdding && (
                <form onSubmit={handleAddSubmit}>
                  <fieldset>
                    <legend>{pageTitle} 갱신</legend>
                    <FormGroup>
                      <div>
                        <FieldGroup>
                          <input
                            type="text"
                            name="skill_name"
                            id='skill_name'
                            value={skill.skill_name}
                            onChange={handleAddChange}
                            placeholder="기술명"
                            required
                          />
                          <label htmlFor='skill_name'>기술명</label>
                        </FieldGroup>
                        <FieldGroup>
                          <select
                            type="text"
                            name="skill_level"
                            id="skill_level"
                            value={skill.skill_level}
                            onChange={handleAddChange}
                            defaultValue=''
                            required
                          >
                            <option value='' disabled hidden>숙련도</option>
                            <option value='초급'>초급</option>
                            <option value='중급'>중급</option>
                            <option value='고급'>고급</option>
                            <option value='특급'>특급</option>
                          </select>
                          <label htmlFor='skill_level'>숙련도</label>
                        </FieldGroup>
                        <FieldGroup>
                          <select
                            type="text"
                            name="skill_career"
                            id="skill_career"
                            value={skill.skill_career}
                            onChange={handleAddChange}
                            defaultValue=''
                            required
                          >
                            <option value='' disabled hidden>경험</option>
                            <option value='1'>1년 미만</option>
                            <option value='2'>1년 이상 3년 미만</option>
                            <option value='3'>3년 이상 5년 미만</option>
                            <option value='4'>5년 이상 10년 미만</option>
                            <option value='5'>10년 이상</option>
                          </select>
                          <label htmlFor='skill_career'>경험</label>
                        </FieldGroup>
                      </div>
                    </FormGroup>
                    <ButtonGroup>
                      <button type="submit">{pageTitle} 추가</button>
                      <Util>
                        <SessionUtil />
                        <FindUtil>
                          <button type='button' onClick={() => { setIsAdding(false) }}>취소하기</button>
                        </FindUtil>
                      </Util>
                    </ButtonGroup>
                  </fieldset>
                </form>
              )}
            </div>
          </ArrayContainer>
        )}
      </Content>
    </Container >
  );
}
