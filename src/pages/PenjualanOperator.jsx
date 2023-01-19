import React from "react";
import Navbar from "../components/NavbarOperator";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function PenjualanOperator() {
  const [matrix, setMatrix] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    const vefifyUser = async () => {
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
    vefifyUser();

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

  const inputPenjualan = () => {
    navigate("/inputpenjualan");
  };

  const editPenjualan = (idPenjualan) => {
    navigate("/editpenjualan", { state: { idPenjualan } });
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
              <th className="px-4 py-2 border bg-secondary">Meteran Awal</th>
              <th className="px-4 py-2 border bg-secondary">Meteran Akhir</th>
              <th className="px-4 py-2 border bg-secondary">
                Penjualan Bukan Member
              </th>
              <th className="px-4 py-2 border bg-secondary">
                Penjualan Diantar
              </th>
              <th className="px-4 py-2 border bg-secondary">
                Penjualan Member
              </th>
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
                <td className="px-4 py-2 border  justify-center flex">
                  <button
                    className="bg-secondary text-white px-4 py-2 rounded-lg"
                    onClick={editPenjualan(item[9])}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
}

export default PenjualanOperator;
