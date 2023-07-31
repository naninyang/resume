import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup, Fragment } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Language() {
  const { loggedIn } = useAuth();

  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState({
    lang_name: '',
    exam_name: '',
    point: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages[index] = {
        ...updatedLanguages[index],
        [name]: value,
      };
      return updatedLanguages;
    });
  };

  const handleAddLanguage = () => {
    setLanguages((prevLanguages) => [...prevLanguages, newLanguage]);
    setNewLanguage({
      lang_name: '',
      exam_name: '',
      point: '',
    });
  };

  const handleDeleteLanguage = async (index) => {
    try {
      const language = languages[index];
      if (language.id) {
        await axios.delete(`/api/language/${language.id}`);
      }
      setLanguages((prevLanguages) =>
        prevLanguages.filter((_, idx) => idx !== index)
      );
      toast.success('학력 정보가 성공적으로 삭제되었습니다.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Failed to delete language:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/api/language', languages);
      if (response.status === 200) {
        toast.success('학력 업데이트에 성공했습니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Failed to save languages:', error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await axios.get('/api/language');
      const data = response.data.map(language => ({
        ...language,
        lang_name: language.lang_name || '',
        exam_name: language.exam_name || '',
        point: language.point || '',
      }));
      setLanguages(data);
    } catch (error) {
      console.error('Failed to fetch languages:', error);
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
                <legend>외국어 능력 수정 양식</legend>
                <FormGroup className='form-group'>
                  <div className='item-add'>
                    <button type="button" onClick={handleAddLanguage}>외국어 능력 추가</button>
                  </div>
                  {languages.map((language, index) => (
                    <Fragment key={index} className='array-language'>
                      <FieldGroup>
                        <input
                          type="text"
                          name="lang_name"
                          id='lang_name'
                          value={language.lang_name}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="외국어명"
                          required
                        />
                        <label htmlFor='lang_name'>외국어명</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="exam_name"
                          id='exam_name'
                          value={language.exam_name}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="시험명"
                          required
                        />
                        <label htmlFor='exam_name'>시험명</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="point"
                          id='point'
                          value={language.point}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="점수"
                          required
                        />
                        <label htmlFor='point'>점수</label>
                        <p>특성화 고등학교, 전문대학 등</p>
                      </FieldGroup>
                      <button type="button" onClick={() => handleDeleteLanguage(index)}>삭제</button>
                    </Fragment>
                  ))}
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>외국어 능력 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
