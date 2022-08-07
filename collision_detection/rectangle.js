// 矩形-碰撞检测
const rect1 = {
  x: 5,
  y: 5,
  width: 50,
  height: 50,
};
const rect2 = {
  x: 20,
  y: 10,
  width: 10,
  height: 10,
};

function isRectCollision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    // collision detected
    return true;
  } else {
    // no collision
    return false;
  }
}
