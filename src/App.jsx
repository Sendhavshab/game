import React, { useCallback, useEffect, useState } from "react";
import Monster from "./Monster";
import Food from "./Food";

const App = () => {
  const [characterPosY, setcharacterPosY] = useState(0);
  const [characterPosX, setCharacterPosX] = useState(0);
  const [monsterNum, setMonsterNum] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [imoge, setImoge] = useState("😊");
  const handleDown = () => {
    setcharacterPosY(characterPosY !== 90 ? characterPosY + 5 : 90);
  };
  const handleUp = () => {
    setcharacterPosY(characterPosY !== 0 ? characterPosY - 5 : 0);
  };
  const handleRight = () => {
    setCharacterPosX(characterPosX !== 95 ? characterPosX + 2.5 : 0);
  };
  const handleLeft = () => {
    setCharacterPosX(characterPosX !== 0 ? characterPosX - 2.5 : 0);
  };

  const keyRun = (e) => {
    e.preventDefault();

    if (e.key === "ArrowDown" && characterPosY !== 90) {
      handleDown();
    }
    if (e.key === "ArrowUp" && characterPosY !== 0) {
      handleUp();
    }
    if (e.key === "ArrowLeft" && characterPosX !== 0) {
      handleLeft();
    }
    if (e.key === "ArrowRight" && characterPosX !== 95) {
      handleRight();
    }
  };

  useEffect(() => {
    if (!gameOver) {
      window.addEventListener("keydown", keyRun);
    }

    return () => {
      window.removeEventListener("keydown", keyRun);
    };
  }, [characterPosX, characterPosY]);

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
          GameOver{" "}
          <button
            onClick={() => {
              //             setGameOver(false);
              //             setScore(0);
              //             setMonsterNum(0);
              //           setcharacterPosY(0);

              // setCharacterPosX(0)
              window.location.reload();
            }}
            className="p-2 bg-green-400 border-4 rounded-xl border-blue-700 text-red-700 m-2"
          >
            Re start
          </button>
        </h1>
      )}
      <h2 className="text-3xl font-bold">score: {score}</h2>

      <div className="my-4 h-2/3 aspect-video p-2 w-2/3 bg-cover relative text-white  bg-black bg-[url('/bg.png')] m-auto ">
        <div
          style={{ top: characterPosY + "%", left: characterPosX + "%" }}
          className=" absolute  w-9 text-2xl h-9 bg- rounded-full"
        >
          {imoge}
        </div>
        <Food
          setImoge={setImoge}
          setScore={setScore}
          characterPosX={characterPosX}
          characterPosY={characterPosY}
        ></Food>
        {[...Array(monsterNum)].map((_, index) => {
          return (
            <Monster
              setImoge={setImoge}
              setGameOver={setGameOver}
              key={index}
              characterPosX={characterPosX}
              characterPosY={characterPosY}
            ></Monster>
          );
        })}
      </div>

      <button
        disabled={characterPosY === 90}
        onClick={handleDown}
        className=" disabled:bg-gray-700 p-2 m-2 bg-black rounded-full text-white font-bold"
      >
        go Down
      </button>
      <button
        disabled={characterPosY === 0}
        onClick={handleUp}
        className=" disabled:bg-gray-700 m-2 p-2 bg-black rounded-full text-white font-bold"
      >
        go up
      </button>
      <button
        disabled={characterPosX === 95}
        onClick={handleRight}
        className=" disabled:bg-gray-700 m-2 p-2 bg-black rounded-full text-white font-bold"
      >
        go right
      </button>
      <button
        disabled={characterPosX === 0}
        onClick={handleLeft}
        className=" disabled:bg-gray-700 m-2 p-2 bg-black rounded-full text-white font-bold"
      >
        go left
      </button>
    </div>
  );
};

export default App;
