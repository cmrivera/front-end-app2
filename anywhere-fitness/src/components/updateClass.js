import React, { useState } from "react";
import axios from "axios";

export default function AddClass(props) {
  const [newClass, setNewClass] = useState({
    id: "",
    name: "",
    type: "",
  });

  const handleChanges = (e) => {
    setNewClass({
      ...newClass,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("class submitted!");
    axios
      .post(
        "https://anywhere-fitness-ptbw.herokuapp.com/api/classes/instructor/:id",
        newClass
      )
      .then((response) =>
        e.setNewClass({
          newClass: [...e.state.newClass, response.data],
        })
      )
      .catch((err) => console.log(err));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("class submitted!");
    axios
      .delete(
        "https://anywhere-fitness-ptbw.herokuapp.com/api/classes/instructor/:id",
        newClass
      )
      .then((response) =>
        e.setNewClass({
          newClass: [...e.state.newClass, response.data],
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <input
        type="number"
        name="Id"
        id=":id"
        value={newClass.id}
        onChange={handleChanges}
        placeholder="class id"
      />
      <input
        type="text"
        name="name"
        value={newClass.class_name}
        onChange={handleChanges}
        placeholder="class name"
      />
      <input
        type="text"
        name="type"
        value={newClass.class_type}
        onChange={handleChanges}
        placeholder="class type"
      />

      <input
        type="text"
        name="StartTime"
        value={newClass.start_time}
        onChange={handleChanges}
        placeholder="start time"
      />
      <input
        type="text"
        name="duration"
        value={newClass.duration}
        onChange={handleChanges}
        placeholder="duration"
      />
      <input
        type="text"
        name="type"
        value={newClass.intensity}
        onChange={handleChanges}
        placeholder="intensity"
      />
      <input
        type="text"
        name="type"
        value={newClass.location}
        onChange={handleChanges}
        placeholder="location"
      />

      <button className="button" onClick={handleSubmit}>
        Add New Class
      </button>
      <button className="button" onClick={handleDelete}>
        Delete Class
      </button>
    </>
  );
}
