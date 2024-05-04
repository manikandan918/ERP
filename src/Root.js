import React from "react";
import Main from "./Main";
import Table from "./Table";
import Form from "./Form";
import Edit from "./Edit";
import Signup from "./Signup";
import Barchart from "./Barchart";
import Linechart from "./Linechart";
import Login from './Signin';
import Invoices from "./Invoices";
import Zoommeeting from "./Zoommeeting";
import Inventory from "./Inventory";
import Salesorder from "./Salesorder";
import Transfers from "./Transfers";
import Projects from "./Projects";
import Automation from "./Automation";
import Chats from "./Chats";
import User from "./User";
import Client from "./Client";
import Support from "./Support";
import Leavemanagement from "./Leavemanagement";
import Payroll from "./payroll";
import HRM from "./HRM";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function Root() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/table" element={<Table/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/Main" element={<Main/>} />
          <Route path="/Chats" element={<Chats/>} />
          <Route path="/Invoices" element={<Invoices/>} />
          <Route path="/Inventory" element={<Inventory/>} />
          <Route path="/Salesorder" element={<Salesorder/>} />
          <Route path="/Transfers" element={<Transfers/>} />
          <Route path="/User" element={<User/>}/>
          <Route path="/Client" element={<Client/>}/>
          <Route path="/Support" element={<Support/>}/>
          <Route path="/Projects" element={<Projects/>} />
          <Route path="/Automation" element={<Automation/>} />
          <Route path="/Zoom" element={<Zoommeeting/>} />
          <Route path="/Leavemanagement" element={<Leavemanagement/>} />
          <Route path="/Payroll" element={<Payroll/>} />
          <Route path="/HRM" element={<HRM/>} />
          <Route path="/Form" element={<Form/>} />
          <Route path="/Barchart" element={<Barchart/>} />
          <Route path="/Linechart" element={<Linechart/>} />
          <Route path="/Edit" element={<Edit/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/table/edit/:id" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Root;
