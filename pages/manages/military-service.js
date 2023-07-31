import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ButtonGroup, Container, Content, FieldGroup, FormGroup } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';
import { ProfileContainer } from '@/styles/sectionSystem';
import styled from '@emotion/styled';
import { Rem, hex } from '@/styles/designSystem';

const CheckboxGroup = styled.div({
  paddingBottom: Rem(25),
  display: 'flex',
  gap: Rem(15),
  '& div': {
    display: 'flex',
    gap: Rem(2),
    alignItems: 'center',
  },
  '& input': {
    appearance: 'none',
    width: Rem(16),
    height: Rem(16),
    borderRadius: Rem(5),
    border: `${Rem(1)} solid ${hex.light}`,
    '&:checked': {
      borderColor: hex.mint,
      background: `${hex.mint} url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20.293 5.29297L9 16.5859L4.70703 12.293L3.29297 13.707L9 19.4141L21.707 6.70703L20.293 5.29297Z" fill="%23171717"/%3E%3C/svg%3E%0A') no-repeat 50% 50%/contain`,
    },
  },
  '& label': {
    fontSize: Rem(16),
    lineHeight: 1.5,
    color: hex.light,
  },
})

export default function MilitaryService() {
  const { loggedIn } = useAuth();

  const [militaryService, setMilitaryService] = useState({
    military_stats: false,
    military_show: false,
    conscription_exemption: '',
    military_group: '',
    start_date: '',
    end_date: '',
    rank: '',
    discharge: '',
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === 'military_stats') {
      setMilitaryService((prev) => ({
        ...prev,
        military_group: checked ? '' : prev.military_group,
        start_date: checked ? '' : prev.start_date,
        end_date: checked ? '' : prev.end_date,
        rank: checked ? '' : prev.rank,
        discharge: checked ? '' : prev.discharge,
        conscription_exemption: checked ? prev.conscription_exemption : '',
        military_stats: checked,
      }));
    } else if (name === 'military_show') {
      setMilitaryService((prev) => ({ ...prev, military_show: checked }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/military-service', militaryService);
      alert('업데이트 성공!');
    } catch (error) {
      console.error('Failed to update military service:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/military-service');
      setMilitaryService(response.data || {
        military_stats: false,
        military_show: false,
        conscription_exemption: '',
        military_group: '',
        start_date: '',
        end_date: '',
        rank: '',
        discharge: '',
      });
    } catch (error) {
      console.error('Failed to fetch military service:', error);
    }
  };

  return (
    <Container>
      <Content>
        {!loggedIn ? (
          <IsNotSession />
        ) : (
          <ProfileContainer>
            <form>
              <fieldset>
                <legend>병역사항 수정 양식</legend>
                <FormGroup>
                  <CheckboxGroup>
                    <div>
                      <input
                        type="checkbox"
                        name="military_stats"
                        id='military_stats'
                        checked={militaryService.military_stats}
                        onChange={handleChange}
                      />
                      <label htmlFor='military_stats'>병역여부</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="military_show"
                        id='military_show'
                        checked={militaryService.military_show}
                        onChange={handleChange}
                      />
                      <label htmlFor='military_show'>공개여부</label>
                    </div>
                  </CheckboxGroup>
                  {militaryService.military_stats ? (
                    <>
                      <FieldGroup>
                        <input
                          type="text"
                          name="military_group"
                          id='military_group'
                          placeholder='군별'
                          value={militaryService.military_group}
                          onChange={handleChange}
                        />
                        <label htmlFor='military_group'>군별</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="start_date"
                          id='start_date'
                          placeholder='복무 시작일'
                          value={militaryService.start_date}
                          onChange={handleChange}
                        />
                        <label htmlFor='start_date'>복무 시작일</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="end_date"
                          id='end_date'
                          placeholder='전역/제대일'
                          value={militaryService.end_date}
                          onChange={handleChange}
                        />
                        <label htmlFor='end_date'>전역/제대일</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="rank"
                          id='rank'
                          placeholder='계급'
                          value={militaryService.rank}
                          onChange={handleChange}
                        />
                        <label htmlFor='rank'>계급</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="discharge"
                          id='discharge'
                          placeholder='병역'
                          value={militaryService.discharge}
                          onChange={handleChange}
                        />
                        <label htmlFor='discharge'>병역</label>
                      </FieldGroup>
                    </>
                  ) : (
                    <FieldGroup>
                      <input
                        type="text"
                        name="conscription_exemption"
                        id='conscription_exemption'
                        placeholder='면제사유'
                        value={militaryService.conscription_exemption}
                        onChange={handleChange}
                      />
                      <label>면제사유</label>
                    </FieldGroup>
                  )}
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>병역사항 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ProfileContainer>
        )}
      </Content>
    </Container>
  );
}
