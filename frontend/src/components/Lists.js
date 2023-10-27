import React from "react";
import "./Lists.css";
import { GrAddCircle } from "react-icons/gr";

const Lists = ({ data }) => {
  console.log(data);
  return (
    <div className="lists">
      <div className="listHeader">
        {data.name}
        <div className="taskAdd">
          <GrAddCircle />
        </div>
      </div>
    </div>
  );
};

export default Lists;
