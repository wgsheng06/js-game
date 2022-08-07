import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  spriteHeight,
  spriteWidth,
  staggerFrame,
} from './constant.js';
import { animatesFrames } from './state.js';

let state = 'idle';
const controls = document.getElementById('animateState');
controls.addEventListener('change', (e) => {
  state = e.target.value;
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const playerImage = new Image();
playerImage.src = '../assets/img/shadow_dog/shadow_dog.png';

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
// 游戏帧
let gameFrame = 0;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // x网格
  const frameX = animatesFrames[state].length;
  let position = Math.floor(gameFrame / staggerFrame) % frameX;

  // y网格
  const frameY = animatesFrames[state][position].y;

  ctx.drawImage(
    playerImage,
    spriteWidth * position,
    spriteHeight * frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
