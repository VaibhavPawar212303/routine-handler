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
  const [formVisible, setFormVisible] = useState(false); // State to manage popup visibility
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
        setFormVisible(false); // Hide the popup after submitting
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

  const parseTime = (time: string) => {
    return parse(time, "h:mm a", new Date());
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    return (
      parseTime(a.start_time).getTime() - parseTime(b.start_time).getTime()
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <button
        onClick={() => setFormVisible(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Create Task
      </button>

      {formVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="task_name"
                value={form.task_name}
                onChange={handleChange}
                placeholder="Task Name"
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="task_description"
                value={form.task_description}
                onChange={handleChange}
                placeholder="Task Description"
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                placeholder="Start Time (e.g., 7:10 AM)"
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
                placeholder="End Time (e.g., 7:30 AM)"
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                name="water_intake"
                value={form.water_intake}
                onChange={handleChange}
                placeholder="Water Intake (glasses)"
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                name="task_points"
                value={form.task_points}
                onChange={handleChange}
                placeholder="Task Points"
                required
                className="w-full px-4 py-2 border rounded"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        {sortedTasks.length === 0 ? (
          <p>Loading tasks...</p>
        ) : (
          sortedTasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-300 p-4 rounded mb-4"
            >
              <h2 className="text-lg font-bold">{task.task_name}</h2>
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
    </div>
  );
}
