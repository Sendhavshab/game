import React, { useCallback, useEffect, useState } from "react";
import Monster from "./Monster";
import Food from "./Food";

const App = () => {
const [ positionDown, setPositionDown ] = useState(0) 
const [ positionX, setPositionX ] = useState(0) 
 const [ monsterNum, setMonsterNum ] = useState(1) 
 const [ gameOver, setGameOver ] = useState(false)
 const [ score, setScore ] = useState(0)  
 const [ imoge, setImoge ] = useState("😊") 
   const handleDown = () => {
    
     setPositionDown( positionDown !== 90 ?  positionDown + 5 : 90)

   };
   const handleUp = () => {
     setPositionDown(positionDown !== 0 ? positionDown - 5 : 0);
   };
   const handleRight = () => {
     setPositionX(positionX !== 95 ? positionX + 2.5 : 0);
   };
   const handleLeft = () => {
     setPositionX(positionX !== 0 ? positionX - 2.5 : 0);
   };


   

  const keyRun = 
    (e) => {
      e.preventDefault();

      if (e.key === "ArrowDown" && positionDown !== 90){
        handleDown();

      }
      if (e.key === "ArrowUp" && positionDown !== 0){
        handleUp();

      }
      if (e.key === "ArrowLeft" && positionX !== 0) {
        handleLeft();
      }
      if (e.key === "ArrowRight" && positionX !== 95) {
        handleRight();
      }
    }


  useEffect(() => {
    if(!gameOver){

      window.addEventListener("keydown", keyRun);
    }

    return () => {
      window.removeEventListener("keydown", keyRun);
    };
  }, [ positionX, positionDown]);



   useEffect(() => {
     if (!gameOver) {
       const inter = setInterval(
         () => {
           setMonsterNum((p) => p + 1);
         },
         monsterNum > 3 ? 5000 : 15000
       );

       return () => {
         clearInterval(inter);
       };
     }
   }, [monsterNum]);
  // //  useEffect(() => {} , [])





// console.log();
  return (
    <div className="w-screen h-screen ">
      {gameOver && (
        <h1 className="fixed flex justify-center  items-center z-30 font-black inset-0 right-0 bottom-0 bg-black bg-opacity-90 text-white text-3xl">
          GameOver <button onClick={() => {
//             setGameOver(false);
//             setScore(0);
//             setMonsterNum(0);
//           setPositionDown(0);

// setPositionX(0)
window.location.reload();

          }} className="p-2 bg-green-400 border-4 rounded-xl border-blue-700 text-red-700 m-2">Re start</button>
        </h1>
      )}
      <h2 className="text-3xl font-bold">score: {score}</h2>

      <div className="my-4 h-2/3 aspect-video p-2 w-2/3 bg-cover relative text-white  bg-black bg-[url('/bg.png')] m-auto ">
        <div
          style={{ top: positionDown + "%", left: positionX + "%" }}
          className=" absolute  w-9 text-2xl h-9 bg- rounded-full"
        >
          {imoge}
        </div>
        <Food
          setImoge={setImoge}
          setScore={setScore}
          positionX={positionX}
          positionDown={positionDown}
          ></Food>
        {[...Array(monsterNum)].map((_, index) => {
          return (
            <Monster
            setImoge={setImoge}
              setGameOver={setGameOver}
              key={index}
              positionX={positionX}
              positionDown={positionDown}
            ></Monster>
          );
        })}
      </div>

      <button
        disabled={positionDown === 90}
        onClick={handleDown}
        className=" disabled:bg-gray-700 p-2 m-2 bg-black rounded-full text-white font-bold"
      >
        go Down
      </button>
      <button
        disabled={positionDown === 0}
        onClick={handleUp}
        className=" disabled:bg-gray-700 m-2 p-2 bg-black rounded-full text-white font-bold"
      >
        go up
      </button>
      <button
        disabled={positionX === 95}
        onClick={handleRight}
        className=" disabled:bg-gray-700 m-2 p-2 bg-black rounded-full text-white font-bold"
      >
        go right
      </button>
      <button
        disabled={positionX === 0}
        onClick={handleLeft}
        className=" disabled:bg-gray-700 m-2 p-2 bg-black rounded-full text-white font-bold"
      >
        go left
      </button>
    </div>
  );
};

export default App;
