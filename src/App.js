import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AddTask from "./components/AddTask";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  /**
   * Remember this state is immutable, hence setTasks is used not tasks.push()
   */
  const [tasks, setTasks] = useState([]);

  //Step 1
  const [showAddTask, setShowAddTask] = useState(false);

  /**
   * On loading page whatever needs to happen, needs to go under useEffect.
   */
  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };
    getTasks();
  }, []);

  /**
   * Fetch list of tasks
   * @returns JSON
   */
  const fetchTasks = async () => {
    const res = await fetch("https://my-json-server.typicode.com/officialbidisha/React-Task-Reminder/tasks");
    const data = await res.json();
    console.log(data);
    return data;
  };

  /**
   * Fetch a single task based on id
   */
  const fetchTask = async (id) => {
    const res = await fetch(`https://my-json-server.typicode.com/officialbidisha/React-Task-Reminder/tasks?id=${id}`);
    const data = res.json();
    return data;
  };

  /**
   * Adds tasks to the list of task
   * @param {*} task
   */

  const addTask = async (task) => {
    console.log(task);
    const res = await fetch("https://my-json-server.typicode.com/officialbidisha/React-Task-Reminder/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    /**
     *
     */
    setTasks([...tasks, data]);
  };

  /**
   * Deletes a task having specific id
   * @param {*} id
   */
  const deleteTask = async (id) => {
    await fetch(`https://my-json-server.typicode.com/officialbidisha/React-Task-Reminder/tasks/{id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'manual',
    }).then((data)=>{
      console.log(data);
    })
    

    setTasks(tasks.filter((task) => task.id !== id));
  };

  /**
   * Toggle reminder of any task
   * @param {*} id
   */
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    debugger;
    const updatedTask = {
      ...taskToToggle[0],
      reminder: !taskToToggle[0].reminder,
    };
    const res = await fetch(`https://my-json-server.typicode.com/officialbidisha/React-Task-Reminder/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    /**
     * This will show the update immediately. Other wise to see the update, we would need to refresh once
     */
    setTasks(
      tasks.map((task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        
      )
    );
  };

  /**
   * Final block that returns DIV
   */
  return (
    <Router>
      <div className='App'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask ? <AddTask onAdd={addTask} />: ''}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  deleteTask={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
