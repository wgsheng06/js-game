export default class FPS {
  constructor(frame = 5) {
    this.frame = frame;
    this.gameFrame = 0;
    this.value = 0;
  }
  update() {
    this.gameFrame++;
  }
  // draw(deltaTime) {
  //   if (this.gameFrame % this.frame === 0) {
  //     this.value = this.getFPS(deltaTime);
  //   }
  //   return this.value;
  // }

  getFPS(deltaTime) {
    if (this.gameFrame % this.frame === 0) {
      this.value = getFPSByDeltaTime(deltaTime);
    }
    return this.value;
  }
}

function getFPSByDeltaTime(deltaTime) {
  if (!deltaTime) {
    return 0;
  }
  return Math.floor(1000 / deltaTime);
}
