import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, DefinitionGroup, FieldGroup, FindUtil, FormGroup, ItemGroup, SessionUtil, Util } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Education() {
  const { loggedIn } = useAuth();

  const [isAdding, setIsAdding] = useState(false);

  const [education, setEducation] = useState({
    school: '',
    major: '',
    category: '',
    stats: '',
    degree: '',
    degree_num: '',
    record: '',
    start_date: '',
    end_date: '',
  });
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/education`, { headers: { Authorization: `Bearer ${token}` } });
      setEducations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/education/${education.id}`, education, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('학력 정보가 성공적으로 추가되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      fetchEducation();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (educationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/education/${educationId}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.error('학력 정보가 성공적으로 삭제되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      fetchEducation();
    } catch (error) {
      console.error(error);
    }
  };

  const [educationEdit, setFormData] = useState({ ...education });
  const [editingEducation, setEditingEducation] = useState(null);

  const handleEditClick = (edu) => {
    setEditingEducation(edu.id);
    setFormData(edu);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...educationEdit,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/education/${education.id}`, educationEdit, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('학력 정보가 성공적으로 수정되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setEditingEducation(false);
      fetchEducation();
    } catch (error) {
      console.error('Failed to update education: ', error);
    }
  };

  const handleCancelClick = () => {
    setEditingEducation(false);
  }

  const pageTitle = '학력사항'

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
            <h1>{pageTitle}</h1>
            <div className='data-group'>
              <div className='list'>
                {educations.map((edu) => (
                  <div key={edu.id} className='item'>
                    {editingEducation === edu.id ? (
                      <form onSubmit={handleEditSubmit}>
                        <fieldset>
                          <legend>{pageTitle} 갱신</legend>
                          <FormGroup>
                            <div>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="school"
                                  id={`school-${edu.id}`}
                                  value={educationEdit.school}
                                  onChange={handleEditChange}
                                  placeholder="학교명"
                                  required
                                />
                                <label htmlFor={`school-${edu.id}`}>학교명</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="category"
                                  id={`category-${edu.id}`}
                                  value={educationEdit.category}
                                  onChange={handleEditChange}
                                  placeholder="분류"
                                  required
                                />
                                <label htmlFor={`category-${edu.id}`}>분류</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="major"
                                  id={`major-${edu.id}`}
                                  value={educationEdit.major}
                                  onChange={handleEditChange}
                                  placeholder="전공"
                                  required
                                />
                                <label htmlFor={`major-${edu.id}`}>전공</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="record"
                                  id={`record-${edu.id}`}
                                  value={educationEdit.record}
                                  onChange={handleEditChange}
                                  placeholder="학점"
                                />
                                <label htmlFor={`record-${edu.id}`}>학점</label>
                              </FieldGroup>
                            </div>
                            <div>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="degree"
                                  id={`degree-${edu.id}`}
                                  value={educationEdit.degree}
                                  onChange={handleEditChange}
                                  placeholder="학위명"
                                />
                                <label htmlFor={`degree-${edu.id}`}>학위명</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="degree_num"
                                  id={`degree_num-${edu.id}`}
                                  value={educationEdit.degree_num}
                                  onChange={handleEditChange}
                                  placeholder="학위등록번호"
                                />
                                <label htmlFor={`degree_num-${edu.id}`}>학위등록번호</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="stats"
                                  id={`stats-${edu.id}`}
                                  value={educationEdit.stats}
                                  onChange={handleEditChange}
                                  placeholder="상태"
                                  required
                                />
                                <label htmlFor={`stats-${edu.id}`}>상태</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="month"
                                  name="start_date"
                                  id={`start_date-${edu.id}`}
                                  value={educationEdit.start_date}
                                  onChange={handleEditChange}
                                  placeholder="입학일"
                                  required
                                />
                                <label htmlFor={`start_date-${edu.id}`}>입학일</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="month"
                                  name="end_date"
                                  id={`end_date-${edu.id}`}
                                  value={educationEdit.end_date}
                                  onChange={handleEditChange}
                                  placeholder="졸업일"
                                />
                                <label htmlFor={`end_date-${edu.id}`}>졸업일</label>
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
                              <dt>학교명</dt>
                              <dd>
                                <span>{edu.school}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>분류</dt>
                              <dd>
                                <span>{edu.category}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>전공</dt>
                              <dd>
                                <span>{edu.major}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>학점</dt>
                              <dd>
                                <span>{edu.record}</span>
                              </dd>
                            </ItemGroup>
                          </div>
                          <div>
                            <ItemGroup>
                              <dt>학위명</dt>
                              <dd>
                                <span>{edu.degree}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>학위등록번호</dt>
                              <dd>
                                <span>{edu.degree_num}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>상태</dt>
                              <dd>
                                <span>{edu.stats}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>입학일</dt>
                              <dd>
                                <span>{edu.start_date}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>졸업일</dt>
                              <dd>
                                <span>{edu.end_date}</span>
                              </dd>
                            </ItemGroup>
                          </div>
                        </DefinitionGroup>
                        <div className='item-management'>
                          <button type='button' className='edit' onClick={() => handleEditClick(edu)}>수정</button>
                          <button type='button' className='del' onClick={() => handleDelete(edu.id)}>삭제</button>
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
                    setEducation({
                      school: '',
                      major: '',
                      category: '',
                      stats: '',
                      degree: '',
                      degree_num: '',
                      record: '',
                      start_date: '',
                      end_date: ''
                    })
                  }}>
                    {pageTitle} 추가
                  </button>
                </ButtonGroup>
              )}
              {isAdding && (
                <form onSubmit={handleAddSubmit}>
                  <fieldset>
                    <legend>{pageTitle} 추가</legend>
                    <FormGroup>
                      <div>
                        <FieldGroup>
                          <input
                            type="text"
                            name="school"
                            id='school'
                            value={education.school}
                            onChange={handleAddChange}
                            placeholder="학교명"
                            required
                          />
                          <label htmlFor='school'>학교명</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="category"
                            id="category"
                            value={education.category}
                            onChange={handleAddChange}
                            placeholder="분류"
                            required
                          />
                          <label htmlFor='category'>분류</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="major"
                            id="major"
                            value={education.major}
                            onChange={handleAddChange}
                            placeholder="전공"
                            required
                          />
                          <label htmlFor='major'>전공</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="record"
                            id="record"
                            value={education.record}
                            onChange={handleAddChange}
                            placeholder="학점"
                          />
                          <label htmlFor='record'>학점</label>
                        </FieldGroup>
                      </div>
                      <div>
                        <FieldGroup>
                          <input
                            type="text"
                            name="degree"
                            id="degree"
                            value={education.degree}
                            onChange={handleAddChange}
                            placeholder="학위명"
                          />
                          <label htmlFor='degree'>학위명</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="degree_num"
                            id="degree_num"
                            value={education.degree_num}
                            onChange={handleAddChange}
                            placeholder="학위등록번호"
                          />
                          <label htmlFor='degree_num'>학위등록번호</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="stats"
                            id="stats"
                            value={education.stats}
                            onChange={handleAddChange}
                            placeholder="상태"
                            required
                          />
                          <label htmlFor='stats'>상태</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="month"
                            name="start_date"
                            id="start_date"
                            value={education.start_date}
                            onChange={handleAddChange}
                            placeholder="입학일"
                            required
                          />
                          <label htmlFor='start_date'>입학일</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="month"
                            name="end_date"
                            id="end_date"
                            value={education.end_date}
                            onChange={handleAddChange}
                            placeholder="졸업일"
                          />
                          <label htmlFor='end_date'>졸업일</label>
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
