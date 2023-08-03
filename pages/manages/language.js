import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, DefinitionGroup, FieldGroup, FindUtil, FormGroup, ItemGroup, SessionUtil, Util } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Language() {
  const { loggedIn } = useAuth();

  const [isAdding, setIsAdding] = useState(false);

  const [language, setLanguage] = useState({
    lang_name: '',
    exam_name: '',
    point: '',
  });
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchLanguage();
  }, []);

  const fetchLanguage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/language`, { headers: { Authorization: `Bearer ${token}` } });
      setLanguages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setLanguage({
      ...language,
      [name]: value
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/language/${language.id}`, language, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('외국어능력 정보가 성공적으로 추가되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      fetchLanguage();
      setIsAdding(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (languageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/language/${languageId}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.error('외국어능력 정보가 성공적으로 삭제되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      fetchLanguage();
    } catch (error) {
      console.error(error);
    }
  };

  const [languageEdit, setFormData] = useState({ ...language });
  const [editingLanguage, setEditingLanguage] = useState(null);

  const handleEditClick = (lan) => {
    setEditingLanguage(lan.id);
    setFormData(lan);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...languageEdit,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/language/${language.id}`, languageEdit, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('외국어능력 정보가 성공적으로 수정되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setEditingLanguage(false);
      fetchLanguage();
    } catch (error) {
      console.error('Failed to update language: ', error);
    }
  };

  const handleCancelClick = () => {
    setEditingLanguage(false);
  }

  const pageTitle = '외국어능력'

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
                {languages.map((lan) => (
                  <div key={lan.id} className='item'>
                    {editingLanguage === lan.id ? (
                      <form onSubmit={handleEditSubmit}>
                        <fieldset>
                          <legend>{pageTitle} 갱신</legend>
                          <FormGroup>
                            <div>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="lang_name"
                                  id={`lang_name-${lan.id}`}
                                  value={languageEdit.lang_name}
                                  onChange={handleEditChange}
                                  placeholder="외국어명"
                                  required
                                />
                                <label htmlFor={`lang_name-${lan.id}`}>외국어명</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="exam_name"
                                  id={`exam_name-${lan.id}`}
                                  value={languageEdit.exam_name}
                                  onChange={handleEditChange}
                                  placeholder="시험명"
                                  required
                                />
                                <label htmlFor={`exam_name-${lan.id}`}>시험명</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="point"
                                  id={`point-${lan.id}`}
                                  value={languageEdit.point}
                                  onChange={handleEditChange}
                                  placeholder="점수"
                                  required
                                />
                                <label htmlFor={`point-${lan.id}`}>점수</label>
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
                              <dt>외국어명</dt>
                              <dd>
                                <span>{lan.lang_name}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>시험명</dt>
                              <dd>
                                <span>{lan.exam_name}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>점수</dt>
                              <dd>
                                <span>{lan.point}</span>
                              </dd>
                            </ItemGroup>
                          </div>
                        </DefinitionGroup>
                        <div className='item-management'>
                          <button type='button' className='edit' onClick={() => handleEditClick(lan)}>수정</button>
                          <button type='button' className='del' onClick={() => handleDelete(lan.id)}>삭제</button>
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
                    setLanguage({
                      lang_name: '',
                      exam_name: '',
                      point: '',
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
                            name="lang_name"
                            id='lang_name'
                            value={language.lang_name}
                            onChange={handleAddChange}
                            placeholder="외국어명"
                            required
                          />
                          <label htmlFor='lang_name'>외국어명</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="exam_name"
                            id="exam_name"
                            value={language.exam_name}
                            onChange={handleAddChange}
                            placeholder="시험명"
                            required
                          />
                          <label htmlFor='exam_name'>시험명</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="point"
                            id="point"
                            value={language.point}
                            onChange={handleAddChange}
                            placeholder="점수"
                            required
                          />
                          <label htmlFor='point'>점수</label>
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
