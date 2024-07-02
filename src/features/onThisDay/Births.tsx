import React, { ComponentProps, FC } from "react";
import { Button, Link } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchBirths } from "./birthsSlice";
import { PersonInfo } from "../../types";
import defaultImage from "../../assets/default_image.png";

type PersonBirthProps = Pick<
  PersonInfo,
  | "content_urls"
  | "description"
  | "thumbnail"
  | "text"
  | "titles"
  | "year"
  | "month"
  | "day"
>;

const Linkless = (props: ComponentProps<"div">) => <div>{props.children}</div>;

export const PersonBirth: FC<PersonBirthProps> = (props) => {
  const {
    content_urls,
    description,
    thumbnail,
    text,
    titles,
    year,
    month,
    day,
  } = props;

  const Wrapper = content_urls?.desktop?.page ? Link : Linkless;

  return (
    <Wrapper
      href={content_urls?.desktop.page ?? ""}
      className="relative block"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={thumbnail?.source ?? defaultImage}
        alt="profile"
        className="h-fit w-full object-cover"
      />
      <div>{titles?.normalized ?? text}</div>
      <div>{description}</div>
      <div>
        Born {month}-{day}-{year}
      </div>
    </Wrapper>
  );
};

export const Births = () => {
  const { persons, status } = useAppSelector((state) => state.births);
  const dispatch = useAppDispatch();
  const handleGetBirthdays = () => {
    dispatch(fetchBirths());
  };

  return (
    <div>
      <Button type="button" variant="contained" onClick={handleGetBirthdays}>
        Birthdays
      </Button>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {persons.map((person, index) => {
            return <PersonBirth key={person.tid ?? index} {...person} />;
          })}
        </div>
      )}
    </div>
  );
};
