import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useStudents = () => {
  const token = localStorage.getItem('token');

  const getNameForRegistrationNumber = async (registration_number) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}students/available`,
        { studentRegistrationNumber: registration_number },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response || !response.data || !response.data.studentName) {
        throw new Error("Invalid response from server");
      }

      return response.data.studentName; // Return the name if successful
    } catch (error) {
      alert(error.response.data.message);
      return null; // Return null to indicate failure
    }
  };

  return { getNameForRegistrationNumber };
};
