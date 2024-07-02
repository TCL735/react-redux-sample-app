import React, { ComponentProps, FC } from "react";
import { GridLoader } from "react-spinners";
import { ErrorModal } from "./ErrorModal";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { clear, fetchBirths } from "./birthsSlice";
import { PersonInfo } from "../../types";
import defaultImage from "../../assets/default_image.png";

const BirthdayLabel = () => <div>🎂 Birthdays</div>;

const Link = ({ children, ...props }: ComponentProps<"a">) => (
  <a {...props}>{children}</a>
);

const Linkless = ({ children, ...props }: ComponentProps<"div">) => (
  <div {...props}>{children}</div>
);

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
      href={content_urls?.desktop?.page ?? ""}
      className="border border-black no-underline text-black p-1 flex flex-col justify-between"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={thumbnail?.source ?? defaultImage}
        alt="profile"
        className="h-fit w-full object-cover grow-0"
      />
      <div className="flex flex-col items-center justify-center grow">
        <div>{titles?.normalized ?? text}</div>
        <div>{description}</div>
        <div>
          Born {month}-{day}-{year}
        </div>
      </div>
    </Wrapper>
  );
};

interface BirthdaListProps {
  persons: PersonInfo[];
}
export const BirthdayList: FC<BirthdaListProps> = ({ persons }) => {
  const dispatch = useAppDispatch();
  const clearResults = () => dispatch(clear());

  return (
    <div className="flex flex-col">
      {persons.length ? (
        <button
          type="reset"
          onClick={clearResults}
          className="self-end mr-2 mb-2"
        >
          x clear results
        </button>
      ) : null}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {persons.map((person, index) => {
          return <PersonBirth key={person.tid ?? index} {...person} />;
        })}
      </div>
    </div>
  );
};

export const Births = () => {
  const { persons, status, errorMessage } = useAppSelector(
    (state) => state.births,
  );
  const dispatch = useAppDispatch();
  const handleGetBirthdays = () => {
    dispatch(fetchBirths());
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-10">
      <button
        type="button"
        className="w-80 border border-sky-500 bg-sky-500 text-white"
        onClick={handleGetBirthdays}
      >
        <BirthdayLabel />
      </button>
      {status === "loading" ? (
        <GridLoader color="#0EA5E9" size={100} />
      ) : (
        <>
          <ErrorModal
            status={status}
            message={
              errorMessage.length
                ? errorMessage
                : "Error: unable to fetch birthdays"
            }
          />
          <BirthdayList persons={persons} />
        </>
      )}
    </div>
  );
};
