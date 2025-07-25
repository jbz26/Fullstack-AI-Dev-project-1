// lib/auth/googleSignup.ts

export const handleGoogleSignup = async ({
  API_URL,
  setUser,
  router,
}: {
  API_URL: string;
  setUser?: (user: any) => void;
  router: any;
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
        const userRes = await fetch(`${API_URL}/data/user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!userRes.ok) {
          throw new Error('Lỗi khi lấy thông tin người dùng từ Google');
        }

        const userData = await userRes.json();

        const user = {
          email: userData.email,
          fullName: userData.full_name,
          id: userData.id,
          avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
        };

        if (typeof setUser === 'function') {
          setUser(user);
        }

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
