import { useAuthContext } from '../lib/context/authContext';

export const handleAuth = (token?: string) => {
  const { setAuthenticated } = useAuthContext();
  if (token) {
    localStorage.setItem('accessToken', token);
    setAuthenticated(true);
  } else {
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
  }
};

export default { handleAuth };
