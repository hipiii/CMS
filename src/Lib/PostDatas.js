import { useState } from "react";
import axios from "axios";

const PostDatas = () => {
  const [load, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const post = (url, payload, reset) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      axios
        .post('http://localhost:5000/${url}/, payload')
        .then((res) => {
          setResponse(res.data);
          setTimeout(() => {

            reset()
          }, 200);
        })
        .catch((err) => {
          console.error("Axios POST error:", err);
          setError(err);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 200);
        });
    } catch (err) {
      console.error("Unexpected POST error:", err);
      setTimeout(() => {
        setError(err);
        setLoading(false);
      }, 200);

    }
  };

  return { post, load, err, response };
};

export default PostDatas;