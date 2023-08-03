import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import useModal from '@/components/hooks/useModal';
import Modal from '@/components/features/modal';
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';
import { Rem, hex } from '@/styles/designSystem';

export default function Reference() {
  const { loggedIn } = useAuth();

  const { isOpen, handleOpen, handleClose } = useModal();

  const [github, setGithub] = useState('');
  const [blog, setBlog] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [errResponseData, setErrResponseData] = useState('');
  const [errResponseStats, setErrResponseStats] = useState('');
  const [errResponseStatsTxt, setErrResponseStatsTxt] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (github === '' && blog === '') {
      toast.error('최소 한개 이상의 항목을 입력하셔야 합니다', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } else {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/reference', { github, blog }, { headers: { Authorization: `Bearer ${token}` } });
        if (response.status === 200) {
          toast.success('레퍼런스 업데이트에 성공했습니다', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
        } else {
          toast.error('레퍼런스 업데이트에 실패했습니다', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error('Failed to create reference:', error);
        toast.error('서버 오류입니다', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
        setErrMsg(error.message)
        setErrResponseData(error.response.data.message)
        setErrResponseStats(error.response.status)
        setErrResponseStatsTxt(error.response.statusText)
        handleOpen()
      }
    }
  };

  const pageTitle = '레퍼런스 업데이트'

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
            <form onSubmit={handleSubmit}>
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
                  <button type='submit'>{pageTitle}</button>
                </ButtonGroup>
              </fieldset>
            </form>
            <Modal
              isOpen={isOpen}
              title={'console.log summary'}
              onClose={handleClose}
            >
              <div style={{ fontSize: Rem(20), fontWeight: '700', color: hex.danger }}>
                <p>{errMsg}</p>
                <p>{errResponseData}</p>
                <p>{errResponseStats} {errResponseStatsTxt}</p>
              </div>
            </Modal>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
