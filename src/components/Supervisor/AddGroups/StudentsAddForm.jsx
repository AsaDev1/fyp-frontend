import React, { useState, useEffect } from 'react';

const GroupForm = ({ numOfMembers, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);


  useEffect(() => {
    // If initialData changes (e.g., when navigating back to this step), update formData
    if (initialData && initialData.length > 0) {
      setFormData(initialData);
    } else {
      // Initialize formData if it's empty and numOfMembers is provided
      setFormData(Array.from({ length: numOfMembers }, () => ({ id: '', name: '' })));
    }
  }, [initialData, numOfMembers]);

  const handleInputChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        [field]: value,
      };
      return updatedFormData;
    });
  };

  const allFieldsFilled = formData.every(
    (member) => member.id.trim() !== '' && member.name.trim() !== ''
  );

  const handleSubmit = () => {
    onSubmit(formData); // Pass the updated form data to the parent
  };

  const renderFields = () => {
    return formData.map((member, index) => (
      <div key={index} className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-gray-700 text-left">
            Student ID {index === 0 ? "(Group Leader)" : ""}
          </label>
          <input
            className="w-full fill-input mt-2 p-2 border rounded"
            type="text"
            value={member.id}
            onChange={(e) => handleInputChange(index, 'id', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-left">Student Name</label>
          <input
            className="w-full bg-[#D9D9D9] mt-2 p-2 border rounded"
            type="text"
            value={member.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="p-8 rounded mt-3">
      {renderFields()}
      <div className="mt-8 text-right">
        <button
          className={`py-4 px-8 rounded ${allFieldsFilled ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600'}`}
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
