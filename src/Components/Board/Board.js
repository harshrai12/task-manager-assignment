import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

function Board(props) {
  // State to control the visibility of the dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="board">
      <div className="board_header">
        {/* Display the board title and the number of cards */}
        <p className="board_header_title">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0} </span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          {/* Display the "More" icon and show the dropdown when clicked */}
          <MoreHorizontal />
          {/* Show the dropdown component when `showDropdown` is true */}
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              {/* Provide an option to delete the board */}
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      {/* Display a placeholder line */}
      <> </>
      <div className="board_cards custom-scroll">
        {/* Render the cards for the board */}
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        {/* Render an editable component to add a new card */}
        <Editable
          text="+ Add task"
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;

