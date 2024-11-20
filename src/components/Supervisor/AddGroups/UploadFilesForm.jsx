import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

const UploadFiles = () => {
  const [wordFile, setWordFile] = useState(null);
  const [wordFileName, setWordFileName] = useState("Browse File");
  const [anonymousFile, setAnonymousFile] = useState(null);
  const [anonymousFileName, setAnonymousFileName] = useState("Browse File");
  const [conditionOneChecked, setConditionOneChecked] = useState(false);
  const [conditionTwoChecked, setConditionTwoChecked] = useState(false);

  // Handle file selection
  const handleFileChange = (e, type) => {
    if (type === "word") {
      setWordFile(e.target.files[0]);
      setWordFileName(e.target.files[0].name);
    } else if (type === "anonymous") {
      setAnonymousFile(e.target.files[0]);
      setAnonymousFileName(e.target.files[0].name);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!wordFile || !anonymousFile) {
      alert("Please upload both files.");
      return;
    }

    const formData = new FormData();
    formData.append("wordFile", wordFile);
    formData.append("anonymousFile", anonymousFile);

    try {
      const response = await fetch("https://your-server-endpoint.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Files submitted successfully!");
      } else {
        alert("Error submitting files.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An error occurred while uploading files.");
    }
  };

  return (
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
              I confirm that the proposal includes all required sections and reports.
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
              I confirm that the anonymous copy is free of identifying details.
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
    </div>
  );
};

export default UploadFiles;
