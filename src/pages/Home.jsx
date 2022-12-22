import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import { useContext } from "react";
import { AuthContext } from "../Auth";
import "firebase/compat/auth";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies([]);
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
          toast.success(`Welcome ${data.user}`, { theme: "dark" });
          console.log(data);
        }
      }
    };
    vefifyUser();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[22%] min-w-min text-black align-text-top">
          <h1>Home</h1>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
