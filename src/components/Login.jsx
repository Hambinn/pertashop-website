import React, { useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) => {
    // console.log(err);
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex min-h-screen bg-gray-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[22%] min-w-min text-white">
            <form action="" className="flex flex-col gap-y-2 ">
              <label className="font-semibold text-sm">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="border py-1 px-2 rounded-lg text-black"
                placeholder="fulan@example.com"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />

              <label className="font-semibold text-sm">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="border py-1 px-2 rounded-lg text-black"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />

              <button
                className="bg-black hover:shadow-xl transition duration-300 text-white py-2 rounded-xl text-sm block"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
// }
