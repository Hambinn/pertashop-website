import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
function Penjualan() {
  const [matrix, setMatrix] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const { data } = await axios.post(
        "http://localhost:3000/penjualan",
        {},
        {
          withCredentials: true,
        }
      );
      setMatrix(data);
      // console.log(data);
      console.log(matrix);
    };
    getUserId();
  }, []);

  if (!matrix) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <table className="table-auto mx-auto border my-24 rounded-xl">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-secondary">Tanggal</th>
            <th className="px-4 py-2 border bg-secondary">Meteran Awal</th>
            <th className="px-4 py-2 border bg-secondary">Meteran Akhir</th>
            <th className="px-4 py-2 border bg-secondary">
              Penjualan Bukan Member
            </th>
            <th className="px-4 py-2 border bg-secondary">Penjualan Diantar</th>
            <th className="px-4 py-2 border bg-secondary">Penjualan Member</th>
            <th className="px-4 py-2 border bg-secondary">STIK</th>
            <th className="px-4 py-2 border bg-secondary"></th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((item) => (
            <tr key={item}>
              <td className="px-4 py-2 border">{item[0]}</td>
              <td className="px-4 py-2 border">{item[1]}</td>
              <td className="px-4 py-2 border">{item[2]}</td>
              <td className="px-4 py-2 border">{item[3]}</td>
              <td className="px-4 py-2 border">{item[4]}</td>
              <td className="px-4 py-2 border">{item[5]}</td>
              <td className="px-4 py-2 border">{item[6]}</td>
              <td className="px-4 py-2 border">
                <button className="bg-secondary text-white px-4 py-2 rounded-lg">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Penjualan;
