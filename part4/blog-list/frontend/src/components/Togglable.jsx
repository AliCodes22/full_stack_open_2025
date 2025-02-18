import { useState } from "react";

const Togglable = ({ buttonLabel, children, setIsFormVisible }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = {
    display: visible ? "none" : "",
  };

  const showWhenVisible = {
    display: visible ? "" : "none",
  };

  const toggleVisibility = () => {
    const newVisibility = !visible;
    setVisible(newVisibility);
    setIsFormVisible(newVisibility);
  };

  return (
    <div>
      {!visible && <button onClick={toggleVisibility}>{buttonLabel}</button>}

      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Togglable;
