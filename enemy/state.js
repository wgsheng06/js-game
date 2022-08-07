import { spriteWidth } from './constant.js';

const animatesFrames = {};
const animateStates = [
  {
    name: 'idle',
    loc: 7,
  },
  {
    name: 'jump',
    loc: 7,
  },
  {
    name: 'fall',
    loc: 7,
  },
  {
    name: 'run',
    loc: 7,
  },
  {
    name: 'dizzy',
    loc: 11,
  },
  {
    name: 'sit',
    loc: 5,
  },
  {
    name: 'roll',
    loc: 7,
  },
  {
    name: 'bite',
    loc: 7,
  },
  {
    name: 'ko',
    loc: 12,
  },
  {
    name: 'gethit',
    loc: 4,
  },
];

animateStates.forEach((state, index) => {
  const frames = [];
  for (let i = 0; i < state.loc; i++) {
    frames.push({
      x: i * spriteWidth,
      y: index,
    });
  }
  animatesFrames[state.name] = frames;
});

export { animatesFrames };
