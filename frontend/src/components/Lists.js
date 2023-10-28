import React, { useEffect, useState } from "react";
import "./Lists.css";
import { GrAddCircle } from "react-icons/gr";
import { useAppContext } from "../context/appContext";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import Modal from "./Modal";

const Lists = ({ data, change, stateResult }) => {
  const [taskName, setTaskName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState();
  const { getTasksByListID, createTask, currData } = useAppContext();
  const [isModalOpen, setModalOpen] = useState(false);

  const fn = async () => {
    const res = await getTasksByListID(data.id);
    setTasks(res.tasks);
  };

  useEffect(() => {
    fn();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await createTask(data.id, taskName);
      setModalOpen(false);
      fn();
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data.id == stateResult?.destination.droppableId) {
      if (currData) {
        const updatedTasks = [...tasks, currData];
        setTasks(updatedTasks);
      }
    }
    if(data.id == stateResult?.source.droppableId){
      const filteredTasks = tasks.filter((task) => task.id != stateResult.draggableId);
      console.log(filteredTasks);
      setTasks(filteredTasks);
    }
  }, [currData]);

  return (
    <div className="lists">
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2>Create Task in {data.name}</h2>
        <input
          type="text"
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
        <button
          onClick={() => {
            onSubmit();
          }}
          className="createBTN"
        >
          {!loading ? "Create" : "loading..."}
        </button>
      </Modal>
      <Droppable droppableId={data.id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="listHeader">
              {data.name}
              <div className="taskAdd" onClick={openModal}>
                <GrAddCircle />
              </div>
            </div>
            <div>
              {tasks?.map((item, i) => {
                return (
                  <div key={i}>
                    <Task
                      data={item}
                      index={i}
                      change={change}
                      stateResult={stateResult}
                    />
                  </div>
                );
              })}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Lists;
