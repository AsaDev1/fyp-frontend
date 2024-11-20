import React, { useState, useEffect } from 'react';

const GroupDetailsForm = ({onSubmit, initialData}) => {
    const [formData, setFormData] = useState({
      supervisor: localStorage.getItem('faculty_name'),
      projectName: '',
      program: '',
      area: '',
      batch: '',
      members: '',
      category: '',
      coSupervisor: '',
    });
    
    useEffect(() => {
      setFormData(initialData);  // Update form data when initialData changes
    }, [initialData]);


    const [errors, setErrors] = useState({ batch: '' }); // Store validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Validate batch field on change
        if (name === 'batch') {
          const regex = /^(FA|SP)\d{2}$/; // Match FA-xx or SP-xx
          if (!regex.test(value.trim())) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              batch: 'Batch format must be FAxx or SPxx (E.g., FA23 or SP24).',
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              batch: '',
            }));
          }
        }
    
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };


    // Function to check if all required fields are filled
    const isFormValid = () => {
        const { projectName, program, area, batch, members, category } = formData;
        return (
            (projectName?.trim() || "") &&
            (program?.trim() || "") &&
            (area?.trim() || "") &&
            (batch?.trim() || "") &&
            (members?.trim() || "") && // Corrected field
            (category?.trim() || "") &&
            !errors.batch // Ensure that there are no batch errors
        );
      };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form Data Submitted:', formData);
      onSubmit(formData); // Pass the form data to the parent
      // Add your submit logic here
    };

  return (
    <form className="mt-9 mr-32" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6">
        {/* Supervisor */}
        <div>
          <label className="block text-gray-700 text-left">Supervisor</label>
          <input
            className="w-full bg-[#D9D9D9] mt-2 p-2 border rounded"
            readOnly
            type="text"
            value={formData.supervisor}
          />
        </div>

        {/* Project Name */}
        <div>
          <label className="block text-gray-700 text-left">Project Name</label>
          <input
            className="w-full fill-input mt-2 p-2 border rounded"
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>

        {/* Program */}
        <div>
          <label className="block text-gray-700 text-left">Program</label>
          <select
            className="w-full fill-input mt-2 p-2 border rounded"
            name="program"
            value={formData.program}
            onChange={handleChange}
          >
            <option value="">- Select Group -</option>
            <option value="CS">BS Computer Science</option>
            <option value="SE">BS Software Engineering</option>
          </select>
        </div>

        {/* Area */}
        <div>
          <label className="block text-gray-700 text-left">Area</label>
          <select
            className="w-full fill-input mt-2 p-2 border rounded"
            name="area"
            value={formData.area}
            onChange={handleChange}
          >
            <option value="">- Select Area -</option>
            <option value="Game">Game</option>
            <option value="Development">Development</option>
            <option value="AI/DS">AI/Data Science</option>
            <option value="Research">Research</option>
          </select>
        </div>

        {/* Batch */}
        <div className="relative">
          <div className="flex items-center justify-between">
            <label className="block text-gray-700 text-left">Batch</label>
            {errors.batch && (
              <p className="text-red-500 text-sm ml-2">
                {errors.batch}
              </p>
            )}
          </div>
          <input
            className="w-full fill-input mt-2 p-2 border rounded"
            name="batch"
            type="text"
            placeholder="FA/SPxx"
            value={formData.batch}
            onChange={handleChange}
          />
        </div>


        {/* No. of Members */}
        <div>
          <label className="block text-gray-700 text-left">No. of Members</label>
          <select
            className="w-full fill-input mt-2 p-2 border rounded"
            name="members"
            value={formData.members}
            onChange={handleChange}
          >
            <option value="">- Select -</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        {/* category */}
        <div>
          <label className="block text-gray-700 text-left">Category</label>
          <select
            className="w-full fill-input mt-2 p-2 border rounded"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">- Select -</option>
            <option value="Industrial">Industrial</option>
            <option value="Traditional">Traditional</option>
            <option value="Continuation">Continuation</option>
          </select>
        </div>

        {/* Co-Supervisor */}
        <div>
          <label className="block text-gray-700 text-left">Co-Supervisor</label>
          <select
            className="w-full fill-input mt-2 p-2 border rounded"
            name="coSupervisor"
            value={formData.coSupervisor}
            onChange={handleChange}
          >
            <option value="">- Optional -</option>
            <option value="Supervisor 1">Supervisor 1</option>
            <option value="Supervisor 2">Supervisor 2</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 text-right">
        <button
          type="submit"
          className={`py-4 px-8 rounded 
            ${isFormValid() 
                ? "bg-red-500 text-white" 
                : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}

                disabled={!isFormValid()}
        >
          Next &nbsp;&nbsp;&gt;&gt;
        </button>
      </div>
    </form>
  );
};

export default GroupDetailsForm;
