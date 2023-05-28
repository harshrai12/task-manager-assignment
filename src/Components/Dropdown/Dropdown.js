import React, { useEffect, useRef } from "react";

function Dropdown(props) {
  // Create a ref object using useRef()
  const dropdownRef = useRef();

  // Handle click events outside the dropdown
  const handleClick = (event) => {
    // Check if dropdownRef exists and if the clicked target is not contained within the dropdown
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    ) {
      // Call the onClose function to handle closing the dropdown
      props.onClose();
    }
  };

  // Add click event listener when the component mounts
  useEffect(() => {
    // Attach the event listener to the document
    document.addEventListener("click", handleClick);

    // Cleanup function: Remove the event listener when the component unmounts or when the useEffect dependencies change
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      // Attach the dropdownRef to the div element using the ref attribute
      ref={dropdownRef}
      className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
