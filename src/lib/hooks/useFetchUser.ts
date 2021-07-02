import { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import { useUserContext } from '../context/userContext';

export default function useFetchUser() {
  const { user, populateUserData } = useUserContext();
  const [userState, setUserState] = useState(user);
  const fetchUser = async () => {
    const userData = await apiService.fetchUser().then((res) => res.json());
    setUserState(userData.user);
    populateUserData(userData.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return userState;
}
