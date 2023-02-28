import { hideInnerNodes, revealAllNodes } from "@/interactions/selectors";
import { FC, useContext, useEffect, useMemo } from "react";
import { useViewport } from "reactflow";
import { GraphContext, graphContext } from "../contexts/GraphContext";

interface ZoomHandlerProps {}
/** This is a Dummy component. It handles the zoom logic by using hooks. It renders an empty fragment
 * 
***This component is rendered each time the zoom changes**

***This component changes the data only if the layer changes**
 - useViewport : retrieve the zoom level
 - useState : define the zoom layer the user is into, based on zoom level.
 - useContext : perform setNodes & set Edges to show/hide the nodes based on the layer the user is into.
 */
const ZoomHandler: FC<ZoomHandlerProps> = () => {
  const { graph, setters, zoom } = useContext(graphContext) as GraphContext;

  const deepZoomLayer = zoom.deepZoomLayer;
  const setDeepZoomLayer = setters.setDeepZoomLayer;

  const setNodes = setters.setNodes;
  const setEdges = setters.setEdges;
  const selectedNodes = graph.nodes.filter((node) => node.selected === true);
  const levelZoom = useViewport().zoom;
  const zoomThreshold = 0.5;

  /** The levelZoom variable triggers a re-render of the component whenever the user zooms.
   * It runs a the setState action for the zoom state only if levelZoom goes beyond a certain value.
   */
  useEffect(
    () =>
      levelZoom > zoomThreshold
        ? setDeepZoomLayer(true)
        : setDeepZoomLayer(false),
    [levelZoom]
  );

  /** As these functions update the data stored into the context,
   * All components using the context are rerendered.
   * There it is wrapped inside a useEffect to be triggered only when ZoomLayer state changes.
   */
  useEffect(() => {
    deepZoomLayer
      ? /**Low zoom, affiche tout */
        revealAllNodes(setNodes)
      : /**High zoom, retire les services et NI */
        hideInnerNodes(selectedNodes, setNodes, setEdges);
  }, [deepZoomLayer]);

  return <></>;
};

export default ZoomHandler;
