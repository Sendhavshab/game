import React, { useState, useEffect, useRef } from "react";

const FlappyBirdGame = () => {
  const canvasRef = useRef(null);
  const [birdY, setBirdY] = useState(150);
  const [gravity, setGravity] = useState(0.5);
  const [flap, setFlap] = useState(-6);
  const [isGameOver, setIsGameOver] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(2);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (!isGameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    let birdHeight = 40;
    let birdWidth = 50;
    let gameInterval;
    let frameCount = 0;

    const bird = new Image();
    bird.src =
      "https://c0.klipartz.com/pngpicture/253/78/gratis-png-flappy-pajaro-sprite-pajaro.png";

    const obstacleWidth = 50;
    const obstacleGap = 200;
    let obstacleX = canvasWidth;
    let obstacleY = 0;
    let obstacleHeight = Math.floor(Math.random() * 200 + 100);

    const drawBackground = () => {
      ctx.fillStyle = "#7ec8e3";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    const drawGround = () => {
      ctx.fillStyle = "#78a63e";
      ctx.fillRect(0, canvasHeight - 20, canvasWidth, 20);
    };

    const drawBird = () => {
      ctx.drawImage(bird, 100, birdY, birdWidth, birdHeight);
    };

    const drawObstacle = () => {
      ctx.fillStyle = "#8b3e26";
      ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
      ctx.fillRect(
        obstacleX,
        obstacleY + obstacleHeight + obstacleGap,
        obstacleWidth,
        canvasHeight - obstacleHeight - obstacleGap
      );
    };

    const updateObstacle = () => {
      obstacleX -= speed;
      if (obstacleX <= 0 - obstacleWidth) {
        obstacleX = canvasWidth;
        obstacleHeight = Math.floor(Math.random() * 200 + 100);
        setScore(score + 1); // Update score when passing obstacle
      }
    };

    const checkCollision = () => {
      if (
        birdY > canvasHeight - 60 ||
        birdY < 0 ||
        (birdY + birdHeight > obstacleY &&
          birdY < obstacleY + obstacleHeight &&
          obstacleX < birdWidth + 100)
      ) {
        clearInterval(gameInterval);
        setIsGameOver(true);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBackground();
      drawGround();
      drawBird();
      drawObstacle();
      updateObstacle();
      checkCollision();
      if (!isGameOver) {
        frameCount++;
        if (frameCount % 2 === 0) {
          setBirdY(birdY + gravity);
        }
      }
    };

    gameInterval = setInterval(draw, 10);

    const flapHandler = (e) => {
      if (e.code === "Space" && !isGameOver) {
        setBirdY(birdY + flap);
      }
    };

    document.addEventListener("keypress", flapHandler);

    return () => {
      clearInterval(gameInterval);
      document.removeEventListener("keypress", flapHandler);
    };
  }, [
    birdY,
    gravity,
    flap,
    isGameOver,
    obstacles,
    score,
    speed,
    isGameStarted,
  ]);

  const startGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Flappy Bird Game</h1>
      {!isGameStarted && !isGameOver && (
        <button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Game
        </button>
      )}
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border border-black"
      />
      {isGameOver && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold">Game Over!</h2>
          <p>Your Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default FlappyBirdGame;
