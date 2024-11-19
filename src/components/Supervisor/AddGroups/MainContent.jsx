import React from "react";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import Form from "./Form";

const MainContent = () => {
  return (
    <div className="flex-1 p-10 max-lg:p-6">
      <Header />
      <Breadcrumb />
      <Form />
    </div>
  );
};

export default MainContent;
