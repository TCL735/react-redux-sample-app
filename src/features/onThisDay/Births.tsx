import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchBirths } from "./birthsSlice";

export const Births = () => {
  const { persons, status } = useAppSelector((state) => state.births);
  const dispatch = useAppDispatch();
  const handleGetBirthdays = () => {
    dispatch(fetchBirths());
  };

  console.log("persons", persons);
  return (
    <div>
      <button onClick={handleGetBirthdays}>Get Birthdays On This Day</button>
      <div>STATUS: {status}</div>
      {persons.map((person) => {
        console.log("person:", person);
        return <div key={person.id}>{person.text}</div>;
      })}
    </div>
  );
};
