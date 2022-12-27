import React, { Fragment, useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(task);
    setTask("");
    console.log(taskList);
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...taskList, { name, done: false }];
    setTaskList(newTasks);
  };
  const toggleDoneTask = (index: number) => {
    const newTasks: ITask[] = [...taskList];
    newTasks[index].done = !newTasks[index].done;

    setTaskList(newTasks);
  };

  const removeTask = (index: number) => {
    const newTasks = [...taskList];

    newTasks.splice(index, 1);

    setTaskList(newTasks);
  };

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                    className="form-control"
                  />
                  <button className="btn btn-lg btn-primary" type="submit">
                    {" "}
                    save
                  </button>
                </form>
              </div>
            </div>

            {taskList.map((item: ITask, index: number) => (
              <div key={index} className="card card-body mt-2">
                <h2 style={{ textDecoration: item.done ? "line-through" : "" }}>
                  {item.name}
                </h2>
                <button
                  onClick={() => toggleDoneTask(index)}
                  className="btn btn-outline-secondary"
                >
                  {item.done ? "✓" : "❌"}
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="btn btn-outline-secondary"
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
