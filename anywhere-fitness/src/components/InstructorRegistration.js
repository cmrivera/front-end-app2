import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Your name should have at least 2 characters")
    .required("Name is a required field"),
  email: yup.string().email("Must be a valid email"),
  username: yup.string().required("Username required"),
  password: yup
    .string()
    .min(6, "Your password should contain at least 6 characters")
    .required("Password is a required field"),
});

export default function InstructorRegistration() {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    console.log(e.target.value);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted!");
    axios
      .post(
        "https://anywhere-fitness-ptbw.herokuapp.com/api/auth/register/instructor",
        formState
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={formSubmit}>
      <h1>Instructor Registration</h1>
      <label htmlFor="name">
        <h5>Name</h5>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name here..."
          value={formState.name}
          onChange={inputChange}
        />
        {errorState.name.length > 0 ? (
          <p className="error">{errorState.name}</p>
        ) : null}
      </label>
      <label htmlFor="email">
        <h5>Email</h5>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email here..."
          value={formState.email}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="username">
        <h5>Username</h5>
        <input
          name="username"
          id="username"
          placeholder="Enter username here..."
          value={formState.username}
          onChange={inputChange}
        />
        {errorState.username.length > 0 ? (
          <p className="error">{errorState.username}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        <h5>Password</h5>
        <input
          name="password"
          id="password"
          placeholder="Enter password here..."
          value={formState.password}
          onChange={inputChange}
        />
      </label>
      <div>
        <p>
          <button type="submit">Register</button>
        </p>
      </div>
      <div>
        <button>Sign up as an instructor</button>
      </div>
    </form>
  );
}
