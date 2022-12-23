import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";

function InputPenjualan() {
  const [values, setValues] = useState({
    tanggal: "",
    meteranAwal: "",
    meteranAkhir: "",
    penjualanBukanMember: "",
    penjualanDiantar: "",
    penjualanMember: "",
    stik: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <>
      <Navbar />
      <div className="flex-1 flex  items-start justify-start ml-20">
        <div className="w-[25%] min-w-min text-primary">
          <h1 className="text-3xl font-semibold text-primary mt-14 mb-8">
            Input Penjualan
          </h1>
          <form action="" className="flex flex-col gap-y-2 ">
            <label className="font-semibold text-base">Tanggal</label>
            <input
              type="text"
              name="Tanggal"
              id="Tanggal"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, tanggal: e.target.value })
              }
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

            <button
              className=" hover:shadow-xl transition duration-300 text-primary py-2 rounded-lg text-base block bg-secondary font-semibold w-[20%] mt-6"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default InputPenjualan;
