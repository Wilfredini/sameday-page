/* eslint-disable react/prop-types */

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn-ui">
      {children}
    </button>
  );
}

export default Button;
