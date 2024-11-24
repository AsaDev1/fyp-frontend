import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useGroups = () => {
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  const createNewGroup = async (
    projectName,
    area,
    category,
    number_of_members,
    batch,
    status,
    program,
    coSupervisorID,
    studentRegistrationNumbers,
    originalCopy,
    blindCopy
  ) => {
    setLoading(true);
    setError(null); // Reset error before making the request

    try {
      const token = localStorage.getItem("token"); // Fetch token dynamically

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}fypGroups`, // Ensure proper URL structure
        {
          projectName,
          area,
          category,
          number_of_members,
          batch,
          status,
          program,
          coSupervisorID,
          studentRegistrationNumbers,
          originalCopy,
          blindCopy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      return response.data; // Return response data if successful
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setError(errorMessage); // Update error state
      console.error("Group creation error:", errorMessage); // Log for debugging
      return null; // Return null to indicate failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { createNewGroup, loading, error }; // Expose loading and error states
};
