import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup, Fragment } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Certificate() {
  const { loggedIn } = useAuth();

  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    certificate_name: '',
    organization: '',
    issue_date: '',
    certificate_num: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setCertificates((prevCertificates) => {
      const updatedCertificates = [...prevCertificates];
      updatedCertificates[index] = {
        ...updatedCertificates[index],
        [name]: value,
      };
      return updatedCertificates;
    });
  };

  const handleAddCertificate = () => {
    setCertificates((prevCertificates) => [...prevCertificates, newCertificate]);
    setNewCertificate({
      certificate_name: '',
      organization: '',
      issue_date: '',
      certificate_num: '',
    });
  };

  const handleDeleteCertificate = async (index) => {
    try {
      const certificate = certificates[index];
      if (certificate.id) {
        await axios.delete(`/api/certificate/${certificate.id}`);
      }
      setCertificates((prevCertificates) =>
        prevCertificates.filter((_, idx) => idx !== index)
      );
      toast.success('학력 정보가 성공적으로 삭제되었습니다.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Failed to delete certificate:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/api/certificate', certificates);
      console.log('Certificates saved successfully:', response.data);
      console.log('response: ', response)

      if (response.status === 200) {
        toast.success('자격증 업데이트에 성공했습니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Failed to save certificates:', error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('/api/certificate');
      setCertificates(response.data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
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
                <legend>자격증 수정 양식</legend>
                <FormGroup className='form-group'>
                  <div className='item-add'>
                    <button type="button" onClick={handleAddCertificate}>자격증 추가</button>
                  </div>
                  {certificates.map((certificate, index) => (
                    <Fragment key={index} className='array-certificate'>
                      <FieldGroup>
                        <input
                          type="text"
                          name="certificate_name"
                          id='certificate_name'
                          value={certificate.certificate_name}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="자격증명"
                          required
                        />
                        <label htmlFor='certificate_name'>자격증명</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="organization"
                          id='organization'
                          value={certificate.organization}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="발행처"
                          required
                        />
                        <label htmlFor='organization'>발행처</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="date"
                          name="issue_date"
                          id='issue_date'
                          value={certificate.issue_date}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="발행일자"
                          required
                        />
                        <label htmlFor='issue_date'>발행일자</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="certificate_num"
                          id='certificate_num'
                          value={certificate.certificate_num}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="자격증번호"
                          required
                        />
                        <label htmlFor='certificate_num'>자격증번호</label>
                      </FieldGroup>
                      <button type="button" onClick={() => handleDeleteCertificate(index)}>삭제</button>
                    </Fragment>
                  ))}
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>자격증 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
