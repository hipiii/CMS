import { useCallback, useState,useEffect } from "react"
import axios from "axios"

const GetDatas = (url) => {


  const [data, setData] = useState(null)
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(null)


  const fetchData = useCallback(() => {

    if (!url) return;
    
    setloading(true);
    seterror(null);
    setData(null);

    try {
      axios.get(`http://192.168.1.65:5000/${url}`)
        .then((res) => {
          setData(res.data);
          setloading(false);
        })
        .catch((error) => {
          seterror(error);
          setloading(false);
        }).finally(() => {
          setloading(false);
        })
    } catch (error) {
      seterror(error);
      setloading(false);

    }
  }, [url])
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default GetDatas;










