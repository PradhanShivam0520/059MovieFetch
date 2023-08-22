import { useState } from "react";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleOpen() {
    setIsOpen((open) => !open);
  }

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onOpen={handleOpen} />
      {isOpen && children}
    </div>
  );
}

function ToggleButton({ isOpen, onOpen }) {
  return (
    <button className="btn-toggle" onClick={onOpen}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

/*
function Box1({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  function handleOpen() {
    setIsOpen((open) => !open);
  }

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onOpen={handleOpen} />
      {isOpen && children}
    </div>
  );
}

function Box2({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleOpen() {
    setIsOpen((open) => !open);
  }

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} onOpen={handleOpen} />
      {isOpen && children}
    </div>
  );
}
*/
