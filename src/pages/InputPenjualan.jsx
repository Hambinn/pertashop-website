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

    if (values.shift === "2"){
      const tanggal = values.tanggal;
      let sheet = "";
      switch (startDate.getMonth()) {
        case 0:
            sheet = "Januari-" + startDate.getFullYear().toString();
            break;
        case 1:
            sheet = "Februari-" + startDate.getFullYear().toString();
            break;
        case 2:
            sheet = "Maret-" + startDate.getFullYear().toString();
            break;
        case 3:
            sheet = "April-" + startDate.getFullYear().toString();
            break;
        case 4:
            sheet = "Mei-" + startDate.getFullYear().toString();
            break;
        case 5:
            sheet = "Juni-" + startDate.getFullYear().toString();
            break;
        case 6:
            sheet = "Juli-" + startDate.getFullYear().toString();
            break;
        case 7:
            sheet = "Agustus-" + startDate.getFullYear().toString();
            break;
        case 8:
            sheet = "September-" + startDate.getFullYear().toString();
            break;
        case 9:
            sheet = "Oktober-" + startDate.getFullYear().toString();
            break;
        case 10:
            sheet = "November-" + startDate.getFullYear().toString();
            break;
        case 11:
            sheet = "Desember-" + startDate.getFullYear().toString();
            break;
      }
      let terimaBBM = 0;
      try{
        console.log(tanggal);
        const response = await axios.get("http://localhost:3000/getterimabbm",
                        { headers: {"tanggal": tanggal }
                        }
                        );
        terimaBBM = response.data.value;
        console.log(terimaBBM);
      } catch (err) {
        console.log(err);
      }

      let tera = 0;
      let stanAwal = 0;
      let penjualanJerigen = 0;
      try{
        const response = await axios.get("http://localhost:3000/getshiftawal",
                        {headers: { "tanggal": tanggal }
                        }
                        );
        const shiftAwal = response.data[0];
        stanAwal = shiftAwal[1];
        penjualanJerigen = Number(values.penjualanDiantar) + Number(shiftAwal[4]);
      } catch (err) {
        console.log(err);
      }
      let stanAkhir = values.meteranAkhir;

      let stikAwalCm = 0;
      let yesterday = startDate;
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday = yesterday.toISOString().slice(0, 10);
      try{
        const response = await axios.get("http://localhost:3000/getstikawal",
                        { headers: {"tanggal": yesterday}
                        }
                        );
        const dayBefore = response.data[0];
        stikAwalCm = dayBefore[6];
      } catch (err) {
        console.log(err);
      }

      let stikAkhirCm = values.stik;
      let userId = values.userId;

      try{
        const { data } = await axios.post(
          "http://localhost:3000/inputbulanan",
          {
            tanggal,
            sheet,
            terimaBBM,
            tera,
            stanAwal,
            stanAkhir,
            stikAwalCm,
            stikAkhirCm,
            penjualanJerigen,
            userId
          },
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const changeTanggal = (e) => {};

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
              onChange={function (date) {
                setStartDate(date);
                setValues({
                  ...values,
                  tanggal: date.toISOString().slice(0, 10),
                });
              }}
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
            <label className="font-semibold text-base">Shift</label>
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
