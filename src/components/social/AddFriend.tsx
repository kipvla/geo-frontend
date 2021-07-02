import React, { useEffect } from 'react';
import apiService from '../../services/apiService';

const AddFriend: React.FC = () => {
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await apiService
        .fetchAllUsers()
        .then((res) => res.json());
      console.log(response);
    };

    fetchAllUsers();
  }, []);
  return <p>its me add friends</p>;
};
export default AddFriend;
