import React, { useEffect, useState } from "react";

interface FetchParameters{
    url:string;
    parameters?:[];

}

const useFetch = (params:FetchParameters) => {
  const {url,parameters} = params
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      
      try {
        const resp = await fetch(url);
        const data = await resp.json();

        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, apiData, serverError };
};

export default useFetch;