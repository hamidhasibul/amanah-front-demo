import React from "react";
import { useNavigate } from "react-router-dom";
export const Error = () => {
  let navigate = useNavigate();
  const logoutHandler = () => {
    // localStorage.removeItem("token");
    navigate("/member");
  };
  return (
    <>
      <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
          <h1 class="display-1 fw-bold">404</h1>
          <p class="fs-3">
            {" "}
            <span class="text-danger">Opps!</span> Page not found.
          </p>
          <p class="lead">The page you’re looking for doesn’t exist.</p>
          <button class="btn btn-primary" onClick={logoutHandler}>
            Go Home
          </button>
        </div>
      </div>
    </>
  );
};
