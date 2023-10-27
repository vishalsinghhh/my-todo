import React, { useEffect, useState } from "react";
import "./Lists.css";
import { GrAddCircle } from "react-icons/gr";
import { useAppContext } from "../context/appContext";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Lists = ({ data }) => {
  const [tasks, setTasks] = useState();
  const { getTasksByListID } = useAppContext();

  const fn = async () => {
    const res = await getTasksByListID(data.id);
    setTasks(res.tasks);
  };

  useEffect(() => {
    fn();
  }, []);
  console.log(tasks);

  return (
    <div className="lists">
      <Droppable droppableId={data.id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="listHeader">
              {data.name}
              <div className="taskAdd">
                <GrAddCircle />
              </div>
            </div>
            <div>
              {tasks?.map((item, i) => {
                return (
                  <div key={i}>
                    <Task data={item} index={i} />
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
