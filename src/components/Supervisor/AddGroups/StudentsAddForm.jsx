import React, { useState, useEffect } from 'react';
import { useStudents } from '../../../hooks/Students/useStudents';

const GroupForm = ({ numOfMembers, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const { getNameForRegistrationNumber } = useStudents();
  const idPattern = /^(FA|SP)\d{2}-[A-Z]{3}-\d{3}$/; // Regex for validation

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setFormData(initialData);
    } else {
      setFormData(
        Array.from({ length: numOfMembers }, () => ({ id: '', name: '', isValid: true }))
      );
    }
  }, [initialData, numOfMembers]);

  const handleInputChange = async (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        [field]: value,
        isValid: true, // Reset to valid initially
      };
      return updatedFormData;
    });

    if (field === 'id') {
      if (idPattern.test(value)) {
        try {
          const studentName = await getNameForRegistrationNumber(value);
          setFormData((prevFormData) => {
            const updatedFormData = [...prevFormData];
            updatedFormData[index] = {
              ...updatedFormData[index],
              name: studentName || '', // Update name if found
            };
            return updatedFormData;
          });
        } catch (error) {
          console.error("Error fetching student name:", error);
        }
      } else {
        // If ID is invalid, clear the name and mark as invalid
        setFormData((prevFormData) => {
          const updatedFormData = [...prevFormData];
          updatedFormData[index] = {
            ...updatedFormData[index],
            name: '', // Clear name
            isValid: false, // Mark as invalid
          };
          return updatedFormData;
        });
      }
    }
  };

  const allFieldsFilled = formData.every(
    (member) =>
      typeof member.name === 'string' &&
      member.name.trim() !== '' &&
      member.id.trim() !== '' &&
      member.isValid // Ensure the ID is valid
  );

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderFields = () => {
    return formData.map((member, index) => (
      <div key={index} className="grid grid-cols-2 gap-6 mb-4 items-start">
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-gray-700 text-left">
              Student ID {index === 0 ? "(Group Leader)" : ""}
            </label>
            {!member.isValid && (
              <span className="text-red-500 text-sm ml-2 whitespace-nowrap">
                Invalid format - E.g. SP/FA21-BSE-022
              </span>
            )}
          </div>
          <input
            className={`w-full fill-input mt-2 p-2 border rounded ${
              !member.isValid ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            value={member.id}
            onChange={(e) => handleInputChange(index, "id", e.target.value)}
            placeholder="SP/FA21-BSE-XXX"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-left">Student Name</label>
          <input
            className="w-full bg-[#D9D9D9] mt-2 p-2 border rounded"
            type="text"
            value={member.name || ""} // Ensure name is never undefined
            readOnly
          />
        </div>
      </div>
    ));
  };
  

  return (
    <div className="mt-9 mr-32">
      {renderFields()}
      <div className="mt-8 text-right">
        <button
          className={`py-4 px-8 rounded ${
            allFieldsFilled
              ? 'bg-red-500 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!allFieldsFilled}
          onClick={handleSubmit}
        >
          Next &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default GroupForm;
