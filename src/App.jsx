import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./Auth";
import PrivateRoutes from "./PrivateRoutes";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/NavbarOperator";
import InputPenjualan from "./pages/InputPenjualan";
import PenjualanOperator from "./pages/PenjualanOperator";
import PenjualanManager from "./pages/PenjualanManager";
import InputTerimaBBM from "./pages/InputTerimaBBM";
import TerimaBBM from "./pages/TerimaBBM";
import EditPenjualan from "./pages/EditPenjualan";
import BiayaOperasional from "./pages/BiayaOperasional";

export default function App() {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        {/* <Route element={<PrivateRoutes />}> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/inputpenjualan" element={<InputPenjualan />} />
        <Route exact path="/penjualanoperator" element={<PenjualanOperator />}/>
        <Route exact path="/penjualanmanager" element={<PenjualanManager />} />
        <Route exact path="/inputterimabbm" element={<InputTerimaBBM />} />
        <Route exact path="/terimabbm" element={<TerimaBBM />} />
        <Route exact path="/editpenjualan" element={<EditPenjualan />} />
        <Route exact path="/biayaoperasional" element={<BiayaOperasional />} />

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}
