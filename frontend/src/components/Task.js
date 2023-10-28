import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAppContext } from "../context/appContext";

const Task = ({ data, index, change, stateResult }) => {
  const {changeData, currData} = useAppContext()
  useEffect(()=>{
    if(stateResult){
      if(data?.id == stateResult.draggableId){
        changeData(data)
      }
    }
  }, [change])

  return (
    <Draggable draggableId={data?.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="taskMain"
        >
        <input type="checkbox" className="myCheckbox"/>
        
          {data?.description}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
