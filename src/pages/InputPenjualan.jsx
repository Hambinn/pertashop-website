import React from "react";
import Navbar from "../components/NavbarOperator";
import { useState, useRef } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function InputPenjualan() {
  const [startDate, setStartDate] = useState(new Date());
  const tanggalSekarang = new Date().getTime();
  const [values, setValues] = useState({
    tanggal: startDate.toISOString().slice(0, 10),
    meteranAwal: "",
    meteranAkhir: "",
    penjualanBukanMember: "",
    penjualanDiantar: "",
    penjualanMember: "",
    stik: "",
    userId: "",
    shift: "1",
    penjualanId: tanggalSekarang,
  });

  useEffect(() => {
    const getUserId = async () => {
      const { data } = await axios.post(
        "http://localhost:3000/checkinput",
        {},
        {
          withCredentials: true,
        }
      );
      setValues({ ...values, userId: data.idUser.toString() });
    };
    getUserId();
  }, []);

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    formRef.current.reset();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/inputpenjualan",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      console.log(values);
    } catch (err) {
      console.log(err);
    }
    toast.success("Input Penjualan Berhasil", { theme: "dark" });
  };

  return (
    <>
      <Navbar />
      <div className="flex-1 flex  items-start justify-start ml-20">
        <div className="w-[25%] min-w-min text-primary">
          <h1 className="text-3xl font-semibold text-primary mt-14 mb-8">
            Input Penjualan
          </h1>
          <form action="" className="flex flex-col gap-y-2 " ref={formRef}>
            <label className="font-semibold text-base">Tanggal</label>
            <DatePicker
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
            />
            <label className="font-semibold text-base">Meteran Awal</label>
            <input
              type="text"
              name="meteranAwal"
              id="meteranAwal"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, meteranAwal: e.target.value })
              }
            />
            <label className="font-semibold text-base">Metaran Akhir</label>
            <input
              type="text"
              name="meteranAkhir"
              id="meteranAkhir"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, meteranAkhir: e.target.value })
              }
            />
            <label className="font-semibold text-base">
              Penjualan Bukan Member
            </label>
            <input
              type="text"
              name="penjualanBukanMember"
              id="penjualanBuaknMember"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, penjualanBukanMember: e.target.value })
              }
            />
            <label className="font-semibold text-base">Penjualan Diantar</label>
            <input
              type="text"
              name="penjualanDiantar"
              id="penjualanDiantar"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, penjualanDiantar: e.target.value })
              }
            />
            <label className="font-semibold text-base">Penjualan Member</label>
            <input
              type="text"
              name="penjualanMember"
              id="penjualanMember"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, penjualanMember: e.target.value })
              }
            />
            <label className="font-semibold text-base">STIK</label>
            <input
              type="text"
              name="stik"
              id="stik"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) => setValues({ ...values, stik: e.target.value })}
            />
            <label className="font-semibold text-base">STIK</label>
            <select
              id="shift"
              name="shift"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) => setValues({ ...values, shift: e.target.value })}
            >
              <option value="1">Shift 1</option>
              <option value="2">Shift 2</option>
            </select>
            <button
              className=" hover:shadow-xl transition duration-300 text-primary py-2 rounded-lg text-base block bg-secondary font-semibold w-[20%] mt-6"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default InputPenjualan;
