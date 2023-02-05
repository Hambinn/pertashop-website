import React from "react";
import Navbar from "../components/NavbarManager";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, createSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function BiayaOperasional() {
  const [matrix, setMatrix] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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
  });

  const handleSubmit = async (e) => {
    console.log(year+"-"+month);
    e.preventDefault();
    const fetchData = async () => {
      const response = await axios.post("http://localhost:3000/getbiayaoperasional", {
          date: year+"-"+month,
      });
      console.log(response.data);
      setMatrix(response.data);
    };
    fetchData();
  }
//   const inputBiayaOperasional = () => {
//     navigate("/inputpenjualan");
//   };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen mx-20">
        <button
          className="bg-secondary text-white px-4 py-2 rounded-lg w-[20%] mt-20"
        //   onClick={inputBiayaOperasional}
        >
          Input Biaya Operasional
        </button>

        <form action="" className="flex flex-col gap-y-2 ">
            <label className="font-semibold text-base">Pilih Bulan: </label>
            <select              
              name="month"
              id="month"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded w-1/2"
              onChange={(e) => setMonth(e.target.value)}>
                <option value="">--- Pilih Bulan ---</option>
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
            </select >
            <select              
              name="year"
              id="year"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded w-1/2"
              onChange={(e) => setYear(e.target.value)}>
                <option value="">--- Pilih Tahun ---</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
            </select >
            <button
              className=" hover:shadow-xl transition duration-300 text-primary py-2 rounded-lg text-base block bg-secondary font-semibold w-[20%] mt-6"
              onClick={handleSubmit}
            >
              Pilih
            </button>
        </form>
        <table className="table-auto mx-auto border mt-16 rounded-xl w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border bg-secondary">Tanggal</th>
              <th className="px-4 py-2 border bg-secondary">Gaji</th>
              <th className="px-4 py-2 border bg-secondary">Seragam Karyawan</th>
              <th className="px-4 py-2 border bg-secondary">Reward Karyawan</th>
              <th className="px-4 py-2 border bg-secondary">Uang Tap BBM</th>
              <th className="px-4 py-2 border bg-secondary">PLN</th>
              <th className="px-4 py-2 border bg-secondary">Kebersihan</th>
              <th className="px-4 py-2 border bg-secondary">Perawatan Alat</th>
              <th className="px-4 py-2 border bg-secondary">ATK</th>
              <th className="px-4 py-2 border bg-secondary">Perizinan</th>
              <th className="px-4 py-2 border bg-secondary">Marketing</th>
              <th className="px-4 py-2 border bg-secondary">Total</th>
            </tr>
          </thead>
          <tbody>
            { 
              matrix.map((item) => (
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
                </tr>
              ))
            }
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
}

export default BiayaOperasional;
