import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useSupabase } from "../../../hooks/Supabase/useSupabase";
import { useGroups } from '../../../hooks/Groups/useGroups'
import Loader from "../../Global/Loader/Loader";
import { supabase } from "../../../config/supabaseClient";

const UploadFiles = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uploadFile, loadingSupabase } = useSupabase();
  const { createNewGroup, loading, error } = useGroups();

  const [wordFile, setWordFile] = useState(null);
  const [wordFileName, setWordFileName] = useState("Browse File");
  const [wordFilePath, setWordFilePath] = useState('');

  const [anonymousFile, setAnonymousFile] = useState(null);
  const [anonymousFileName, setAnonymousFileName] = useState("Browse File");
  const [anonymousFilePath, setAnonymousFilePath] = useState('');

  const [conditionOneChecked, setConditionOneChecked] = useState(false);
  const [conditionTwoChecked, setConditionTwoChecked] = useState(false);

  const [isModal1Visible, setModal1Visible] = useState(false);
  const [isModal2Visible, setModal2Visible] = useState(false);

  let students_registration_numbers;

  console.log("initial data at file upload component: ", initialData);
  if(initialData.form2){
    students_registration_numbers = initialData.form2.map((obj) => obj.id);
  }

  const handleFileChange = (e, type) => {
    if (type === "word") {
      setWordFile(e.target.files[0]);
      setWordFileName(e.target.files[0].name);
    } else if (type === "anonymous") {
      setAnonymousFile(e.target.files[0]);
      setAnonymousFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!wordFile || !anonymousFile) {
      alert("Please upload both files.");
      return;
    }

    try {
      const bucketName = process.env.REACT_APP_SUPABASE_BUCKET_NAME;
      const wordPath = await uploadFile(wordFile, bucketName);
      setWordFilePath(wordPath);

      const anonymousPath = await uploadFile(anonymousFile, bucketName);
      setAnonymousFilePath(anonymousPath);

      const data = {
        original_copy: wordPath,
        blind_copy: anonymousPath,
      };

      console.log("files form data: ", data);
      onSubmit(data);

    // Show the first modal
      setModal1Visible(true);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An error occurred while uploading files.");
    }
  };

  const handleModal1Submit = async () => {

    const result = await createNewGroup(
      initialData.form1.projectName,
      initialData.form1.area,
      initialData.form1.category,
      initialData.form1.members,
      initialData.form1.batch,
      "Proposal Sent",
      initialData.form1.program,
      initialData.form1.coSupervisor,
      students_registration_numbers,
      wordFilePath,
      anonymousFilePath,
      true,
      false
    );

    if (result) {
      console.log("Group created successfully:", result);
    }

    setModal1Visible(false);
    setModal2Visible(true);
  };

  const handleModalClose = () => {
    setModal1Visible(false);
    setModal2Visible(false);

  };

  return (
    <>
    
    {(loadingSupabase || loading) && (
        <Loader />
    )}

    <div className="mt-9 mr-32 text-left">
      <span>Please upload the Project Proposal:</span>
      <form onSubmit={handleSubmit}>
        {/* Word file upload */}
        <h1 className="text-lg font-bold mt-7">Word File</h1>
        <span className="text-red-500 text-sm">
          Please verify that proposal includes the last page of Turnitin Report + AI Report!
        </span>
        <label
          htmlFor="wordFile"
          className="flex items-center py-5 px-2 border border-gray-300 rounded-2xl cursor-pointer w-32 mt-4 bg-gray-200 contain-strict"
        >
          <FontAwesomeIcon icon={faPaperclip} className="text-gray-600 mr-3 -rotate-45" />
          <span className="text-gray-700 text-sm">{wordFileName}</span>
        </label>
        <input
          id="wordFile"
          type="file"
          accept=".doc,.docx"
          className="hidden"
          onChange={(e) => handleFileChange(e, "word")}
        />

        {/* Anonymous file upload */}
        <h1 className="text-lg font-bold mt-7">Anonymous Copy for blind review:</h1>
        <span className="text-red-500 text-sm">
          Please verify that this does not include details of the supervisor or the students!
        </span>
        <label
          htmlFor="anonymousFile"
          className="flex items-center py-5 px-2 border border-gray-300 rounded-2xl cursor-pointer w-32 mt-4 bg-gray-200 contain-strict"
        >
          <FontAwesomeIcon icon={faPaperclip} className="text-gray-600 mr-3 -rotate-45" />
          <span className="text-gray-700 text-sm">{anonymousFileName}</span>
        </label>
        <input
          id="anonymousFile"
          type="file"
          accept=".doc,.docx"
          className="hidden"
          onChange={(e) => handleFileChange(e, "anonymous")}
        />

        {/* Checkboxes for conditions */}
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="conditionOne"
              className="mr-2 size-4"
              checked={conditionOneChecked}
              onChange={(e) => setConditionOneChecked(e.target.checked)}
            />
            <label htmlFor="conditionOne" className="text-sm">
              Proposal is formatted correctly according to the template.
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="conditionTwo"
              className="mr-2 size-4"
              checked={conditionTwoChecked}
              onChange={(e) => setConditionTwoChecked(e.target.checked)}
            />
            <label htmlFor="conditionTwo" className="text-sm">
              Proposal includes Abstract, Related Work, Individual Tasks and References.
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-8 text-right">
          <button
            type="submit"
            className={`py-4 px-8 rounded ${
              conditionOneChecked && conditionTwoChecked
                ? "bg-red-500 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!conditionOneChecked || !conditionTwoChecked}
          >
            Next &gt;&gt;
          </button>
        </div>
      </form>

      {/* Modal 1 */}
      {isModal1Visible && (
      <div
      id="modal"
      className="absolute top-0 left-0 h-screen w-screen z-10 bg-black/20 flex items-center justify-center"
      >
      <div className="p-8 rounded shadow-md bg-gray-100 w-2/4 relative left-[5%]">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">You are about to add the following students:</h2>
          <FontAwesomeIcon icon={faTimesCircle} id="close" className="mr-3" onClick={handleModalClose} />
        </div>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-white text-left border border-gray-400">
              <th className="p-2">Group Name</th>
              <th className="p-2">Batch</th>
              <th className="p-2">Program</th>
              <th className="p-2">Area</th>
              <th className="p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white text-left border border-gray-400">
              <td className="p-2">{initialData.form1.projectName}</td>
              <td className="p-2">{initialData.form1.batch}</td>
              <td className="p-2">{initialData.form1.program}</td>
              <td className="p-2">{initialData.form1.area}</td>
              <td className="p-2">{initialData.form1.category}</td>
            </tr>
          </tbody>
        </table>
        <table className="min-w-full border-collapse text-left mt-8 mb-6">
          <thead>
            <tr className="bg-white border border-gray-400">
              <th className="p-3">Student Id</th>
              <th className="p-3">Name</th>
            </tr>
          </thead>
          <tbody>
          {initialData.form2.map((student)=>{
            return (
              <tr key={student.id} className="bg-white border border-gray-400">
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* Align button to the right */}
      <div className="flex justify-end">
        <button
            id="addBtn"
            className="bg-red-500 text-white px-8 py-2 rounded mt-4"
            onClick={handleModal1Submit}
            >
              Add &nbsp;&gt;&gt;
        </button>
      </div>
    </div>
  </div>
)}

      {/* Modal 2 */}
      {isModal2Visible && !loading  && !error && (
        <div
          id="modal2"
          className="absolute top-0 left-0 h-screen w-screen z-100 bg-black/20 flex justify-center items-center"
        >
          <div className="p-8 rounded shadow-md bg-gray-100 relative left-[5%] w-[50%]">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">FYP Group Added Successfully</h2>
              <FontAwesomeIcon icon={faTimesCircle} id="close" className="mr-3" onClick={handleModalClose} />
            </div>
            <div className="overflow-x-auto mx-auto flex items-center justify-center">
              <img src="/Assets/Tick.png" alt="Success Tick" />
            </div>
            {/* Align button to the right */}
            <div className="flex justify-end">
              <button
                id="confirmBtn"
                className="bg-red-500 text-white px-8 py-2 rounded mt-4"
                onClick={handleModalClose}
              >
                Confirm &nbsp;&gt;&gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {isModal2Visible && !loading  && error && (
        <div
          id="modal2"
          className="absolute top-0 left-0 h-screen w-screen z-100 bg-black/20 flex justify-center items-center"
        >
          <div className="p-8 rounded shadow-md bg-gray-100 relative left-[5%] w-[50%]">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold">Error occured while adding the groups!</h2>
              <FontAwesomeIcon icon={faTimesCircle} id="close" className="mr-3" onClick={handleModalClose} />
            </div>
            {/* <div className="overflow-x-auto mx-auto flex items-center justify-center">
              <img src="/Assets/Tick.png" alt="Success Tick" />
            </div> */}
            {/* Align button to the right */}
            <div className="flex justify-end">
              <button
                id="confirmBtn"
                className="bg-red-500 text-white px-8 py-2 rounded mt-4"
                onClick={handleModalClose}
              >
                Confirm &nbsp;&gt;&gt;
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
};

export default UploadFiles;

