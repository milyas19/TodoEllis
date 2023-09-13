import React, { useState } from "react";
import { TodoApi } from "../api/TodoApi";

const todoApi = new TodoApi();

export const NewForm = ({ elisabeth, kenneth, todoList, setTodoList }) => {
  const [emne, setEmne] = useState("");
  const [dato, setDato] = useState("");

  const handleSubmit = (formData) => {
    formData.preventDefault();
    if (formData == null) return;

    const { target } = formData;
    const todoObj = Object.fromEntries(new FormData(target));

    let date = new Date(todoObj.startDato);
    let desc = todoObj.beskrivelse;

    let payload = {
      date: date,
      description: desc,
    };
    todoApi.apiV1TodoPost({ body: payload }, (error, data, response) => {
      if (response != null) {
        console.log(response);
        setTodoList([...todoList, response?.body]);
      }
      kenneth(false);
    });
  };

  return (
    <dialog open>
      <div>NewForm</div>
      <form
        method="dialog"
        onSubmit={(formData) => {
          debugger;
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
          onChange={(e) => setDato(e.target.value)}
        />

        <button type="submit">OK</button>
      </form>
    </dialog>
  );
};
