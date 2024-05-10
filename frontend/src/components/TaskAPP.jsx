import React, { useEffect, useState } from "react";
import Card from "./Card";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import "./TaskAPP.css";

function TaskAPP() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(false);
  const [search, setSearch] = useState("");

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
    <div className="container">
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
          fetchTasks();
        }}
        x
        className="button"
      >
        Refresh
      </button>
      <h1>Tasks</h1>

      <button className="button" onClick={() => setNewTask(true)}>
        New Task
      </button>
      <div>
        <span>Search: </span>
        <input
          type="text"
          placeholder="Search Tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {newTask && (
        <Card
          newTask={newTask}
          setNewTask={setNewTask}
          fetchTasks={fetchTasks}
        />
      )}

      {/* Add search using title and description */}

      {tasks
        .filter((task) => {
          if (search === "") {
            return task;
          } else if (
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase())
          ) {
            return task;
          }
        })
        .map((task) => (
          <Card key={task.id} {...task} fetchTasks={fetchTasks} />
        ))}
    </div>
  );
}

export default TaskAPP;
