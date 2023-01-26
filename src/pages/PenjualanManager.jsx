import React from "react";
import Navbar from "../components/NavbarManager";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function PenjualanManager() {
    const [matrix, setMatrix] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    let curr_month;
    switch (new Date().getMonth()) {
    case 0:
        curr_month = "Januari";
        break;
    case 1:
        curr_month = "Februari";
        break;
    case 2:
        curr_month = "Maret";
        break;
    case 3:
        curr_month = "April";
        break;
    case 4:
        curr_month = "Mei";
        break;
    case 5:
        curr_month = "Juni";
        break;
    case 6:
        curr_month = "Juli";
        break;
    case 7:
        curr_month = "Agustus";
        break;
    case 8:
        curr_month = "September";
        break;
    case 9:
        curr_month = "Oktober";
        break;
    case 10:
        curr_month = "November";
        break;
    case 11:
        curr_month = "Desember";
        break;
    }
    const [month, setMonth] = useState("");
    const [listMonth, setListMonth] = useState([]);
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

        const getMonth = async () => {
            const response = await axios.get("http://localhost:3000/sheetslist");
            setListMonth(response.data);
        };
        getMonth();
        }, []);
        
        if (!matrix) {
            return <p>Loading...</p>;
        }

        function handleChange(e) {
            const fetchData = async () => {
                const response = await axios.post("http://localhost:3000/penjualanmanager", {
                    month: e.target.value,
                });
                setMatrix(response.data.values);
            };
            fetchData();
            console.log("Sebelum: " + month)
            setMonth(e.target.value);
            console.log("Sesudah: " + data.month);
            console.log(matrix);
        }

    return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen mx-10">
      <form action="" className="flex flex-col gap-y-2 ">
            <label className="font-semibold text-base">Penjualan Harian Bulan: </label>
            <select              
              name="month"
              id="month"
            //   value={month}
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded w-1/2"
              onChange={handleChange}>
                    <option value="">--- Pilih Bulan ---</option>
                {listMonth.map((item) => (
                    <option value={item}>{item}</option>
                ))}
            </select >
        </form>
        <p className="text-center text-black">
        <br />
            PENJUALAN HARIAN PERTAMAX
        <br />
            PERTASHOP 5P.661.35
        <br />
            Bulan {month}
        </p>
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