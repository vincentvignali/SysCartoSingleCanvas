/* Global Style*/

/* Drawer Style*/
export const drawerContainerStyle =
  "absolute z-10 flex flex-col items-center justify-between ml-4 -translate-y-1/2 bg-gray-200 rounded-lg min-w-[15rem] max-w-[20vw] h-2/3 top-1/2 opacity-90";
export const drawerContainerHeaderStyle =
  "flex w-full gap-1 p-1 text-gray-400 justify-cenfter h-1/6";
export const drawerIconStyle =
  "relative flex justify-center w-12 h-12 p-2 m-auto text-gray-700 border-2 border-gray-700 rounded-md cursor-pointer ";
export const drawerToolTipStyle = "text-white capitalize bg-gray-700";
export const drawerDataContainerStyle =
  "flex flex-col justify-center w-full h-full p-3 bg-transparent ";
export const chipKeyStyle =
  "h-full px-[0.5rem] py-2 text-xs bg-gray-800 max-w-max select-text ";
export const dockerChipKeyStyle =
  "h-full px-[0.5rem] py-2 text-xs bg-blue-800 max-w-max select-text ";
export const chipValueStyle =
  "text-xs bg-transparent text-black  max-w-[1%] select-text capitalize";
export const drawerDataLineStyle =
  "w-full my-1 overflow-auto border border-gray-800 border-1 rounded-xl";
export const emptyDrawerStyle =
  "w-3/4 m-auto italic font-medium text-center text-white capitalize bg-gray-600 border-2 border-gray-800";

/* Action Bar Style */
export const actionBarStyle =
  "absolute z-10 flex justify-start w-1/2 gap-1 p-2 transition-all duration-1000 ease-in-out transform -translate-x-1/2 -translate-y-12 bg-gray-200 border-gray-500 rounded-lg shadow-md left-1/2 h-14 opacity-90 hover:translate-y-2 peer-last:bg-black";
export const actionBarToggledStyle = "translate-y-2";
export const lockButtonStyle =
  "absolute grid items-center self-center p-2 bg-gray-200 border-2 border-gray-400 rounded-full text-slate-700 -mx-14";
export const lockButtonToggledStyle = "bg-gray-600 border-gray-700";
export const miniArrowStyle =
  "absolute transition-all duration-1000 ease-in-out -translate-x-1/2 bg-gray-500 rounded-full cursor-pointer text-slate-200 left-1/2 mt-9";
export const layoutButtonStyle =
  "flex items-center justify-center p-2 bg-gray-100 border border-gray-400 rounded-lg w-1/8 hover:bg-gray-400 hover:border-gray-800 text-slate-700";

/* === Nodes components Style === */
/* ====================== Network Interface Component Style */
export const niWrapperStyle =
  "flex flex-col items-center justify-center h-full p-1 rounded-lg shadow-lg bg-blue-gray-50 ";
export const relatedNiWrapperStyle =
  "flex flex-col items-center justify-center h-full p-1 border border-dashed rounded-lg shadow-lg bg-blue-gray-100 border-blue-gray-600";
export const selectedNiWrapperStyle =
  "flex flex-col items-center justify-center h-full p-1 border-2 rounded-lg shadow-lg bg-blue-gray-600 border-blue-gray-900 ";
export const niIconStyle =
  "flex justify-center w-full h-full p-2 m-auto transition-all duration-200 ease-in rounded-lg max-w-[3rem] text-blue-gray-200 ";
export const selectedNiIconStyle =
  "flex justify-center w-full h-full p-2 m-auto transition-all duration-200 ease-in rounded-lg max-w-[3rem] text-blue-gray-900 ";

/* ====================== Service Component Style */
export const serviceWrapperStyle =
  "flex flex-col items-center justify-center h-full p-1 rounded-lg shadow-lg bg-blue-gray-50 ";
export const relatedServiceWrapperStyle =
  "flex flex-col items-center justify-center h-full p-1 border border-dashed rounded-lg shadow-lg bg-blue-gray-100 border-blue-gray-600";
export const selectedServiceWrapperStyle =
  "flex flex-col items-center justify-center h-full p-1 border-2 rounded-lg shadow-lg bg-blue-gray-600 border-blue-gray-900";
export const serviceIconStyle =
  "flex justify-center w-full h-full m-auto transition-all duration-200 ease-in rounded-lg text-blue-gray-200 max-w-[3rem] ";
export const selectedServiceIconStyle =
  "flex justify-center w-full h-full m-auto transition-all duration-200 ease-in rounded-lg text-blue-gray-900 max-w-[3rem] ";

/* ====================== Machine Component Style */
/* color */
export const dockerColorLowStyle = "text-blue-300 border-blue-100 bg-blue-50";
export const dockerColorMedStyle = "text-blue-400 bg-blue-200 border-blue-300";
export const dockerColorHighStyle = "text-blue-900 bg-blue-600 border-blue-800";
export const classicColorLowStyle = "text-gray-400 border-gray-300 bg-gray-50";
export const classicColorMedStyle = "text-gray-700 bg-gray-400 border-gray-500";
export const classicColorHighStyle =
  "text-gray-900 bg-gray-600 border-gray-800";
/* wrapper */
export const machineWrapperBasicStyle =
  "flex items-center h-full transition-all duration-300 ease-in-out rounded-xl";
/* state */
export const inactiveMachineWrapperStyle = "shadow-md";
export const relatedMachineWrapperStyle = "border-2 shadow-xl ";
export const selectedMachineWrapperStyle = "border-4 shadow-xl ";
/* icon */
export const machineIconBasicStyle =
  "w-1/3 p-2 m-auto transition-all duration-200 ease-in rounded-lg h-1/3";
/* iconState */
export const inactiveMachineIconStyle = "border ";
export const relatedMachineIconStyle = "border-2 ";
export const selectedMachineIconStyle = "border-4 ";

/* ====================== Subnetwork Component Style */
export const subnetworkWrapperStyle =
  "flex items-center h-full transition-all duration-500 ease-in-out bg-gray-100 rounded-full shadow w-36 ";
export const relatedSubnetworkWrapperStyle =
  "flex items-center h-full transition-all duration-500 ease-in-out bg-gray-400 border-2 border-gray-500 rounded-full shadow-xl w-36 ";
export const selectedSubnetworkWrapperStyle =
  "flex items-center h-full transition-all duration-500 ease-in-out bg-gray-600 border-4 border-gray-900 rounded-full shadow-xl w-36 ";
export const subnetworkIconStyle =
  "flex justify-center w-1/2 p-5 m-auto text-gray-500 transition-all duration-200 ease-in rounded-lg h-1/2 ";
export const selectedSubnetworkIconStyle =
  "flex justify-center w-1/2 p-5 m-auto text-gray-900 transition-all duration-200 ease-in rounded-lg h-1/2 z ";

/* ====================== Handle Style */
export const handleStyle = "invisible";
