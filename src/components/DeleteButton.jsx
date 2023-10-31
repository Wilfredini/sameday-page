/* eslint-disable react/prop-types */
import { AiOutlineMinusCircle } from "react-icons/ai";

function DeleteButton({ onClick }) {
  return (
    <AiOutlineMinusCircle
      role="button"
      onClick={onClick}
      className="btn-delete"
    />
  );
}

export default DeleteButton;
