import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Protected({ Component }) {
  const navigate = useNavigate();
  const isloggedin = useSelector((state) => state.user.isloggedin);

  if (!isloggedin) {
    navigate("/login");
    return;
  }

  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
