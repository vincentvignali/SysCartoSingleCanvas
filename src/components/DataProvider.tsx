import { FC, useEffect, useState } from "react";

import GraphContextProvider from "@/contexts/GraphContext";
import { BackendResponse } from "@/data/types";
import Loader from "./Loader";

interface DataProviderProps {}

/** This component fetches the data and serves it to the context.
 * 1. It fetches the data and store it in its own state called backendData
 * 2. While Data is not available, it renders a spinner animation
 * 3. Once it has data, it renders the context with data available for all childs.
 */
const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const complexUrl3 = "/response_new_data.json";

  const [backendData, setBackendData] = useState<null | BackendResponse>(null);

  useEffect(() => {
    const fetching = async () => {
      return await fetch(complexUrl3)
        .then((res) => res.json())
        .then((data: BackendResponse) => {
          setBackendData(data);
        });
    };
    fetching();
  }, []);

  if (!backendData) {
    return <Loader />;
  }

  return (
    <GraphContextProvider backendData={backendData}>
      {children}
    </GraphContextProvider>
  );
};

export default DataProvider;
