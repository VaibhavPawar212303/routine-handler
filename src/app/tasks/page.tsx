"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

type Task = {
  id: number;
  task_name: string;
  task_description: string;
  start_time: string;
  end_time: string;
  water_intake: number;
  task_points: number;
  created_by: string;
  created_Date: string;
  status: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [editTaskId, setEditTaskId] = useState<number | null>(null); // Store task id being edited
  const [searchTaskName, setSearchTaskName] = useState("");
  const [searchCreatedBy, setSearchCreatedBy] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [form, setForm] = useState({
    task_name: "",
    task_description: "",
    start_time: "",
    end_time: "",
    water_intake: "",
    task_points: "",
    created_by: "",
    status: "Not Completed", // Default status
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (response.ok) {
          const data: Task[] = await response.json();
          setTasks(data);
          setFilteredTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return (
      new Date(a.created_Date).getTime() - new Date(b.created_Date).getTime()
    );
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `/api/tasks/${editTaskId}` : "/api/tasks";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        if (isEditing) {
          // Update task in the list without fetching all tasks again
          // @ts-expect-error
          setTasks(tasks.map((task) =>
              task.id === editTaskId ? { ...task, ...form } : task
            )
          );
        } else {
          const newTask: Task = await response.json();
          setTasks((prevTasks) => [...prevTasks, newTask]);
        }

        setForm({
          task_name: "",
          task_description: "",
          start_time: "",
          end_time: "",
          water_intake: "",
          task_points: "",
          created_by: "",
          status: "Not Completed", // Reset status to default
        });
        setFormVisible(false);
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        console.error("Failed to save task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEdit = (task: Task) => {
    setForm({
      task_name: task.task_name,
      task_description: task.task_description,
      start_time: task.start_time,
      end_time: task.end_time,
      water_intake: String(task.water_intake),
      task_points: String(task.task_points),
      created_by: task.created_by,
      status: task.status, // Set status for editing
    });
    setEditTaskId(task.id);
    setIsEditing(true);
    setFormVisible(true);
  };

  const handleFilter = () => {
    const filtered = tasks.filter(
      (task) =>
        task.task_name.toLowerCase().includes(searchTaskName.toLowerCase()) &&
        task.created_by.toLowerCase().includes(searchCreatedBy.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>
        <button
          onClick={() => {
            setFormVisible(true);
            setIsEditing(false);
            setEditTaskId(null);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={searchTaskName}
          onChange={(e) => setSearchTaskName(e.target.value)}
          placeholder="Filter by Task Name"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          value={searchCreatedBy}
          onChange={(e) => setSearchCreatedBy(e.target.value)}
          placeholder="Filter by Created By"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      {formVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Task" : "Create New Task"}
            </h2>
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
              <input
                type="text"
                name="created_by"
                value={form.created_by}
                onChange={handleChange}
                placeholder="Created By"
                required
                className="w-full px-4 py-2 border rounded"
              />

              {/* Dropdown for Task Status */}
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="Not Completed">Not Completed</option>
                <option value="Completed">Completed</option>
              </select>

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
                  {isEditing ? "Save Changes" : "Save Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-4">
        {sortedTasks.length > 0 ? (
          <ul className="space-y-4">
            {sortedTasks.map((task) => (
              <li
                key={task.id}
                className="bg-white p-4 rounded shadow relative"
              >
                {/* Edit Icon in the Upper Right Corner */}
                <button
                  onClick={() => handleEdit(task)}
                  className="absolute top-2 right-2 text-blue-500"
                  aria-label="Edit Task"
                >
                  <FontAwesomeIcon icon={faEdit} size="lg" />
                </button>

                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <h3 className="text-lg font-semibold">{task.task_name}</h3>
                <p>{task.task_description}</p>
                <p>
                  <strong>Time:</strong> {task.start_time} - {task.end_time}
                </p>
                <p>
                  <strong>Water Intake:</strong> {task.water_intake} glasses
                </p>
                <p>
                  <strong>Points:</strong> {task.task_points}
                </p>
                <p>
                  <strong>Created By:</strong> {task.created_by}
                </p>
                <p>
                  <strong>Created Date:</strong>{" "}
                  {new Date(task.created_Date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}
