const possibleX = [2, 1, -1, -2, -2, -1, 1, 2];
const possibleY = [1, 2, 2, 1, -1, -2, -2, -1];
let path = [];

function findPossibleMove(x, y, targetX, targetY) {
  let queue = [];
  const levelOrder = [[x, y]];
  const targetXY = targetX.toString() + targetY.toString();

  queue.push([x, y]);

  while (queue.length > 0) {
    current = queue.shift();
    //console.log(current);
    currentX = current[0];
    currentY = current[1];

    if (currentX === targetX && currentY === targetY) {
      queue = [];
    } else {
      for (let i = 0; i < 8; i++) {
        let newX = currentX + possibleX[i];
        let newY = currentY + possibleY[i];
        if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
          queue.push([newX, newY]);
          levelOrder.push([newX, newY]);
        }
      }
    }
  }
  const levelOrderJoined = levelOrder.map((arr) => arr.join(""));
  levelOrderJoined.length = levelOrderJoined.indexOf(targetXY);
  findPath(levelOrderJoined, targetX, targetY);
  path.unshift([targetX, targetY]);
  return path;
}

function findPath(levelOrderJoined, targetX, targetY) {
  let result = [];

  if (levelOrderJoined.length == 0) return;

  for (let i = 0; i < 8; i++) {
    let nearestX = targetX + possibleX[i];
    let nearestY = targetY + possibleY[i];
    if (nearestX >= 0 && nearestX <= 7 && nearestY >= 0 && nearestY <= 7) {
      result.push([nearestX, nearestY]);
    }
  }

  const resultJoined = result.map((arr) => arr.join(""));
  const output = resultJoined.filter((obj) => levelOrderJoined.indexOf(obj) !== -1);
  const nextTarget = output[0].split("").map((str) => Number(str));
  path.push(nextTarget);
  levelOrderJoined.length = levelOrderJoined.indexOf(output[0]);
  findPath(levelOrderJoined, nextTarget[0], nextTarget[1]);
}
