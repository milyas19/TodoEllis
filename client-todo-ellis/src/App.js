import React, { useState, useEffect } from "react";
import "./App.css";
import { TodoApi } from "../src/api/TodoApi";
import moment from "moment";
import { NewForm } from "./components/NewForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const todoApi = new TodoApi();
const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [aapneNyttSkjema, setAapneNyttSkjema] = useState(false);
  const [openEditSkjema, setOpenEditSkjema] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  useEffect(() => {
    todoApi.apiV1TodoGet((error, data, response) => {
      setTodoList(response.body);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function deleteById(deletedTodo) {
    todoApi.apiV1TodoIdDelete(deletedTodo, (error, data, response) => {
      if (data === true) {
        toast.info("Raden er slettet 🎉 !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (response.text != null) {
        console.log(response.text);
      }
    });
  }

  const updateTodoObj = (e, item) => {
    setEditTodo({
      emne: item.description,
      dato: moment(item.date).format("yyyy-MM-DD"),
      id: item.id,
      erFerdig: item.isFinished,
    });
  };

  console.log(editTodo);
  return (
    <div className="App">
      <div className="App-header">
        <header>Elisabeth sin TodoApp</header>
        <button
          type="button"
          onClick={() => {
            setAapneNyttSkjema(true);
            setOpenEditSkjema(false);
          }}
        >
          {" "}
          Opprett ny oppgave
        </button>
      </div>
      {aapneNyttSkjema ? (
        <NewForm
          aapneNyttSkjema={aapneNyttSkjema}
          setAapneNyttSkjema={setAapneNyttSkjema}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ) : (
        <></>
      )}
      <div>
        <table id="customers">
          <thead>
            <tr>
              <th>Dato</th>
              <th>Beskrivelse</th>
              <th>Status</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {todoList?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                  <td>{item.description}</td>
                  <td>{item.isFinished === true ? "Completed" : "Active"}</td>
                  <td>
                    <button
                      type="button"
                      className="editButton"
                      id={item.id}
                      value={item}
                      onClick={(e) => {
                        updateTodoObj(e, item);
                        setOpenEditSkjema(true);
                        setAapneNyttSkjema(false);
                      }}
                    >
                      Rediger
                    </button>
                    /
                    <button
                      type="button"
                      className="deleteButton"
                      id={item.id}
                      onClick={() => {
                        deleteById(item.id);

                        let index = todoList.findIndex((x) => x.id === item.id);
                        setTodoList([
                          ...todoList.slice(0, index),
                          ...todoList.slice(index + 1, todoList.length),
                        ]);
                      }}
                    >
                      Slett
                    </button>
                  </td>
                </tr>
              );
            })}
            {openEditSkjema ? (
              <NewForm
                aapneNyttSkjema={null}
                setAapneNyttSkjema={null}
                todoList={todoList}
                setTodoList={setTodoList}
                editTodoObj={editTodo}
                openEditSkjema={openEditSkjema}
                setOpenEditSkjema={setOpenEditSkjema}
              />
            ) : (
              <></>
            )}
            <ToastContainer />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
