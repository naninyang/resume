import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, DefinitionGroup, FieldGroup, FindUtil, FormGroup, ItemGroup, SessionUtil, Util } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Award() {
  const { loggedIn } = useAuth();

  const [isAdding, setIsAdding] = useState(false);

  const [award, setAward] = useState({
    award_name: '',
    description: '',
    issue_date: '',
    organization: '',
  });
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    fetchAward();
  }, []);

  const fetchAward = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/award`, { headers: { Authorization: `Bearer ${token}` } });
      setAwards(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAward({
      ...award,
      [name]: value
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/award/${award.id}`, award, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('수상기록 정보가 성공적으로 추가되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      fetchAward();
      setIsAdding(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (awardId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/award/${awardId}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.error('수상기록 정보가 성공적으로 삭제되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      fetchAward();
    } catch (error) {
      console.error(error);
    }
  };

  const [awardEdit, setFormData] = useState({ ...award });
  const [editingAward, setEditingAward] = useState(null);

  const handleEditClick = (awa) => {
    setEditingAward(awa.id);
    setFormData(awa);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...awardEdit,
      [name]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/award/${award.id}`, awardEdit, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('수상기록 정보가 성공적으로 수정되었습니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      setEditingAward(false);
      fetchAward();
    } catch (error) {
      console.error('Failed to update award: ', error);
    }
  };

  const handleCancelClick = () => {
    setEditingAward(false);
  }

  const pageTitle = '수상기록'

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
              <strong>취득일 상관없이 추가하시면 됩니다. 이력서에서는 자동으로 취득일 자동으로 가장 오래된 취득일 기준으로 보여집니다.</strong>
            </h1>
            <div className='data-group'>
              <div className='list'>
                {awards.map((awa) => (
                  <div key={awa.id} className='item'>
                    {editingAward === awa.id ? (
                      <form onSubmit={handleEditSubmit}>
                        <fieldset>
                          <legend>{pageTitle} 갱신</legend>
                          <FormGroup>
                            <div>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="award_name"
                                  id={`award_name-${awa.id}`}
                                  value={awardEdit.award_name}
                                  onChange={handleEditChange}
                                  placeholder="수상명"
                                />
                                <label htmlFor={`award_name-${awa.id}`}>수상명</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="description"
                                  id={`description-${awa.id}`}
                                  value={awardEdit.description}
                                  onChange={handleEditChange}
                                  placeholder="수상내용"
                                />
                                <label htmlFor={`description-${awa.id}`}>수상내용</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="text"
                                  name="organization"
                                  id={`organization-${awa.id}`}
                                  value={awardEdit.organization}
                                  onChange={handleEditChange}
                                  placeholder="발행기관"
                                />
                                <label htmlFor={`organization-${awa.id}`}>발행기관</label>
                              </FieldGroup>
                              <FieldGroup>
                                <input
                                  type="date"
                                  name="issue_date"
                                  id={`issue_date-${awa.id}`}
                                  value={awardEdit.issue_date}
                                  onChange={handleEditChange}
                                  placeholder="취득일"
                                />
                                <label htmlFor={`issue_date-${awa.id}`}>취득일</label>
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
                              <dt>수상명</dt>
                              <dd>
                                <span>{awa.award_name}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>수상내용</dt>
                              <dd>
                                <span>{awa.description}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>발행기관</dt>
                              <dd>
                                <span>{awa.organization}</span>
                              </dd>
                            </ItemGroup>
                            <ItemGroup>
                              <dt>취득일</dt>
                              <dd>
                                <span>{awa.issue_date}</span>
                              </dd>
                            </ItemGroup>
                          </div>
                        </DefinitionGroup>
                        <div className='item-management'>
                          <button type='button' className='edit' onClick={() => handleEditClick(awa)}>수정</button>
                          <button type='button' className='del' onClick={() => handleDelete(awa.id)}>삭제</button>
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
                    setAward({
                      award_name: '',
                      description: '',
                      issue_date: '',
                      organization: '',
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
                            name="award_name"
                            id='award_name'
                            value={award.award_name}
                            onChange={handleAddChange}
                            placeholder="수상명"
                            required
                          />
                          <label htmlFor='award_name'>수상명</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            value={award.description}
                            onChange={handleAddChange}
                            placeholder="수상내용"
                            required
                          />
                          <label htmlFor='description'>수상내용</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="text"
                            name="organization"
                            id="organization"
                            value={award.organization}
                            onChange={handleAddChange}
                            placeholder="발행기관"
                            required
                          />
                          <label htmlFor='organization'>발행기관</label>
                        </FieldGroup>
                        <FieldGroup>
                          <input
                            type="date"
                            name="issue_date"
                            id="issue_date"
                            value={award.issue_date}
                            onChange={handleAddChange}
                            placeholder="취득일"
                            required
                          />
                          <label htmlFor='award_career'>취득일</label>
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
