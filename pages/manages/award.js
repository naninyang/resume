import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup, Fragment } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Award() {
  const { loggedIn } = useAuth();

  const [awards, setAwards] = useState([]);
  const [newAward, setNewAward] = useState({
    award_name: '',
    description: '',
    issue_date: '',
    organization: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setAwards((prevAwards) => {
      const updatedAwards = [...prevAwards];
      updatedAwards[index] = {
        ...updatedAwards[index],
        [name]: value,
      };
      return updatedAwards;
    });
  };

  const handleAddAward = () => {
    setAwards((prevAwards) => [...prevAwards, newAward]);
    setNewAward({
      award_name: '',
      description: '',
      issue_date: '',
      organization: '',
    });
  };

  const handleDeleteAward = async (index) => {
    try {
      const award = awards[index];
      if (award.id) {
        await axios.delete(`/api/award/${award.id}`);
      }
      setAwards((prevAwards) =>
        prevAwards.filter((_, idx) => idx !== index)
      );
      toast.success('보유기술 정보가 성공적으로 삭제되었습니다.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Failed to delete award:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/api/award', awards);
      console.log('Awards saved successfully:', response.data);
      console.log('response: ', response)

      if (response.status === 200) {
        toast.success('보유기술 업데이트에 성공했습니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Failed to save awards:', error);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await axios.get('/api/award');
      setAwards(response.data);
    } catch (error) {
      console.error('Failed to fetch awards:', error);
    }
  };

  return (
    <Container>
      <Content>
        {!loggedIn ? (
          <IsNotSession />
        ) : (
          <ArrayContainer>
            <form>
              <fieldset>
                <legend>수상기록 수정 양식</legend>
                <FormGroup className='form-group'>
                  <div className='item-add'>
                    <button type="button" onClick={handleAddAward}>수상기록 추가</button>
                  </div>
                  {awards.map((award, index) => (
                    <Fragment key={index} className='array-award'>
                      <FieldGroup>
                        <input
                          type="text"
                          name="award_name"
                          id='award_name'
                          value={award.award_name}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="수상명"
                          required
                        />
                        <label htmlFor='award_name'>수상명</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="description"
                          id='description'
                          value={award.description}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="수상내용"
                          required
                        />
                        <label htmlFor='description'>수상내용</label>
                        <p>초급, 중급, 고급...</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="date"
                          name="issue_date"
                          id='issue_date'
                          value={award.issue_date}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="취득일"
                          required
                        />
                        <label htmlFor='issue_date'>취득일</label>
                        <p>1년 미만, 2년 이상, 5년 이상...</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="organization"
                          id='organization'
                          value={award.organization}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="발행기관"
                          required
                        />
                        <label htmlFor='organization'>발행기관</label>
                        <p>1년 미만, 2년 이상, 5년 이상...</p>
                      </FieldGroup>
                      <button type="button" onClick={() => handleDeleteAward(index)}>삭제</button>
                    </Fragment>
                  ))}
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>수상기록 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
