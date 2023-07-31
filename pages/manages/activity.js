import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/hooks/authContext'
import { ArrayContainer, ButtonGroup, Container, Content, FieldGroup, FormGroup, Fragment } from '@/styles/manageSystem';
import IsNotSession from './isNotSession';

export default function Activity() {
  const { loggedIn } = useAuth();

  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    organization: '',
    position: '',
    description: '',
    classification: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setActivities((prevActivities) => {
      const updatedActivities = [...prevActivities];
      updatedActivities[index] = {
        ...updatedActivities[index],
        [name]: value,
      };
      return updatedActivities;
    });
  };

  const handleAddActivity = () => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
    setNewActivity({
      organization: '',
      position: '',
      description: '',
      classification: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
    });
  };

  const handleDeleteActivity = async (index) => {
    try {
      const activity = activities[index];
      if (activity.id) {
        await axios.delete(`/api/activity/${activity.id}`);
      }
      setActivities((prevActivities) =>
        prevActivities.filter((_, idx) => idx !== index)
      );
      toast.success('대외활동 정보가 성공적으로 삭제되었습니다.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Failed to delete activity:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/api/activity', activities);
      if (response.status === 200) {
        toast.success('대외활동 업데이트에 성공했습니다.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Failed to save activities:', error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('/api/activity');
      const data = response.data.map(activity => ({
        ...activity,
        organization: activity.organization || '',
        position: activity.position || '',
        description: activity.description || '',
        classification: activity.classification || '',
        start_date: activity.start_date || '',
        start_time: activity.start_time || '',
        end_date: activity.end_date || '',
        end_time: activity.end_time || '',
      }));
      setActivities(data);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
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
                <legend>대외활동 수정 양식</legend>
                <FormGroup className='form-group'>
                  <div className='item-add'>
                    <button type="button" onClick={handleAddActivity}>대외활동 추가</button>
                  </div>
                  {activities.map((activity, index) => (
                    <Fragment key={index} className='array-activity'>
                      <FieldGroup>
                        <input
                          type="text"
                          name="organization"
                          id='organization'
                          value={activity.organization}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="기관명"
                          required
                        />
                        <label htmlFor='organization'>기관명</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="position"
                          id='position'
                          value={activity.position}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="직책/담당업무"
                          required
                        />
                        <label htmlFor='position'>직책/담당업무</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="description"
                          id='description'
                          value={activity.description}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="활동내용"
                          required
                        />
                        <label htmlFor='description'>활동내용</label>
                        <p>특성화 고등학교, 전문대학 등</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="text"
                          name="classification"
                          id='classification'
                          value={activity.classification}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="활동구분"
                          required
                        />
                        <label htmlFor='classification'>활동구분</label>
                        <p>재학 중, 졸업, 휴학 중, 중퇴 등</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="date"
                          name="start_date"
                          id='start_date'
                          value={activity.start_date}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="시작일시"
                        />
                        <label htmlFor='start_date'>시작일시</label>
                        <p>석사, 학사, 박사 등</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="time"
                          name="start_time"
                          id='start_time'
                          value={activity.start_time}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="시작시간"
                        />
                        <label htmlFor='start_time'>시작시간</label>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="date"
                          name="end_date"
                          id='end_date'
                          value={activity.end_date}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="종료일시"
                        />
                        <label htmlFor='end_date'>종료일시</label>
                        <p>점수</p>
                      </FieldGroup>
                      <FieldGroup>
                        <input
                          type="time"
                          name="end_time"
                          id='end_time'
                          value={activity.end_time}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="종료시간"
                          required
                        />
                        <label htmlFor='end_time'>종료시간</label>
                      </FieldGroup>
                      <button type="button" onClick={() => handleDeleteActivity(index)}>삭제</button>
                    </Fragment>
                  ))}
                </FormGroup>
                <ButtonGroup>
                  <button type='submit' onClick={handleSubmit}>대외활동 업데이트</button>
                </ButtonGroup>
              </fieldset>
            </form>
          </ArrayContainer>
        )}
      </Content>
    </Container>
  );
}
