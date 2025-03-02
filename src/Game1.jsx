import { useEffect, useState } from "react";

const Game = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleLeft, setObstacleLeft] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      const timer = setInterval(() => {
        setObstacleLeft((prev) => (prev > 0 ? prev - 2 : 100));
      }, 30);
      return () => clearInterval(timer);
    }
  }, [obstacleLeft, gameOver, isPaused]);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  useEffect(() => {
    if (obstacleLeft < 10 && !isJumping) {
      setGameOver(true);
      setTimeout(() => {
        setGameOver(false);
        setObstacleLeft(100);
      }, 2000);
    }
  }, [obstacleLeft, isJumping]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleJump();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className="relative h-64 w-full bg-gray-200 flex items-end overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
      onDoubleClick={handleJump}
    >
      <div
        className={`absolute bottom-0 left-10 w-10 h-10 bg-green-500 rounded transition-transform duration-300 ${
          isJumping ? "-translate-y-24" : ""
        }`}
      ></div>
      <div
        className="absolute bottom-0 w-10 h-10 bg-red-500"
        style={{ left: `${obstacleLeft}%` }}
      ></div>
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-red-600">
          Game Over!
        </div>
      )}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-5 left-5 bg-gray-700 text-white px-3 py-2 rounded"
      >
        {isPaused ? "▶️" : "⏸"}
      </button>
    </div>
  );
};

export default Game;
