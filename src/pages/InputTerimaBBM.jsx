import React from "react";
import Navbar from "../components/NavbarOperator";
import { useState, useRef } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function InputTerimaBBM() {
  const [startDate, setStartDate] = useState(new Date());
  const [values, setValues] = useState({
    tanggal: startDate.toISOString().slice(0, 10),
    terimaBBM: "",
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
        "http://localhost:3000/inputterimabbm",
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
    toast.success("Input Terima BBM Berhasil", { theme: "dark" });
  };

  return (
    <>
      <Navbar />
      <div className="flex-1 flex  items-start justify-start ml-20">
        <div className="w-[25%] min-w-min text-primary">
          <h1 className="text-3xl font-semibold text-primary mt-14 mb-8">
            Input Terima BBM
          </h1>
          <form action="" className="flex flex-col gap-y-2 " ref={formRef}>
            <label className="font-semibold text-base">Tanggal</label>
            <DatePicker
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
            />
            <label className="font-semibold text-base">Terima BBM</label>
            <input
              type="text"
              name="terimaBBM"
              id="terimaBBM"
              className="border-3 py-3 px-2  text-black border-secondary focus:border-primary focus:border-3 rounded"
              onChange={(e) =>
                setValues({ ...values, terimaBBM: e.target.value })
              }
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

export default InputTerimaBBM;
