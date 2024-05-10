import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axiosInstance from "../axiosInstance";
import "./Card.scss";
import DatePicker from "react-datepicker";

const defaultTask = {
  title: "",
  description: "",
  due_date: new Date().toISOString().split("T")[0],
  priority: "low",
};

const Card = (props) => {
  const { completed, fetchTasks, newTask, setNewTask } = props;

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(props.title || defaultTask.title);
  const [description, setDescription] = React.useState(props.description || defaultTask.description);
  const [dueDate, setDueDate] = React.useState(props.due_date || defaultTask.due_date);
  const [priority, setPriority] = React.useState(props.priority || defaultTask.priority);

  const handlePost = async () => {
    // post task
    try {
      await axiosInstance
        .post("/tasks/", {
          title,
          description,
          due_date: dueDate,
          priority,
        })
        .then(() => {
          console.log("Task added");
          fetchTasks();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    // save task
    try {
      await axiosInstance
        .put(`/tasks/${props.id}/`, {
          title,
          description,
          due_date: dueDate,
          priority,
          completed,
        })
        .then(() => {
          fetchTasks();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/tasks/${props.id}/`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkComplete = async () => {
    // mark task as complete
    try {
      await axiosInstance.patch(`/tasks/${props.id}/`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Accordion
        open={open}
        className={`task_card ${completed ? "completed" : ""}`}
      >
        <AccordionHeader onClick={() => setOpen(!open)}>
          <input
            className="task_title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
          <div className="flex items-center">
            <h4 className={`priority m-1 ${priority}`}>{priority}</h4>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={completed}
              onChange={handleMarkComplete}
            />
          </div>
        </AccordionHeader>
        <AccordionBody>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
          <div className="flex items-center">
            <h4>Due Date: </h4>
            <DatePicker
              selected={dueDate}
              onChange={(date) => {
                // set in format yyyy-mm-dd
                const formattedDate = date.toISOString().split("T")[0];
                setDueDate(formattedDate);
              }}
              dateFormat={"dd/MM/yyyy"}
            />
          </div>
          <div className="flex items-center">
            <h4>Priority: </h4>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex justify-end mt-2">
            <button
              className="btn"
              onClick={() => {
                if (newTask) {
                  handlePost();
                  setNewTask(false);
                } else handleSave();
              }}
            >
              {newTask ? "Add" : "Save"}
            </button>
            {!newTask ? (
              <button
                className="btn"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </button>
            ) : (
              <button className="btn" onClick={() => setNewTask(false)}>
                Cancel
              </button>
            )}
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default Card;
