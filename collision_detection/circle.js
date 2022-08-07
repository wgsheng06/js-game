// 矩形-碰撞检测
const circle1 = {
  x: 5,
  y: 5,
  radiu: 50,
};
const circle2 = {
  x: 20,
  y: 10,
  radiu: 10,
};

function isCircleCollision(circle1, circle2) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;

  const distance = Math.sqrt(dx ^ (2 + dy) ^ 2);
  const sumOfRadiu = circle1.radiu + circle2.radiu;
  if (distance < sumOfRadiu) {
    // collision detected
    return true;
  } else if (distance === sumOfRadiu) {
    // circle touch
    return 'touch';
  } else {
    // no collision
    return false;
  }
}
