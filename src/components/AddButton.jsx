/* eslint-disable react/prop-types */
import { AiOutlinePlusCircle } from "react-icons/ai";

function AddButton({ onClick }) {
  return (
    <AiOutlinePlusCircle role="button" onClick={onClick} className="btn-add" />
  );
}

export default AddButton;
