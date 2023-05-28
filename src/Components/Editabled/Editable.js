import React, { useState } from "react";  // Import React and useState hook
import { X } from "react-feather";  // Import X icon from react-feather library

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false);  // Define state variable isEditable, initially set to false
  const [inputText, setInputText] = useState(props.defaultValue || "");  // Define state variable inputText, initially set to props.defaultValue or an empty string
  const [errorMessage, setErrorMessage] = useState("");  // Define state variable errorMessage, initially set to an empty string

  const submission = (e) => {
    e.preventDefault();  // Prevent form submission from refreshing the page

    // Handling the input form validation
    if (inputText.trim().split(" ").length < 2) {  // Check if input text has less than 2 words
      alert("Please enter at least 2 words.");  // Display an alert to the user
      return;  // Exit the function and prevent further processing
    }

    // Passing the input text to whoever calls it through props
    if (inputText && props.onSubmit) {  // Check if input text is not empty and onSubmit prop is provided
      setInputText("");  // Reset inputText state to an empty string
      setErrorMessage("");  // Reset errorMessage state to an empty string
      props.onSubmit(inputText);  // Call the onSubmit function passed through props and pass inputText as an argument
    }
    setIsEditable(false);  // Set isEditable state to false to exit editable mode
  };

  return (
    <div className="editable">
      {isEditable ? (  // Render the form if isEditable state is true
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}  // Apply editable_edit class to form element and add custom editClass if provided
          onSubmit={submission}  // Call submission function when the form is submitted
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}  // Use placeholder prop or fallback to text prop for the input field placeholder
            onChange={(event) => setInputText(event.target.value)}  // Update inputText state as the user types
            autoFocus  // Automatically focus on the input field when it appears
          />
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>   
            <X onClick={() => setIsEditable(false)} className="closeIcon" />  
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}  
        </form>
      ) : (
        <p
          className={`editable_display ${
            props.displayClass ? props.displayClass : ""
          }`}  // Apply editable_display class to p element and add custom displayClass if provided
          onClick={() => setIsEditable(true)}  // Enter editable mode when the text is clicked
        >
          {props.text} 
        </p>
      )}
    </div>
  );
}

export default Editable;


