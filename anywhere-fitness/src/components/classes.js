import React, { useContext } from "react";
import ClassContext from "./Utils/Context";
import Smurf from "./Smurf";

export default function classes() {
  const { classes } = useContext(ClassContext);
  console.log("comp", classes);
  return (
    <div>
      <h1>Our New Class List</h1>
      <>
        {classes.map((list) => (
          <Smurf key={list.id} list={list} />
        ))}
      </>
    </div>
  );
}
