import React, { useState } from "react";
import { TodoApi } from "../api/TodoApi";

const todoApi = new TodoApi();

export const NewForm = ({ elisabeth, kenneth }) => {
  const [emne, setEmne] = useState("");
  const [dato, setDato] = useState("");

  function handleSubmit(formData) {
    debugger;
    if (formData == null) return;
    formData.preventDefault();
    const { target } = formData;
    const todoObj = Object.fromEntries(new FormData(target));

    debugger;

    let date = todoObj.dato;
    let desc = todoObj.emne;

    let payload = {
      date: date,
      description: desc,
    };
    todoApi.apiV1TodoPost({ body: payload }, (error, data, response) => {
      debugger;
      console.log(response);
    });
  }

  return (
    <dialog open>
      <div>NewForm</div>
      <form method="dialog" onSubmit={handleSubmit}>
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

        <button type="button" onClick={() => kenneth(false)}>
          OK
        </button>
      </form>
    </dialog>
  );
};
