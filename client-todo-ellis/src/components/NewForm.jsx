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
  const [erFerdig, setErFerdig] = useState(false);
  useEffect(() => {
    if (editTodoObj != null) {
      setEmne(editTodoObj.emne);
      setDato(editTodoObj.dato);
    }
  }, [editTodoObj]);

  const handleSubmit = (formData) => {
    formData.preventDefault();
    debugger;
    if (formData == null) return;

    const { target } = formData;
    const todoObj = Object.fromEntries(new FormData(target));

    let date = new Date(todoObj.startDato);
    let desc = todoObj.beskrivelse;
    let id = editTodoObj?.id;
    let status = editTodoObj?.erFerdig;

    if (id == null || id === 0) {
      let payload = {
        date: date,
        description: desc,
        isFinished: status,
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
      debugger;
      let payload = {
        id: id,
        date: date,
        description: desc,
        isFinished: status,
      };
      todoApi.apiV1TodoPut({ body: payload }, (error, data, response) => {
        if (response != null) {
          setTodoList([...todoList, response?.body]);
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
            console.log("Value of date ::: ", e.target.value);
          }}
        />

        <span>Todo status</span>
        <select
          id="erFerdig"
          name="erFerdig"
          value={erFerdig}
          onchange={(e) => setErFerdig(e.target.value)}
        />

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
