"use client";

import React, { useEffect, useState } from "react";
import { parse } from "date-fns";

type Task = {
  id: number;
  task_name: string;
  task_description: string;
  start_time: string;
  end_time: string;
  water_intake: number;
  task_points: number;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    task_name: "",
    task_description: "",
    start_time: "",
    end_time: "",
    water_intake: "",
    task_points: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const newTask: Task = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setForm({
          task_name: "",
          task_description: "",
          start_time: "",
          end_time: "",
          water_intake: "",
          task_points: "",
        });
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Function to parse time strings into Date objects for sorting
  const parseTime = (time: string) => {
    return parse(time, "h:mm a", new Date()); // Parses time like "7:10 AM"
  };

  // Sort tasks by start_time
  const sortedTasks = [...tasks].sort((a, b) => {
    return (
      parseTime(a.start_time).getTime() - parseTime(b.start_time).getTime()
    );
  });

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="task_name"
          value={form.task_name}
          onChange={handleChange}
          placeholder="Task Name"
          required
        />
        <input
          type="text"
          name="task_description"
          value={form.task_description}
          onChange={handleChange}
          placeholder="Task Description"
          required
        />
        <input
          type="text"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          placeholder="Start Time (e.g., 7:10 AM)"
          required
        />
        <input
          type="text"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          placeholder="End Time (e.g., 7:30 AM)"
          required
        />
        <input
          type="number"
          name="water_intake"
          value={form.water_intake}
          onChange={handleChange}
          placeholder="Water Intake (glasses)"
          required
        />
        <input
          type="number"
          name="task_points"
          value={form.task_points}
          onChange={handleChange}
          placeholder="Task Points"
          required
        />
        <button type="submit">Create Task</button>
      </form>

      {sortedTasks.length === 0 ? (
        <p>Loading tasks...</p>
      ) : (
        sortedTasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ddd",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h2>{task.task_name}</h2>
            <p>{task.task_description}</p>
            <p>
              <strong>Start Time:</strong> {task.start_time}
            </p>
            <p>
              <strong>End Time:</strong> {task.end_time}
            </p>
            <p>
              <strong>Water Intake:</strong> {task.water_intake} glass
            </p>
            <p>
              <strong>Points:</strong> {task.task_points}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
