import React, { useEffect, useState } from "react";

import eat from "/eat.mp3";

const eatSound = new Audio(eat);
const Food = ({ characterPosX, characterPosY, setScore, setImoge }) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [food, setFood] = useState("🍕");
  const Foods =
    "🍕🍔🍟🌭🍿🧂🥓🥚🍳🧇🥞🧈🍞🥐🥨🥯🥖🧀🥗🥙🥪🌮🌯🥫🍖🍗🥩🍠🥟🥠🥡🍘🍙🍚🍛🍜🦪🍣🍤🍥🥮🍢🧆🥘🍲🍝🥣🥧🍦🍧🍨🍩🍪🎂🍰🧁🍫🍬🍭🍡🍮🍯🍼🥛🧃☕🍵🧉🍶🍾🍷🍸🍹🍺🍻🥂🥃🧊🥤🍫🏺🥝🥥🍇🍈🍉🍊🍋🍌🍍🥭🍎🍏🍐🍒🍓🍅🍆🌽🌶🍄🥑🥬🥦🥕🌰🥜";
  const foodsArray = Array.from(Foods);
  const GetFoodPos = () => {
    setPosX(+(Math.random() * (90 - 1) + 1).toFixed(2));
    setPosY(+(Math.random() * (90 - 1) + 1).toFixed(2));
  };
  useEffect(() => {
    if (!posX || !posY) {
      GetFoodPos();
    }
    console.log("pos", characterPosX, posX, characterPosY, posY);
    if (
      characterPosX.toFixed() - posX.toFixed() < 3 &&
      characterPosX.toFixed() - posX.toFixed() > -3 &&
      characterPosY.toFixed() - posY.toFixed() < 5 &&
      characterPosY.toFixed() - posY.toFixed() > -3 &&
      posX !== 0
    ) {
      eatSound.currentTime = 0;
      GetFoodPos();
      setScore((p) => p + 1);
      setFood(foodsArray[+(Math.random() * 107).toFixed()]);
      eatSound.play();
    }

    if (
      characterPosX.toFixed() - posX.toFixed() < 10 &&
      characterPosX.toFixed() - posX.toFixed() > -10 &&
      characterPosY.toFixed() - posY.toFixed() < 25 &&
      characterPosY.toFixed() - posY.toFixed() > -25 &&
      posX !== 0
    ) {
      setImoge("😛");
    } else {
      setImoge("😊");
    }
  }, [characterPosX, characterPosY]);

  return (
    <div
      style={{ top: posY + "%", left: posX + "%" }}
      className="w-7 text-2xl absolute h-7 "
    >
      {food}
    </div>
  );
};

export default Food;
