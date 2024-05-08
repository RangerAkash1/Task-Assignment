import React, { useEffect, useState } from "react";
import Card from "./Card";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

function TaskAPP() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(false);

  const fetchTasks = async () => {
    await axiosInstance
      .get("/tasks/")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error fetching tasks");
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className="container"
      style={{
        margin: "1rem",
      }}
    >
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="button"
      >
        Logout
      </button>
      <button
        onClick={() => {
          fetchTasks()
        }}
        className="button"
      >
        Refresh
      </button>
      <h1>Tasks</h1>

      <button className="button" onClick={() => setNewTask(true)}>New Task</button>
      {newTask && <Card newTask={newTask} setNewTask={setNewTask} fetchTasks={fetchTasks} />}

      {tasks.map((task) => {
        return <Card key={task.id} {...task} fetchTasks={fetchTasks} />;
      })}
    </div>
  );
}

export default TaskAPP;
