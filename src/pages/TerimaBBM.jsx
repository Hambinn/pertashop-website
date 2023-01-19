import React from "react";
import Navbar from "../components/NavbarOperator";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function TerimaBBM() {
  const [matrix, setMatrix] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const count = 1;
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
        //   toast.success(`Welcome ${data.user}`, { theme: "dark" });
        }
      }
    };
    vefifyUser();

    const getUserId = async () => {
      const { data } = await axios.post(
        "http://localhost:3000/getterimabbm",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setMatrix(data);
      console.log(matrix);
    };
    getUserId();
  }, []);

  if (!matrix) {
    return <p>Loading...</p>;
  }

  const inputTerimaBBM = () => {
    navigate("/inputterimabbm");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen mx-20">
        <button
          className="bg-secondary text-white px-4 py-2 rounded-lg w-[20%] mt-20"
          onClick={inputTerimaBBM}
        >
          Input Terima BBM
        </button>
        <table className="table-auto mx-auto border mt-16 rounded-xl w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border bg-secondary">Tanggal</th>
              <th className="px-4 py-2 border bg-secondary">Terima BBM</th>
            </tr>
          </thead>
          <tbody>
            {/* { count = 1 } */}
            {matrix.map((item) => (
              <tr key={item}>
                <td className="px-4 py-2 border">{item[0]}</td>
                <td className="px-4 py-2 border">{item[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
}

export default TerimaBBM;
