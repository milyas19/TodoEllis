import React, { useEffect, useState } from "react";
import { TodoApi } from "../api/TodoApi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const todoApi = new TodoApi();

export const NewForm = ({
  aapneNyttSkjema,
  setAapneNyttSkjema,
  todoList,
  setTodoList,
  editTodoObj,
  openEditSkjema,
  setOpenEditSkjema,
}) => {
  const [emne, setEmne] = useState("");
  const [dato, setDato] = useState("");
  const [erFerdigState, setErFerdigState] = useState(false);
  useEffect(() => {
    if (editTodoObj != null) {
      setEmne(editTodoObj.emne);
      setDato(editTodoObj.dato);
      setErFerdigState(editTodoObj.erFerdig);
    }
  }, [editTodoObj]);

  const statusTodo = [
    { id: 1, desc: "Aktiv" },
    { id: 2, desc: "Fullført" },
  ];

  const handleOnChangeStatus = (e) => {
    if (e === "Fullført") {
      setErFerdigState(true);
    } else {
      setErFerdigState(false);
    }
  };

  const handleSubmit = (formData) => {
    formData.preventDefault();

    if (formData == null) return;

    const { target } = formData;
    const todoObj = Object.fromEntries(new FormData(target));

    let date = new Date(todoObj.startDato);
    let desc = todoObj.beskrivelse;
    let id = editTodoObj?.id;

    if (id == null || id === 0) {
      let payload = {
        date: date,
        description: desc,
        isFinished: todoObj?.erFerdig === "Fullført" ? true : false,
      };

      todoApi.apiV1TodoPost({ body: payload }, (error, data, response) => {
        if (response != null) {
          setTodoList([...todoList, response?.body]);
          toast.success("Ny oppgaven er opprettet 🎉 !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (aapneNyttSkjema) setAapneNyttSkjema(false);
        if (openEditSkjema) setOpenEditSkjema(false);
      });
    } else {
      let payload = {
        id: id,
        date: date,
        description: desc,
        isFinished: todoObj?.erFerdig === "Fullført" ? true : false,
      };
      todoApi.apiV1TodoPut({ body: payload }, (error, data, response) => {
        if (response != null) {
          const updatedList = todoList.map((exitingTodoList) => {
            if (exitingTodoList.id === response.body.id) {
              return { ...response.body };
            }
            return exitingTodoList;
          });
          setTodoList(updatedList);
          toast.success(`Oppgaven med id: ${payload.id} er oppdatert 🍬`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (aapneNyttSkjema) setAapneNyttSkjema(false);
        if (openEditSkjema) setOpenEditSkjema(false);
      });
    }
  };

  return (
    <dialog open>
      <div>Todo </div>
      <form
        method="dialog"
        onSubmit={(formData) => {
          handleSubmit(formData);
        }}
      >
        <span>Beskrivelse</span>
        <input
          type="text"
          id="beskrivelse"
          name="beskrivelse"
          value={emne}
          onChange={(event) => {
            setEmne(event.target.value);
          }}
        />

        <span>Start date:</span>
        <input
          type="date"
          id="startDato"
          name="startDato"
          value={dato}
          onChange={(e) => {
            setDato(e.target.value);
          }}
        />

        <span>Todo status: </span>
        <select
          name="erFerdig"
          value={erFerdigState === true ? "Fullført" : "Aktiv"}
          onChange={(e) => handleOnChangeStatus(e.target.value)}
        >
          {statusTodo.map((item, idx) => (
            <option key={idx} value={item.desc}>
              {item.desc}
            </option>
          ))}
        </select>
        <button type="submit">OK</button>
        <button
          type="button"
          onClick={() => {
            if (aapneNyttSkjema) setAapneNyttSkjema(false);
            if (openEditSkjema) setOpenEditSkjema(false);
          }}
        >
          Cancel
        </button>
      </form>
    </dialog>
  );
};
