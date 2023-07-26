import axios from 'axios';
import jwt from 'jsonwebtoken';

// Check Token Function
export async function checkToken() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken = jwt.decode(token);

    // 만료 시간이 5분 이내인지 확인
    const currentTime = Date.now().valueOf() / 1000;
    if (decodedToken.exp < currentTime + 5 * 60) {
      // 만료된 토큰을 서버에 보내어 새 토큰을 요청
      try {
        const response = await axios.post('/api/users/renew', { token: token });
        if (response.data.status === 'success') {
          // 서버로부터 받은 새 토큰을 로컬스토리지에 저장
          localStorage.setItem('token', response.data.token);
        } else {
          // 만료된 토큰으로 인한 실패 - 사용자를 로그아웃 처리
          localStorage.removeItem('token');
          // 사용자를 로그인 페이지로 리다이렉트 - 이 부분은 프로젝트에 따라 다름
          window.location.href = "/login";
        }
      } catch (error) {
        console.log('Token renewal failed', error);
        // 토큰 갱신 실패 - 로그아웃 처리
        localStorage.removeItem('token');
        // 사용자를 로그인 페이지로 리다이렉트
        window.location.href = "/login";
      }
    }
  }
}
