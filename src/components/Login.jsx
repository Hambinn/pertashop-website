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
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      const { data } = await axios.post(
        "http://localhost:3000",
        {},
        {
          withCredentials: true,
        }
      );
      if (data.status) navigate("/");
    };
    verifyUser();
  });
  const [values, setValues] = useState({
    username: "",
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
          const { username, password } = data.errors;
          if (username) generateError(username);
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
      <div className="flex min-h-screen bg-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[22%] min-w-min text-black">
            <form action="" className="flex flex-col gap-y-2 ">
              <label className="font-semibold text-sm">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="border-2 py-1 px-2 rounded-lg text-black border-secondary focus:border-primary focus:border-2"
                placeholder="fulan@example.com"
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />

              <label className="font-semibold text-sm">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="py-1 px-2 rounded-lg text-black border-secondary border-2 focus:border-primary focus:border-2"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />

              <button
                className=" hover:shadow-xl transition duration-300 text-white py-2 rounded-xl text-sm block bg-secondary"
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
