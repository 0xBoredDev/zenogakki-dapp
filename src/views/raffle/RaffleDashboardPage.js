import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../../components/Spinner.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "../../components/Header";
// import Menu from "../../components/Menu";

function RaffleDashboardPage() {
  return (
    <>
      {/* <Menu /> */}
      {/* <Header /> */}
      <div className="container-fluid" style={{ padding: 0 }}>
        <div className="throne">
          <h1>Dashboard</h1>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default RaffleDashboardPage;
