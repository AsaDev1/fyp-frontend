import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import GroupDetailsForm from './GroupDetailsForm';
import StudentsAddForm from './StudentsAddForm';
import SubjectsVerificationPage from './SubjectsVerification';


const MainContent = () => {
  // const { getSubjects } = useSubjects();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(()=>{
  //   const getReqSubjects = async () => {
  //     const subjects = await getSubjects()
  //     console.log("subjects data", subjects)
  //   }

  //   getReqSubjects()
  // })

  const [formData, setFormData] = useState({
    form1: {
      supervisor: localStorage.getItem('faculty_name'),
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

  const handleForm1Submit = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      form1: data,
    }));
    navigate('step2');  // relative navigation
  };

  const handleForm2Submit = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      form2: data,
    }));
    console.log('Final Data:', { ...formData.form1, form2: data });
    navigate('step3'); 
  };

  const currentStep = location.pathname === '/supervisor/add-groups/step3' ? 3 : location.pathname === '/supervisor/add-groups/step2' ? 2 : 1;


  return (
    <div className="flex-1 p-10 max-lg:p-6 min-h-screen">
      <Header />
      <Breadcrumb />

      { currentStep === 1 ? (
        <GroupDetailsForm 
          onSubmit={handleForm1Submit} 
          initialData={formData.form1} 
        />
      ) : currentStep === 2 ? (
        <StudentsAddForm 
          numOfMembers={parseInt(formData.form1.members)} 
          onSubmit={handleForm2Submit} 
          initialData={formData.form2} 
        />
      ): (
        <SubjectsVerificationPage />  // Replace with your actual component for step 3
      )}
    </div>
  );
};

export default MainContent;
