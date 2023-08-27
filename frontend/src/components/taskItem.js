import { useEffect, useState } from "react";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {

    })

    const handleEdit = (taskId) => {
        const selected = tasks.find(task => task._id === taskId);
        setSelectedTask(selected);
    }

  
}