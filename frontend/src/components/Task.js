import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ data, index }) => {
  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="taskMain"
        >
          {data.description}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
