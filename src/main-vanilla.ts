import "./situation-canvas";

fetch("/response_1645792179855.json")
  .then((res) => res.json())
  .then((data) => {
    const element: any = document.createElement("situation-canvas");
    document.querySelector("#root")?.appendChild(element);
    element.canvasData = data;
  });
