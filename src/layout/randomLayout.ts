import { Node } from "reactflow";

/** Apply a random layout to the nodes */
const randomLayout = (
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>,
  scale: number
) => {
  setNodes((nodes: Node<any>[]): Node<any>[] => {
    return nodes.map((n) => {
      return {
        ...n,
        position: { x: scale * Math.random(), y: scale * Math.random() },
      };
    });
  });
};

export default randomLayout;
