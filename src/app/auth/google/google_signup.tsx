// lib/auth/googleSignup.ts
import axios from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';

type RouterType = ReturnType<typeof useRouter>;

export const handleGoogleSignup = async ({
  API_URL,
  router,
}: {
  API_URL: string;
  router: RouterType;
}) => {
  const popup = window.open(
    `${API_URL}/oauth/google/login`,
    'Google Sign Up',
    'width=500,height=600'
  );

  if (!popup) {
    alert('Không thể mở cửa sổ đăng ký Google');
    return;
  }

  const handleMessage = async (event: MessageEvent) => {
    if (event.origin !== API_URL) return;

    const { access_token } = event.data;

    if (access_token) {
      localStorage.setItem('access_token', access_token);

      try {
        const userRes = await axios.get(`${API_URL}/data/user`, {withCredentials: true});


        const userData = await userRes.data;

        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'))
        router.replace('/dashboard');

      } catch (err) {
        console.error('Lỗi khi đăng ký bằng Google:', err);
        alert('Đăng ký bằng Google thất bại.');
      }
    }

    window.removeEventListener('message', handleMessage);
    popup.close();
  };

  window.addEventListener('message', handleMessage);
};
