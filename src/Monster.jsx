import React, { useCallback, useEffect, useState } from "react";


const Monster = ({ positionX, positionDown, setGameOver ,  setImoge}) => {
  const [monsterPosRight, setMonsterPosRight] = useState(90);
  const [monsterPosUP, setMonsterPosUp] = useState(90);
  const intervale = useCallback(() => {
      return setInterval(() => {
        // const randomSpeed = +(Math.random() * ( 1.5 - .9) + .9).toFixed(2)
      if (monsterPosRight !== positionX) {
        setMonsterPosRight((p) =>
          positionX < monsterPosRight
            ? p - +(Math.random() * (2 - 0.9) + 0.9).toFixed(2)
            : p + +(Math.random() * (2 - 0.9) + 0.9).toFixed(2)
        );
      }
      if (monsterPosUP !== positionDown) {
        setMonsterPosUp((p) => (positionDown < monsterPosUP ? p - 1 : p + 1));
      }
    }, 200);
  }, [monsterPosRight, monsterPosUP, positionX, positionDown]);

  useEffect(() => {
    if (monsterPosRight !== positionX || monsterPosUP !== positionDown) {
      const newInter = intervale();

      return () => {
        clearInterval(newInter);
      };
    }
  }, [monsterPosRight, monsterPosUP]);

  useEffect(() => {
    if (
      (monsterPosRight - positionX) <  9 &&
      (monsterPosRight - positionX) > (- 9) &&
      (monsterPosUP - positionDown) < 20 &&
      (monsterPosUP - positionDown) > (-20)
    ) {

      setImoge("🥵")
    } 
   
    if (
      (monsterPosRight - positionX) <  1.3 &&
      (monsterPosRight - positionX) > (- 1.2) &&
      (monsterPosUP - positionDown) < 6 &&
      (monsterPosUP - positionDown) > (-6)
    ) {
      setImoge("🤢");
      setGameOver(true);
    }
    


  }, [monsterPosRight, monsterPosUP, positionX, positionDown]);

  return (
    <img
      style={{ top: monsterPosUP + "%", left: monsterPosRight + "%" }}
      className="w-19 h-16 mix-blnd-multiply  absolute "
      src="/image.png"></img>
  );
};

export default Monster;