import React, { useState, useEffect } from "react";
import axios from "axios";

function Table() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const header = ["image", "name", "company", "faculty", "description"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("http://192.168.1.65:5000/testimonials");
        setUser(res.data);
      } catch (error) {
        setError("Invalid ip address");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    const timer = setTimeout(() => {
      // setError("Request timed out");
      fetchData();
    }, 5000);
    return () => clearTimeout(timer);

  }, []);


  if(loading) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>{error}</div>;
  }

  return (
    
    <div className="w-full flex justify-center items-center p-16">
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden shadow">
          <thead className="bg-black text-white text-sm uppercase tracking-wide">
            <tr>
              {header.map((val, i) => (
                <th
                  key={i}
                  className="px-6 py-4 border border-gray-300 text-center"
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-900 text-sm">
            {
              user.map((val, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="border-2 border-gray-600 px-4 py-2 text-center">
                    <img
                      src={val.imageid?.imageUrl}
                      alt={val.name}
                      className="w-16 h-16 object-cover rounded-full mx-auto"
                    />
                  </td>
                  <td className="border-2 border-gray-600 px-4 py-2">{val.name}</td>
                  <td className="border-2 border-gray-600 px-4 py-2">{val.company}</td>
                  <td className="border-2 border-gray-600 px-4 py-2">{val.faculty}</td>
                  <td className="border-2 border-gray-600 px-4 py-2">{val.description}</td>
                </tr>

              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
