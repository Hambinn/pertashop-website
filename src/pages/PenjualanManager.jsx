import React from "react";
import Navbar from "../components/NavbarManager";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function PenjualanManager() {
  const [matrix, setMatrix] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) navigate("/login");
      else {
        const { data } = await axios.post(
          "http://localhost:3000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          toast.success(`Welcome ${data.user}`, { theme: "dark" });
        }
      }
    };
    verifyUser();

    const fetchData = async () => {
        const response = await axios.get("http://localhost:3000/penjualanmanager");
        response.data.values.shift();
        setMatrix(response.data.values);
    };
    fetchData();
    }, []);
    
    if (!matrix) {
        return <p>Loading...</p>;
    }

  const inputPenjualan = () => {
    navigate("/inputpenjualanmanager");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen mx-20">
        <button
          className="bg-secondary text-white px-4 py-2 rounded-lg w-[20%] mt-20"
          onClick={inputPenjualan}
        >
          Input Penjualan Baru
        </button>
        <table className="table-auto mx-auto border mt-16 rounded-xl w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border bg-secondary">Tanggal</th>
              <th className="px-4 py-2 border bg-secondary">Terima BBM</th>
              <th className="px-4 py-2 border bg-secondary">Tera</th>
              <th className="px-4 py-2 border bg-secondary">Stan Awal</th>
              <th className="px-4 py-2 border bg-secondary">Stan Akhir</th>
              <th className="px-4 py-2 border bg-secondary">Omset</th>
              <th className="px-4 py-2 border bg-secondary">Stik Awal 'cm'</th>
              <th className="px-4 py-2 border bg-secondary">Stik Awal 'lt'</th>
              <th className="px-4 py-2 border bg-secondary">Stik Akhir 'cm'</th>
              <th className="px-4 py-2 border bg-secondary">Stik Akhir 'lt'</th>
              <th className="px-4 py-2 border bg-secondary">Lossis Harian 'lt'</th>
              <th className="px-4 py-2 border bg-secondary">Lossis Harian 'Rp'</th>
              <th className="px-4 py-2 border bg-secondary">Penjualan Retail</th>
              <th className="px-4 py-2 border bg-secondary">Penjualan Jerigen</th>
              <th className="px-4 py-2 border bg-secondary">13.900</th>
              <th className="px-4 py-2 border bg-secondary">13.800</th>
              <th className="px-4 py-2 border bg-secondary">Jumlah</th>
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
                <td className="px-4 py-2 border">{item[7]}</td>
                <td className="px-4 py-2 border">{item[8]}</td>
                <td className="px-4 py-2 border">{item[9]}</td>
                <td className="px-4 py-2 border">{item[10]}</td>
                <td className="px-4 py-2 border">{item[11]}</td>
                <td className="px-4 py-2 border">{item[12]}</td>
                <td className="px-4 py-2 border">{item[13]}</td>
                <td className="px-4 py-2 border">{item[14]}</td>
                <td className="px-4 py-2 border">{item[15]}</td>
                <td className="px-4 py-2 border">{item[16]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
}

export default PenjualanManager;