import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup, Fragment } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Reference() {
  const { loggedIn } = useAuth();

  const [github, setGithub] = useState('');
  const [blog, setBlog] = useState('');

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const response = await axios.get('/api/reference');
      const references = response.data;
      if (references.length > 0) {
        setGithub(references[0].github);
        setBlog(references[0].blog);
      }
    } catch (error) {
      console.error('Failed to fetch references:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/reference', { github, blog });
      console.log('Reference created successfully');
    } catch (error) {
      console.error('Failed to create reference:', error);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  return (
    <Container>
      <Content>
        {!loggedIn ? (
          <IsNotSession />
        ) : (
          <ArrayContainer>
            <form>
              <fieldset>
                <legend>레퍼런스 수정 양식</legend>
                <FormGroup className='form-group reference-group'>
                  <FieldGroup>
                    <input
                      type="text"
                      id='github'
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="Github"
                    />
                    <label htmlFor='github'>Github</label>
                    <p>Gibhub 계정 이름만 입력하세요</p>
                  </FieldGroup>
                  <FieldGroup>
                    <input
                      type="url"
                      id='blog'
                      value={blog}
                      onChange={(e) => setBlog(e.target.value)}
                      placeholder="blog"
                    />
                    <label htmlFor='blog'>블로그</label>
                    <p>블로그 주소 전체를 입력하세요</p>
                  </FieldGroup>
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>레퍼런스 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
