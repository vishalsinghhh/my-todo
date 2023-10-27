import React from "react";
import { useAppContext } from "../context/appContext";
import "./Navbar.css"

const Navbar = () => {
  const { user, logoutUser } = useAppContext();

  return (
    <>
      <div className="navbar">
        <div>Welcome {user?.name.split(" ")[0]}!</div>
        <div className="gap"></div>
        <div onClick={()=>{logoutUser()}} className="logout">logout</div>
      </div>
    </>
  );
};

export default Navbar;
