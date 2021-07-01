import React, { useEffect } from 'react';
import apiService from '../../services/apiService';

export interface AddFriendsProps {
  showModal: boolean;
}

const AddFriends: React.FC<AddFriendsProps> = ({ showModal }) => {
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await apiService
        .fetchAllUsers()
        .then((res) => res.json());
      console.log(response);
    };

    if (showModal) {
      fetchAllUsers();
    }
  }, [showModal]);
  return <p>its me add friends</p>;
};
export default AddFriends;
