import { useEffect, useRef, useState } from "react";

const WIDTH = 390;
const HEIGHT = 580;
const GROUND_HEIGHT = 36;
const BIRD_X = 78;
const BIRD_WIDTH = 30;
const BIRD_HEIGHT = 24;
const PIPE_WIDTH = 56;
const PIPE_GAP = 200;
const GRAVITY = 0.8;
const FLAP_IMPULSE = -15;
const PIPE_SPEED = 2;

export const FlappyBirdGame = ({ onExit }) => {
  const canvasRef = useRef(null);
  const gameRef = useRef({
    birdTop: 245,
    velocity: 0,
    pipes: [],
    status: "ready",
    score: 0,
    flap: null,
  });
  const [status, setStatus] = useState("ready");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = WIDTH * pixelRatio;
    canvas.height = HEIGHT * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const game = gameRef.current;
    let animationFrame = 0;
    let previousTime = 0;
    let pipeTimer = 0;

    const draw = () => {
      context.clearRect(0, 0, WIDTH, HEIGHT);
      context.fillStyle = "#08080a";
      context.fillRect(0, 0, WIDTH, HEIGHT);

      context.strokeStyle = "rgba(255,255,255,0.055)";
      context.lineWidth = 1;
      for (let y = 44; y < HEIGHT - GROUND_HEIGHT; y += 44) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(WIDTH, y);
        context.stroke();
      }

      game.pipes.forEach((pipe) => {
        const lowerY = pipe.topHeight + PIPE_GAP;
        const lowerHeight = HEIGHT - GROUND_HEIGHT - lowerY;
        context.fillStyle = "#ff3131";
        context.shadowColor = "rgba(255,49,49,0.35)";
        context.shadowBlur = 10;
        context.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        context.fillRect(pipe.x, lowerY, PIPE_WIDTH, lowerHeight);
        context.shadowBlur = 0;
        context.strokeStyle = "#4b0e15";
        context.lineWidth = 3;
        context.strokeRect(pipe.x + 1.5, 0, PIPE_WIDTH - 3, pipe.topHeight);
        context.strokeRect(pipe.x + 1.5, lowerY, PIPE_WIDTH - 3, lowerHeight);
        context.fillStyle = "#ff7373";
        context.fillRect(pipe.x - 4, pipe.topHeight - 10, PIPE_WIDTH + 8, 10);
        context.fillRect(pipe.x - 4, lowerY, PIPE_WIDTH + 8, 10);
      });

      context.fillStyle = "#161619";
      context.fillRect(0, HEIGHT - GROUND_HEIGHT, WIDTH, GROUND_HEIGHT);
      context.fillStyle = "#ff3131";
      context.fillRect(0, HEIGHT - GROUND_HEIGHT, WIDTH, 3);
      context.fillStyle = "rgba(255,255,255,0.13)";
      for (let x = 0; x < WIDTH; x += 28) {
        context.fillRect(x, HEIGHT - 18, 12, 2);
      }

      context.save();
      context.translate(BIRD_X + BIRD_WIDTH / 2, game.birdTop + BIRD_HEIGHT / 2);
      context.rotate(Math.max(-0.45, Math.min(0.55, game.velocity * 0.025)));
      context.fillStyle = "#ff3131";
      context.shadowColor = "rgba(255,49,49,0.7)";
      context.shadowBlur = 12;
      context.beginPath();
      context.moveTo(BIRD_WIDTH / 2, 0);
      context.lineTo(-BIRD_WIDTH / 2, -BIRD_HEIGHT / 2);
      context.lineTo(-BIRD_WIDTH / 2, BIRD_HEIGHT / 2);
      context.closePath();
      context.fill();
      context.shadowBlur = 0;
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.arc(2, -4, 2.4, 0, Math.PI * 2);
      context.fill();
      context.restore();

      context.fillStyle = "#ffffff";
      context.font = "600 24px 'Space Grotesk', sans-serif";
      context.textAlign = "right";
      context.fillText(String(game.score), WIDTH - 20, 38);

      if (game.status !== "playing") {
        context.fillStyle = "rgba(8,8,10,0.74)";
        context.fillRect(18, HEIGHT / 2 - 58, WIDTH - 36, 112);
        context.textAlign = "center";
        context.fillStyle = "#ffffff";
        context.font = "700 20px 'Space Grotesk', sans-serif";
        context.fillText(game.status === "ready" ? "READY?" : "GAME OVER", WIDTH / 2, HEIGHT / 2 - 12);
        context.fillStyle = "#b8b8c0";
        context.font = "12px 'IBM Plex Mono', monospace";
        context.fillText(game.status === "ready" ? "TAP OR PRESS SPACE TO FLAP" : "TAP TO PLAY AGAIN", WIDTH / 2, HEIGHT / 2 + 17);
        if (game.status === "over") {
          context.fillStyle = "#ff7777";
          context.fillText(`SCORE ${game.score}`, WIDTH / 2, HEIGHT / 2 + 40);
        }
      }
    };

    const stopGame = () => {
      if (game.status !== "playing") return;
      game.status = "over";
      setStatus("over");
    };

    const frame = (time) => {
      const delta = previousTime ? Math.min((time - previousTime) / 16.667, 2.5) : 1;
      previousTime = time;

      if (game.status === "playing") {
        game.velocity += GRAVITY * delta;
        game.birdTop += game.velocity * delta;
        pipeTimer += delta * 16.667;

        if (pipeTimer >= 1600) {
          pipeTimer = 0;
          const availableHeight = HEIGHT - GROUND_HEIGHT - PIPE_GAP - 120;
          game.pipes.push({ x: WIDTH, topHeight: 60 + Math.random() * availableHeight, scored: false });
        }

        game.pipes.forEach((pipe) => {
          pipe.x -= PIPE_SPEED * delta;
          if (!pipe.scored && pipe.x + PIPE_WIDTH < BIRD_X) {
            pipe.scored = true;
            game.score += 1;
            setScore(game.score);
          }

          const overlapsBird = BIRD_X + BIRD_WIDTH > pipe.x && BIRD_X < pipe.x + PIPE_WIDTH;
          const missesGap = game.birdTop < pipe.topHeight || game.birdTop + BIRD_HEIGHT > pipe.topHeight + PIPE_GAP;
          if (overlapsBird && missesGap) stopGame();
        });

        game.pipes = game.pipes.filter((pipe) => pipe.x + PIPE_WIDTH >= 0);
        if (game.birdTop <= 0 || game.birdTop + BIRD_HEIGHT >= HEIGHT - GROUND_HEIGHT) stopGame();
      }

      draw();
      if (game.status === "playing") animationFrame = requestAnimationFrame(frame);
      else animationFrame = 0;
    };

    const begin = () => {
      if (game.status === "over") {
        game.birdTop = 245;
        game.velocity = 0;
        game.pipes = [];
        game.score = 0;
        pipeTimer = 0;
        setScore(0);
      }
      game.status = "playing";
      setStatus("playing");
      game.velocity = FLAP_IMPULSE;
      if (!animationFrame) {
        previousTime = 0;
        animationFrame = requestAnimationFrame(frame);
      }
    };

    game.flap = begin;
    draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      game.flap = null;
    };
  }, []);

  const flap = () => gameRef.current.flap?.();
  const handleKeyDown = (event) => {
    if (event.code !== "Space" && event.key !== "ArrowUp") return;
    event.preventDefault();
    flap();
  };

  return (
    <section className="w-full max-w-[min(100%,320px)]" aria-label="Flappy Bird mini-game">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">Logo flight</p>
        <button type="button" onClick={onExit} className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 underline underline-offset-4 hover:text-white">
          Back to logo
        </button>
      </div>
      <div
        role="application"
        aria-label="Flappy Bird game. Tap or press Space to flap."
        tabIndex={0}
        onPointerDown={(event) => { event.preventDefault(); flap(); }}
        onKeyDown={handleKeyDown}
        className="relative aspect-[2/3] w-full touch-none overflow-hidden rounded-xl border border-white/10 bg-[#08080a] shadow-[0_12px_60px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff3131]"
        data-testid="flappy-game"
      >
        <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
        <span className="sr-only" aria-live="polite">{status === "ready" ? "Ready. Tap or press Space to flap." : status === "over" ? `Game over. Score ${score}. Tap to play again.` : `Score ${score}`}</span>
      </div>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">Tap or Space to fly · Avoid the red pipes</p>
    </section>
  );
};
