import { Node, Position, XYPosition } from "reactflow";

const defaultWidth = 0;
const defaultHeight = 0;

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
//  _____
// |     | intersectionNode
// |  .  |
// |___\_|
//     ^\
//     | \
//output  \____
//       | \   |
//       |  .  | targetNode
//       |_____|
//
function getNodeIntersection(
  intersectionNode: Node,
  targetNode: Node
): XYPosition {
  // ensure that props are well defined
  const intersectionNodeWidth = intersectionNode.width || defaultWidth;
  const intersectionNodeHeight = intersectionNode.height || defaultHeight;
  const intersectionNodePosition =
    intersectionNode.positionAbsolute || intersectionNode.position;
  const targetPosition = targetNode.positionAbsolute || targetNode.position;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + w;
  const y1 = targetPosition.y + h;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node
// compared to the intersection point
function getEdgePosition(node: Node, intersectionPoint: XYPosition): Position {
  const n = { ...node.positionAbsolute, ...node };

  n.x = n.x || 0;
  n.y = n.y || 0;
  n.width = n.width || defaultWidth;
  n.height = n.height || defaultHeight;

  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}
type GetBezierPathParams = {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  curvature?: number;
};
// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgePathParams(
  source: Node,
  target: Node
): GetBezierPathParams {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sourceX: sourceIntersectionPoint.x,
    sourceY: sourceIntersectionPoint.y,
    targetX: targetIntersectionPoint.x,
    targetY: targetIntersectionPoint.y,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  } as GetBezierPathParams;
}
