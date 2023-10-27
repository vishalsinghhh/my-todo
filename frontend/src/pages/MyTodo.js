import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/appContext";
import Lists from "../components/Lists";
import "./MyTodo.css";
import { GrAddCircle } from 'react-icons/gr';

const MyTodo = () => {
  const { getAllLists } = useAppContext();
  const [lists, setLists] = useState();

  useEffect(() => {
    const fn = async () => {
      const res = await getAllLists();
      setLists(res);
    };
    fn();
  });

  
  return (
    <div className="main">
      <Navbar />
      <div className="content">
        <div className="listMain">
          {lists?.lists.map((item, i) => {
            return (
              <div key={i}>
                <Lists data={item} />
              </div>
            );
          })}

          <div className="createList">
            <div className="create">Create New List</div>
            <GrAddCircle className="GrAddCircle"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTodo;
