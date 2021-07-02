import React, { useEffect } from 'react';
import apiService from '../../services/apiService';

const PendingRequests: React.FC = () => {
  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await apiService
        .fetchAllUsers()
        .then((res) => res.json());
      console.log(response);
    };

    fetchAllUsers();
  }, []);
  return <p>Pending Requests</p>;
};
export default PendingRequests;
