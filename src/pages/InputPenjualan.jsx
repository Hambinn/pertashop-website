import React from "react";
import Navbar from "../components/Navbar";

function InputPenjualan() {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex  items-start justify-start ml-20">
        <div className="w-[22%] min-w-min text-black">
          <form action="" className="flex flex-col gap-y-2 ">
            <label className="font-semibold text-sm">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="border-2 py-1 px-2 rounded-lg text-black border-secondary focus:border-primary focus:border-2"
              placeholder="fulan@example.com"
              // onChange={(e) =>
              //   setValues({ ...values, username: e.target.value })
              // }
            />

            <label className="font-semibold text-sm">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="py-1 px-2 rounded-lg text-black border-secondary border-2 focus:border-primary focus:border-2"
              // onChange={(e) =>
              //   setValues({ ...values, password: e.target.value })
              // }
            />

            <button
              className=" hover:shadow-xl transition duration-300 text-white py-2 rounded-xl text-sm block bg-secondary"
              // onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default InputPenjualan;
