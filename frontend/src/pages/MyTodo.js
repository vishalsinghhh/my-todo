import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/appContext";
import Lists from "../components/Lists";
import "./MyTodo.css";
import { GrAddCircle } from 'react-icons/gr';
import Modal from "../components/Modal";
import "../components/Modal.css"

const MyTodo = () => {
  const { getAllLists, createList } = useAppContext();
  const [loading, setLoading] = useState(false)
  const [lists, setLists] = useState();
  const [listName, setListName] = useState()
  const [isModalOpen, setModalOpen] = useState(false);
  const fn = async () => {
    const res = await getAllLists();
    setLists(res);
  };
  useEffect(() => {
    fn();
  },[]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit=async()=>{
    if(listName){
      return
    }
    try {
      setLoading(true)
      await createList(listName)
      const res = await getAllLists();
      setLists(res);
    } catch (error) {
      setLoading(false)
    }
    setLoading(false)
    setModalOpen(false)
  }

  
  return (
    <div className="main">
      <Navbar />
      
      <div className="content">
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2>Create list</h2>
        <input type="text" onChange={(e)=>{setListName(e.target.value)}}/>
        <button onClick={()=>{onSubmit()}} className="createBTN">{!loading?'Create':'loading...'}</button>
      </Modal>
        <div className="listMain">
          {lists?.lists.map((item, i) => {
            return (
              <div key={i}>
                <Lists data={item} />
              </div>
            );
          })}

          <div className="createList" onClick={openModal}>
            <div className="create">Create New List</div>
            <GrAddCircle className="GrAddCircle"/>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MyTodo;
