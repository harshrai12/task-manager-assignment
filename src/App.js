import React, { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import "./App.css";
import Editable from "./Components/Editabled/Editable";


function App() {
  //for toggling darkmode
  const [theme,setTheme]= useState('dark-theme');
  useEffect(()=>{
   document.body.className=theme;
  },[theme]);

  const handletheme=()=>{
    if(theme==="light-theme"){
      setTheme("dark-theme");
    }
    else {
      setTheme("light-theme");
    }
    
  }
  //local storage of boards
  const [boards, setBoards] = useState(() => {
    const storedBoards = localStorage.getItem("kanban");
    return storedBoards ? JSON.parse(storedBoards) : [
      {
        id: Date.now() + Math.random() * 2,
        title: "Todo",
        cards: [
          {
            id: Date.now() + Math.random(),
            title: "Conquer the Dragon's Lair",
            tasks: [
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Gather weapons and armor",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Study the dragon's weaknesses",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Recruit allies for the battle",
              },
            ],
            labels: [],
            desc: "Embark on a thrilling journey to defeat the mighty dragon and claim its treasure.",
          },
          {
            id: Date.now() + Math.random(),
            title: "Explore the Enchanted Forest",
            tasks: [
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Discover hidden pathways",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Seek guidance from mystical creatures",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Collect rare herbs and magical artifacts",
              },
            ],
            labels: [],
            desc: "Delve into the mysterious depths of the forest, uncovering hidden secrets and magical creatures.",
          },
        ],
      },
      {
        id: Date.now() + Math.random() * 2,
        title: "In Progress",
        cards: [
          {
            id: Date.now() + Math.random(),
            title: "Retrieve the Lost Relic",
            tasks: [
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Decode ancient inscriptions",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Navigate treacherous traps",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Outsmart cunning guardians",
              },
            ],
            labels: [],
            desc: "Embark on a perilous mission to recover the ancient artifact and save the world from darkness.",
          },
          {
            id: Date.now() + Math.random(),
            title: "Battle the Ferocious Beasts",
            tasks: [
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Train in advanced combat techniques",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Find and exploit creature weaknesses",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Assemble a team of skilled warriors",
              },
            ],
            labels: [],
            desc: "Engage in epic battles against fearsome creatures that roam the land, testing your strength and valor.",
          },
        ],
      },
      {
        id: Date.now() + Math.random() * 2,
        title: "Done",
        cards: [
          {
            id: Date.now() + Math.random(),
            title: "Uncover the Secrets of the Ancient Temple",
            tasks: [
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Solve intricate puzzles",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Invoke ancient incantations",
              },
              {
                id: Date.now() + Math.random(),
                completed: false,
                text: "Face the guardians of the temple",
              },
            ],
            labels: [],
            desc: "Embark on a mystical journey to unlock the hidden wisdom and power of the ancient temple.",
          },
        ],
      },
    ];
    
    
    
  });

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(boards));
  }, [boards]);



  
  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });
  const addboardHandler = (name) => {
    // Create a copy of the boards array using the spread operator
    const tempBoards = [...boards];
    // Create a new board object
    tempBoards.push({
      // Generate a unique ID for the new board
      id: Date.now() + Math.random() * 2,
      // Set the provided name as the title of the new board
      title: name,
      // Initialize an empty array for the cards property of the new board
      cards: [],
    });
    // Update the state with the new boards array, triggering a re-render
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    // Find the index of the board with the given id in the boards array
    const index = boards.findIndex((item) => item.id === id);
    // If the board is not found, return without making any changes
    if (index < 0) return;
    // Create a copy of the boards array using the spread operator
    const tempBoards = [...boards];
    // Remove the board at the found index from the tempBoards array
    tempBoards.splice(index, 1);
    // Update the state with the modified tempBoards array, triggering a re-render
    setBoards(tempBoards);
  };
  /**

Adds a new card to the cards array of a specific board in the boards array.
Find the index of the board with the given ID in the boards array.
If the board is not found (index < 0), return without making any changes.
Create a copy of the boards array using the spread operator.
Push a new card object to the cards array of the specified board.
Generate a unique ID for the new card using Date.now() and Math.random().
Set the provided title for the new card.
Initialize an empty array for labels.
Set an empty string for the date.
Initialize an empty array for tasks.
Update the state with the modified tempBoards array, triggering a re-render.
*/
  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    // Find the index of the board with the given board ID in the boards array
    const index = boards.findIndex((item) => item.id === bid);
    
    // If the board is not found, return without making any changes
    if (index < 0) return;
    
    // Create a copy of the boards array using the spread operator
    const tempBoards = [...boards];
    
    // Retrieve the cards array of the specified board
    const cards = tempBoards[index].cards;
    
    // Find the index of the card with the given card ID in the cards array
    const cardIndex = cards.findIndex((item) => item.id === cid);
    
    // If the card is not found, return without making any changes
    if (cardIndex < 0) return;
    
    // Remove the card from the cards array using the splice() method
    cards.splice(cardIndex, 1);
    
    // Update the state with the modified tempBoards array, triggering a re-render
    setBoards(tempBoards);
  };

  const updateCard = (bid, cid, card) => {
    // Find the index of the board with the given board ID in the boards array
    const index = boards.findIndex((item) => item.id === bid);
    
    // If the board is not found, return without making any changes
    if (index < 0) return;
    
    // Create a copy of the boards array using the spread operator
    const tempBoards = [...boards];
    
    // Retrieve the cards array of the specified board
    const cards = tempBoards[index].cards;
    
    // Find the index of the card with the given card ID in the cards array
    const cardIndex = cards.findIndex((item) => item.id === cid);
    
    // If the card is not found, return without making any changes
    if (cardIndex < 0) return;
    
    // Update the card at the specified index with the provided card object
    tempBoards[index].cards[cardIndex] = card;
    
    // Update the state with the modified tempBoards array, triggering a re-render
    setBoards(tempBoards);
  };
  

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
  
    // Find the index of the source board in the 'boards' array
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return; // If source board is not found, exit the function
  
    // Find the index of the source card within the source board
    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex((item) => item.id === cid);
    if (s_cardIndex < 0) return; // If source card is not found, exit the function
  
    // Find the index of the target board in the 'boards' array
    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return; // If target board is not found, exit the function
  
    // Find the index of the target card within the target board
    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex((item) => item.id === targetCard.cid);
    if (t_cardIndex < 0) return; // If target card is not found, exit the function
  
    // Create a copy of the 'boards' array
    const tempBoards = [...boards];
  
    // Get the source card from the source board
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
  
    // Remove the source card from the source board using splice
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
  
    // Insert the source card at the target card's index within the target board using splice
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
  
    // Update the 'boards' state with the modified 'tempBoards' array
    setBoards(tempBoards);
  
    // Reset the target card values to empty
    setTargetCard({
      bid: "",
      cid: "",
    });
  };
  
  const dragEntered = (bid, cid) => {
    // If the current target card is the same as the entered card, return early
    if (targetCard.cid === cid) return;
  
    // Set the target card to the entered card
    setTargetCard({
      bid,
      cid,
    });
  };
  

 

  return (
    <div className="app">
      <div className="app_nav">
        <h1>Kanban Board</h1>
        <button onClick={handletheme} className="theme"> Switch theme</button>
        <div>
    </div>
      </div>
      <div className="app_boards_container">
        <div className="app_boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
          <div className="app_boards_last">
          <Editable
          displayClass="app_boards_add-board"
          editClass="app_boards_add-board_edit"
          placeholder="Enter Board Name"
          text="Add Board"
          buttonText="Add Board"
          // Specify the callback function to be invoked when the form is submitted
          onSubmit={addboardHandler}
        />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
