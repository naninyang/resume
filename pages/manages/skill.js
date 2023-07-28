import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup, Fragment } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Skill() {
  const { loggedIn } = useAuth();

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    skill_name: '',
    skill_level: '',
    skill_career: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [name]: value,
      };
      return updatedSkills;
    });
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, newSkill]);
    setNewSkill({
      skill_name: '',
      skill_level: '',
      skill_career: '',
    });
  };

  const handleDeleteSkill = (index) => {
    setSkills((prevSkills) =>
      prevSkills.filter((_, idx) => idx !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/api/skill', skills);
      console.log('Skills saved successfully:', response.data);
      console.log('response: ', response)

      if (response.status === 200) {
        toast.success('보유기술 업데이트에 성공했습니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Failed to save skills:', error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skill');
      setSkills(response.data);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
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
                <legend>보유기술 수정 양식</legend>
                <FormGroup className='form-group'>
                  <div className='item-add'>
                    <button type="button" onClick={handleAddSkill}>보유기술 추가</button>
                  </div>
                  {skills.map((skill, index) => (
                    <Fragment key={index} className='array-skill'>
                      <FieldGroup>
                        <input
                          type="text"
                          name="skill_name"
                          id='skill_name'
                          value={skill.skill_name}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="기술명"
                          required
                        />
                        <label htmlFor='skill_name'>기술명</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="skill_level"
                          id='skill_level'
                          value={skill.skill_level}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="숙련도"
                          required
                        />
                        <label htmlFor='skill_level'>숙련도</label>
                        <p>초급, 중급, 고급...</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="skill_career"
                          id='skill_career'
                          value={skill.skill_career}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="경험"
                          required
                        />
                        <label htmlFor='skill_career'>경험</label>
                        <p>1년 미만, 2년 이상, 5년 이상...</p>
                      </FieldGroup>
                      <button type="button" onClick={() => handleDeleteSkill(index)}>삭제</button>
                    </Fragment>
                  ))}
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>보유기술 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
