import React from "react";
import Navbar from "../components/NavbarOperator";
import { useState, useRef } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function InputBiayaOperasional() {
  const [startDate, setStartDate] = useState(new Date());
  const [values, setValues] = useState({
    tanggal: startDate.toISOString().slice(0, 10),
    gaji: 0,
    seragamKaryawan: 0,
    rewardKaryawan: 0,
    uangTapBBM: 0,
    pln: 0,
    kebersihan: 0,
    perawatanAlat: 0,
    atk: 0,
    perizinan: 0,
    marketing: 0,
    total: 0
  });

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    formRef.current.reset();
    values.total = parseInt(values.gaji) + parseInt(values.seragamKaryawan) + parseInt(values.rewardKaryawan) + parseInt(values.uangTapBBM)
                    + parseInt(values.pln) + parseInt(values.kebersihan) + parseInt(values.perawatanAlat) + parseInt(values.atk) + parseInt(values.perizinan)
                    + parseInt(values.marketing);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/inputbiayaoperasional",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
    toast.success("Input Berhasil", { theme: "dark" });
    }

  const changeTanggal = (e) => {};

  return (
    <>
      <Navbar />
      <div className="flex-1 flex  items-start justify-start ml-20">
        <div className="w-[25%] min-w-min text-primary">
          <h1 className="text-3xl font-semibold text-primary mt-14 mb-8">
            Input Biaya Operasional
          </h1>
          <form action="" className="flex flex-col gap-y-2 " ref={formRef}>
            <label className="font-semibold text-base">Tanggal</label>
            <DatePicker
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              selected={startDate}
              onChange={function (date) {
                setStartDate(date);
                setValues({
                  ...values,
                  tanggal: date.toISOString().slice(0, 10),
                });
              }}
              dateFormat="dd/MM/yyyy"
            />
            <label className="font-semibold text-base">Gaji</label>
            <input
              type="text"
              name="gaji"
              id="gaji"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, gaji: e.target.value })
              }
            />
            <label className="font-semibold text-base">Seragam Karyawan</label>
            <input
              type="text"
              name="seragamKaryawan"
              id="seragamKaryawan"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, seragamKaryawan: e.target.value })
              }
            />
            <label className="font-semibold text-base">Reward Karyawan</label>
            <input
              type="text"
              name="rewardKaryawan"
              id="rewardKaryawan"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, rewardKaryawan: e.target.value })
              }
            />
            <label className="font-semibold text-base">Uang Tap BBM</label>
            <input
              type="text"
              name="uangTapBBM"
              id="uangTapBBM"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, uangTapBBM: e.target.value })
              }
            />
            <label className="font-semibold text-base">PLN</label>
            <input
              type="text"
              name="pln"
              id="pln"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, pln: e.target.value })
              }
            />
            <label className="font-semibold text-base">Kebersihan</label>
            <input
              type="text"
              name="kebersihan"
              id="kebersihan"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) => setValues({ ...values, kebersihan: e.target.value })}
            />
            <label className="font-semibold text-base">Perawatan Alat</label>
            <input
              type="text"
              name="perawatanAlat"
              id="perawatanAlat"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) => setValues({ ...values, perawatanAlat: e.target.value })}
            />
            <label className="font-semibold text-base">ATK</label>
            <input
              type="text"
              name="atk"
              id="atk"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) => setValues({ ...values, atk: e.target.value })}
            />
            <label className="font-semibold text-base">Perizinan</label>
            <input
              type="text"
              name="perizinan"
              id="perizinan"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) => setValues({ ...values, perizinan: e.target.value })}
            />
            <label className="font-semibold text-base">Marketing</label>
            <input
              type="text"
              name="marketing"
              id="marketing"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) => setValues({ ...values, marketing: e.target.value })}
            />
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

export default InputBiayaOperasional;
