import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup, Fragment } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Education() {
  const { loggedIn } = useAuth();

  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState({
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

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setEducations((prevEducations) => {
      const updatedEducations = [...prevEducations];
      updatedEducations[index] = {
        ...updatedEducations[index],
        [name]: value,
      };
      return updatedEducations;
    });
  };

  const handleAddEducation = () => {
    setEducations((prevEducations) => [...prevEducations, newEducation]);
    setNewEducation({
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
  };

  const handleDeleteEducation = async (index) => {
    try {
      const education = educations[index];
      if (education.id) {
        await axios.delete(`/api/education/${education.id}`);
      }
      setEducations((prevEducations) =>
        prevEducations.filter((_, idx) => idx !== index)
      );
      toast.success('학력 정보가 성공적으로 삭제되었습니다.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Failed to delete education:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/api/education', educations);
      if (response.status === 200) {
        toast.success('학력 업데이트에 성공했습니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Failed to save educations:', error);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await axios.get('/api/education');
      const data = response.data.map(education => ({
        ...education,
        school: education.school || '',
        major: education.major || '',
        category: education.category || '',
        stats: education.stats || '',
        degree: education.degree || '',
        degree_num: education.degree_num || '',
        record: education.record || '',
        start_date: education.start_date || '',
        end_date: education.end_date || '',
      }));
      setEducations(data);
    } catch (error) {
      console.error('Failed to fetch educations:', error);
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
                <legend>학력 수정 양식</legend>
                <FormGroup className='form-group'>
                  <div className='item-add'>
                    <button type="button" onClick={handleAddEducation}>학력 추가</button>
                  </div>
                  {educations.map((education, index) => (
                    <Fragment key={index} className='array-education'>
                      <FieldGroup>
                        <input
                          type="text"
                          name="school"
                          id='school'
                          value={education.school}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="학교명"
                          required
                        />
                        <label htmlFor='school'>학교명</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="major"
                          id='major'
                          value={education.major}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="전공"
                          required
                        />
                        <label htmlFor='major'>전공</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="category"
                          id='category'
                          value={education.category}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="분류"
                          required
                        />
                        <label htmlFor='category'>분류</label>
                        <p>특성화 고등학교, 전문대학 등</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="stats"
                          id='stats'
                          value={education.stats}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="상태"
                          required
                        />
                        <label htmlFor='stats'>상태</label>
                        <p>재학 중, 졸업, 휴학 중, 중퇴 등</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="degree"
                          id='degree'
                          value={education.degree}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="학위"
                        />
                        <label htmlFor='degree'>학위</label>
                        <p>석사, 학사, 박사 등</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="degree_num"
                          id='degree_num'
                          value={education.degree_num}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="학위등록번호"
                        />
                        <label htmlFor='degree_num'>학위등록번호</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="record"
                          id='record'
                          value={education.record}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="성적"
                        />
                        <label htmlFor='record'>성적</label>
                        <p>점수</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="month"
                          name="start_date"
                          id='start_date'
                          value={education.start_date}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="입학일"
                          required
                        />
                        <label htmlFor='start_date'>입학일</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="month"
                          name="end_date"
                          id='end_date'
                          value={education.end_date}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="졸업일"
                        />
                        <label htmlFor='end_date'>졸업일</label>
                        <p>재학 중, 휴학 중, 중퇴인 경우 비워두세요</p>
                      </FieldGroup>
                      <button type="button" onClick={() => handleDeleteEducation(index)}>삭제</button>
                    </Fragment>
                  ))}
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>학력 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
