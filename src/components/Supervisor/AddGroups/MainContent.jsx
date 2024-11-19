import React, { useState } from 'react';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import Form from './Form';
import GroupForm from './StudentsAddForm';

const MainContent = () => {
  // State to track the current step
  const [currentStep, setCurrentStep] = useState(1);  // 1 for first form, 2 for second form

  // State to hold form data from both forms
  const [formData, setFormData] = useState({
    form1: {
      groupId: 'CS-101',
      projectName: '',
      program: '',
      area: '',
      batch: '',
      members: '',
      category: '',
      coSupervisor: '',
    },
    form2: [],
  });

  // Function to handle form 1 submission and switch step
  const handleForm1Submit = (data) => {
    console.log("Form 1 data:", data);
    setFormData((prevState) => ({
      ...prevState,
      form1: data,
    }));
    setCurrentStep(2);  // Switch to step 2 after Form 1 submission
    console.log("current step:", currentStep);
    
  };

  // Function to handle form 2 submission
  const handleForm2Submit = (data) => {
    console.log("Form 2 data:", data);
    setFormData((prevState) => ({
      ...prevState,
      form2: data,
    }));
    // Combine both form data for final submission (example)
    console.log("Final Data Submitted:", { ...formData.form1, form2: data });
    // You can now send the final combined data to the backend
  };

  return (
    <div className="flex-1 p-10 max-lg:p-6 min-h-screen">
      <Header />
      <Breadcrumb />

      {currentStep === 1 ? (
        <Form onSubmit={handleForm1Submit} />
      ) : (
        <GroupForm numOfMembers={parseInt(formData.form1.members)} onSubmit={handleForm2Submit} />
      )}
    </div>
  );
};

export default MainContent;
