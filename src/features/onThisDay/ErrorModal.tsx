import React, { useCallback, useState, FC } from "react";
import Modal from "react-modal";
import { BirthsOnThisDayState } from "./birthsSlice";

interface ErrorModalProps {
  message?: string;
  status: BirthsOnThisDayState["status"];
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 10,
  },
};

export const ErrorModal: FC<ErrorModalProps> = (props) => {
  const { message, status } = props;
  const [isOpen, setIsOpen] = useState<boolean>(status === "error");
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Error"
      style={customStyles}
    >
      <div className="flex flex-col justify-between">
        <div>{message}</div>
        <button
          type="reset"
          onClick={closeModal}
          className="h-8 w-full border border-red-300 text-red-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
