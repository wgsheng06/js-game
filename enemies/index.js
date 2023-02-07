import FPS from './game/fps.js';

window.addEventListener('load', () => {
  const fpsContainer = document.getElementById('fps');
  let lastTime = 0;
  const fps = new FPS(30);
  function animate(timeStamp /**时间戳 */) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    fps.update();
    fpsContainer.innerHTML = `FPS：${fps.getFPS(deltaTime)}`;
    requestAnimationFrame(animate);
  }
  animate(0);
});
