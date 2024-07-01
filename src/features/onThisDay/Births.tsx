import React, { FC } from "react";
import { Button, Link } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchBirths } from "./birthsSlice";
import { PersonBirthInfo } from "../../types";

type PersonBirthProps = Omit<PersonBirthInfo, "id">;

export const PersonBirth: FC<PersonBirthProps> = (props) => {
  const { text, thumbnail, description, year, month, day, pageLink } = props;
  return (
    <Link href={pageLink} className="relative block">
      <img
        src={thumbnail?.source}
        alt="profile"
        className="h-5/6 w-full object-cover"
      />
      <div>{text}</div>
      <div>{description}</div>
      <div>
        Born {month}-{day}-{year}
      </div>
    </Link>
  );
};

export const Births = () => {
  const { persons, status } = useAppSelector((state) => state.births);
  const dispatch = useAppDispatch();
  const handleGetBirthdays = () => {
    dispatch(fetchBirths());
  };

  console.log("persons", persons);

  return (
    <div>
      <Button type="button" variant="contained" onClick={handleGetBirthdays}>
        Birthdays
      </Button>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {persons.map((person) => {
            return <PersonBirth key={person.id} {...person} />;
          })}
        </div>
      )}
    </div>
  );
};
