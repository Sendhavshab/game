import React, { useCallback, useEffect, useState } from "react";

const Monster = ({ characterPosX, characterPosY, setGameOver, setImoge }) => {
  const [monsterPosX, setMonsterPosX] = useState(90);
  const [monsterPosY, setMonsterPosY] = useState(90);
  const intervale = useCallback(() => {
    return setInterval(() => {
      // const randomSpeed = +(Math.random() * ( 1.5 - .9) + .9).toFixed(2)
      if (monsterPosX !== characterPosX) {
        setMonsterPosX((p) =>
          characterPosX < monsterPosX
            ? p - +(Math.random() * (2 - 0.9) + 0.9).toFixed(2)
            : p + +(Math.random() * (2 - 0.9) + 0.9).toFixed(2)
        );
      }
      if (monsterPosY !== characterPosY) {
        setMonsterPosY((p) => (characterPosY < monsterPosY ? p - 1 : p + 1));
      }
    }, 200);
  }, [monsterPosX, monsterPosY, characterPosX, characterPosY]);

  useEffect(() => {
    if (monsterPosX !== characterPosX || monsterPosY !== characterPosY) {
      const newInter = intervale();

      return () => {
        clearInterval(newInter);
      };
    }
  }, [monsterPosX, monsterPosY]);

  useEffect(() => {
    if (
      monsterPosX - characterPosX < 9 &&
      monsterPosX - characterPosX > -9 &&
      monsterPosY - characterPosY < 20 &&
      monsterPosY - characterPosY > -20
    ) {
      setImoge("🥵");
    }

    if (
      monsterPosX - characterPosX < 1.3 &&
      monsterPosX - characterPosX > -1.2 &&
      monsterPosY - characterPosY < 6 &&
      monsterPosY - characterPosY > -6
    ) {
      setImoge("🤢");
      setGameOver(true);
    }
  }, [monsterPosX, monsterPosY, characterPosX, characterPosY]);

  return (
    <img
      style={{ top: monsterPosY + "%", left: monsterPosX + "%" }}
      className="w-19 h-16 mix-blnd-multiply  absolute "
      src="/image.png"
    ></img>
  );
};

export default Monster;
