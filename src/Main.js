import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { Dropdown  } from 'react-bootstrap';
import { Link } from "react-router-dom";
//
// import "./bootstrap.scss";
import  { useState,useEffect } from 'react';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGaugeHigh,faLaptop,faWarehouse,faEnvelope,faBox,faList,faUsers,faUserShield,faMoneyCheckAlt,faCalendarTimes,faUserFriends,faShoppingCart,faExchangeAlt,faFileInvoice,faCircle,faTrashAlt,faPencilAlt,faSitemap,faVideo,faLifeRing,faCog,faFolderOpen,faDatabase,faComment,faArrowUp,faChartLine,faBars,faFileAlt,faChartBar,faTable,faKeyboard,faTh,faBell,faChartArea,faChartPie} from '@fortawesome/free-solid-svg-icons';
import  { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;





function Main() {

//sidebar togger

// Barchart functions

const options  = {
  animationEnabled: true,
  
  theme: "light2",
 
  axisY: {
    title:"sales",
    includeZero: true
  },
  data: [{
    type: "column",
    indexLabelFontColor: "#5A5757",
    indexLabelPlacement: "outside",
    color: "#007bff",
    dataPoints: [
      { x: 10, y: 71 },
      { x: 20, y: 55 },
      { x: 30, y: 50 },
      { x: 40, y: 65 },
      { x: 50, y: 71 },
      { x: 60, y: 68 },
      { x: 70, y: 38 },
      { x: 80, y: 92, indexLabel: "Highest" },
      { x: 90, y: 54 },
      { x: 100, y: 60 },
      { x: 110, y: 21 },
      { x: 120, y: 49 },
      { x: 130, y: 36 }
    ]
  }]
}

//LineChart function

const option = {
  animationEnabled: true,
  
  axisY: {
    title: "Customers"
  },
  toolTip: {
    shared: true
  },
  data: [
    {
      type: "spline",
      name: "2023",
      showInLegend: true,
      color: "#0080FF", // Primary color for 2016
      dataPoints: [
        { y: 155, label: "Jan" },
        { y: 150, label: "Feb" },
        { y: 152, label: "Mar" },
        { y: 148, label: "Apr" },
        { y: 142, label: "May" },
        { y: 150, label: "Jun" },
        { y: 146, label: "Jul" },
        { y: 149, label: "Aug" },
        { y: 153, label: "Sept" },
        { y: 158, label: "Oct" },
        { y: 154, label: "Nov" },
        { y: 150, label: "Dec" }
      ]
    },
    {
      type: "spline",
      name: "2024",
      showInLegend: true,
      color: "#17a2b8", // Primary color for 2017
      dataPoints: [
        { y: 172, label: "Jan" },
        { y: 173, label: "Feb" },
        { y: 175, label: "Mar" },
        { y: 172, label: "Apr" },
        { y: 162, label: "May" },
        { y: 165, label: "Jun" },
        { y: 172, label: "Jul" },
        { y: 168, label: "Aug" },
        { y: 175, label: "Sept" },
        { y: 170, label: "Oct" },
        { y: 165, label: "Nov" },
        { y: 169, label: "Dec" }
      ]
    }
  ]
};


  {/* date function*/}
  const [selectedDate, setSelectedDate] = useState(null);

  const [tasks,setTasks] = useState([])

  useEffect(()=>{
      axios.get('http://127.0.0.1:8000/api/tasks')
      .then(response =>response.data)
      .then((e)=>{
         let tasks = e.data
         setTasks(tasks)
      })
  },[]) 

{/*data get  method*/}
const [posts,setPosts] = useState([])

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/posts')
        .then(response =>response.data)
        .then((e)=>{
           let posts = e.data
           setPosts(posts)
        })
    },[]) 
  
// dropdown function

     const [showSidebar, setShowSidebar] = useState(false); // State to control sidebar visibility

     const handleSidebarToggle = () => {
       setShowSidebar(!showSidebar); // Toggle sidebar visibility
};


//form data

const [taskInput, setTaskInput] = useState("");

const addTask = (newTask) => {
  axios.post('http://127.0.0.1:8000/api/inserttask', newTask)
    .then(response => {
      console.log('Response:', response);
      alert("The request was successfully processed, and the data has been submitted to the server.");
      
    })
    .catch(error => {
      
      console.error('Error adding task:', error);
    });
};

const handleChange = (event) => {
  setTaskInput(event.target.value);
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const newTask = {
    task: taskInput
  };

  addTask(newTask);

  // Clear the input field
  setTaskInput("");
};


const handleDelete = (id) => {
  axios.delete(`http://127.0.0.1:8000/api/deletetask/${id}`)
    .then(() => {
      console.log('The data has been successfully deleted from the server.');
      alert("The request was successfully processed, and the data has been deleted from the server.");
      // Remove the deleted task from the state
      setTasks(tasks.filter(task => task.id !== id));
    })
    .catch(error => {
      console.error('There was an error deleting the data:', error);
    });
};

// toggler




  return (
    // <div className="Font">
      <div className="container-xxl position-relative bg-white d-flex p-0">
      

      {/* Sidebar Start */}
      <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <a href="index.html" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            LinesTech
          </h3>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src="\image\user.jpg"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          {posts.map((post) => (
            <div key={post.id} className="ms-2">
              <h6 className="mb-0">{post.Adminname}</h6>
            </div>
          ))}
        </div>
        <div className="navbar-nav w-100">
          <Link to="/Main" className="nav-item nav-link active ">
            <i className="me-2"><FontAwesomeIcon icon={faGaugeHigh} /></i>Dashboard
          </Link>
          
          <li className="nav-item">
            <a className="nav-link  nav-itemcollapsed" data-bs-toggle="collapse" href="#warehouse-list" >
              <i className="me-2"><FontAwesomeIcon icon={ faWarehouse} /></i>Warehousing<i className="bi bi-chevron-down mt-2" style={{ marginTop: "2px" }} ></i>        
            </a>
                   <ul id="warehouse-list" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                      <Link to="/Inventory" className="nav-item nav-link  ">
                      <i className="me-2"><FontAwesomeIcon icon={faBox} className="fa-xs" /></i>Inventory
                      </Link>
                      <Link to="/Salesorder" className="nav-item nav-link" >
                         <i className=" me-2"><FontAwesomeIcon icon={faShoppingCart} className="fa-xs" /></i>Salesorder
                      </Link>
                      <Link to="/Transfers" className="nav-item nav-link active">
                         <i className=" me-2"><FontAwesomeIcon icon={faExchangeAlt} className="fa-xs" /></i>Transfers
                      </Link>
                   </ul>
          </li>

          <Link to="/Invoices" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faFileInvoice} /></i>Invoices
          </Link>
          <Link to="/Projects" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faFolderOpen} /></i>Projects
          </Link>
          {/* <Link to="/Chats" className="nav-item nav-link">
            <i className="me-2"><FontAwesomeIcon icon={faComment} /></i>Chats
          </Link> */}

          <li className="nav-item">
            <a className="nav-link  nav-itemcollapsed" data-bs-toggle="collapse" href="#people-list" >
              <i className="me-2"><FontAwesomeIcon icon={faList} /></i>People<i className="bi bi-chevron-down mt-2" style={{ marginTop: "2px" }} ></i>        
            </a>
                   <ul id="people-list" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                      <Link to="/User" className="nav-item nav-link">
                        <i className=" me-2"><FontAwesomeIcon icon={faUserFriends} className="fa-xs"  /></i>User List
                      </Link>
                      <Link to="/Client" className="nav-item nav-link" >
                         <i className=" me-2"><FontAwesomeIcon icon={faUserShield}  className="fa-xs" /></i>Client List
                      </Link>
                   </ul>
          </li>
          <Link to="/zoom" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faVideo} /></i>Zoom Meeting
          </Link>
          <li className="nav-item">
            <a className="nav-link  nav-itemcollapsed" data-bs-toggle="collapse" href="#hrm-list" >
              <i className="me-2"><FontAwesomeIcon icon={faBox} /></i>HRM<i className="bi bi-chevron-down mt-2" style={{ marginTop: "2px" }} ></i>        
            </a>
                   <ul id="hrm-list" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                      <Link to="/HRM" className="nav-item nav-link">
                        <i className=" me-2"><FontAwesomeIcon icon={faList} /></i>Employee List
                      </Link>
                      <Link to="/Payroll" className="nav-item nav-link" >
                         <i className=" me-2"><FontAwesomeIcon icon={faMoneyCheckAlt} /></i>Payroll
                      </Link>
                      <Link to="/Leavemanagement" className="nav-item nav-link" >
                         <i className=" me-2"><FontAwesomeIcon icon={faCalendarTimes} /></i>Leave List
                      </Link>
                   </ul>
          </li>
           <Link to="/Automation" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faCog} /></i>Automation
          </Link>
          <Link to="/Table" className="nav-item nav-link">
            <i className="me-2"><FontAwesomeIcon icon={faDatabase} /></i>Database
          </Link>
          <Link to="/Form" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faFileAlt} /></i>Forms
          </Link>
          <Link to="/Support" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faLifeRing} /></i>Support
          </Link>
        </div>
      </nav>
    </div>
    
      {/* Content */}
      <div className="content">
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                    <h2 className="text-primary mb-0">
                        <i className="fa fa-hashtag"></i>
                    </h2>
                </a>
                <a href="#" className="sidebar-toggler flex-shrink-0" onClick={handleSidebarToggle}>
                    <i>
                        <FontAwesomeIcon icon={faBars} />
                    </i>
                </a>
                <form className="d-none d-md-flex ms-4">
                    <input className="form-control border-0" type="search" placeholder="Search" />
                </form>
                <div className="navbar-nav align-items-center ms-auto">
                
                
                <Dropdown>
                  
                  <Dropdown.Toggle variant="light" id={`dropdown-messages`}>
                       <i className=" me-lg-2">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                        <span className="d-none d-lg-inline-flex">Message</span>
                  </Dropdown.Toggle>
                     <Dropdown.Menu>
                     {posts.map((post, index) => (
                <div key={index}>
                          <Dropdown.Item>
                                <div className="d-flex align-items-center">
                                    <img className="rounded-circle " src="\image\user.jpg" alt="" style={{ width: "40px", height: "40px" }} />
                                      <div className="ms-2">
                                         <h6 className="fw-normal mb-0">{post.name1} sent you a message</h6>
                                            <small>{post.time}</small>
                                      </div>
                                </div>
                            </Dropdown.Item>
                            </div>
                            ))}
                     </Dropdown.Menu>
                         
                     
               </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle variant="light" id={`dropdown-notifications`}>
                      <i className="me-lg-2">
                             <FontAwesomeIcon icon={faBell}  />
                      </i>
                      <span className="d-none d-lg-inline-flex">Notification</span>
                              </Dropdown.Toggle>
                               <Dropdown.Menu>
                               {posts.map((post, index) => (
                              <div key={index}>
                              <Dropdown.Item href="#">
                             <div className="d-flex align-items-center">
                               <img className="rounded-circle" src="\image\user.jpg"alt="" style={{ width: "40px", height: "40px" }} />
                                 <div className="ms-2">
                                <h6 className="fw-normal mb-0">{post.name1}, A New user added</h6>
                                 <small>{post.time}</small>
                                </div>
                                </div>
                              </Dropdown.Item>
                              </div>
                            ))}
                    </Dropdown.Menu>
                 </Dropdown>
                 
                 <Dropdown>
                  <Dropdown.Toggle variant="light" id={`dropdown-notifications`}>
                  <img className="rounded-circle me-lg-2" src="\image\user.jpg" alt="" style={{ width: "40px", height: "40px" }} />

                  {posts.map((post, index) => (
                              <span className="d-none d-lg-inline-flex">{post.Adminname}</span>
                              ))}
                              </Dropdown.Toggle>
                               <Dropdown.Menu>
                               
                              <Dropdown.Item href="#">
                             <div className="d-flex align-items-center">
                               
                                 <div className="ms-2">
                                <Link to="/"><span className="fw-normal mb-0 btn btn-sm btn-primary">Log Out</span></Link>
                                 
                                </div>
                                </div>
                              </Dropdown.Item>
                              
                            
                    </Dropdown.Menu>
                 </Dropdown>
                             </div>
                           </nav>
                           <div>

        {/* Main Content */}
        
        
        <div className="container-fluid pt-4 px-4">
        
          <div className="row g-4">
          <div className="col-sm-6 col-xl-3">
          
                    <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                        <i className=" fa-3x text-primary"><FontAwesomeIcon icon={faChartLine}  /></i>
                        
                        <div className="ms-3">
                            
                            <p className="mb-2">Today Sale</p>
                            {posts.map((post) => { return (
                            <h6 className="mb-0" key={post.id}>
                            {post.todaysale}</h6> 
                             )})}
                            
                            
                        </div>
                        
                    </div>
                   
                </div>
                 
                <div className="col-sm-6 col-xl-3">
                    <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                        <i className="fa-3x text-primary"><FontAwesomeIcon icon={faChartBar}  /></i>
                        <div className="ms-3">
                            <p className="mb-2">Total Sale</p>
                            {posts.map((post) => { return (
                            <h6 className="mb-0">{post.totalsale}</h6>
                            
                            )})}
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                        <i className=" fa-3x text-primary"><FontAwesomeIcon icon={faChartArea}/></i>
                        <div className="ms-1">
                            <p className="mb-2">Today Revenue</p>
                            {posts.map((post) => { return (
                            <h6 className="mb-0">{post.todayrevenue}</h6>
                            )})}
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                        <i className=" fa-3x text-primary"><FontAwesomeIcon icon={faChartPie}/></i>
                        <div className="ms-2">
                            <p className="mb-2">Total Revenue</p>
                            {posts.map((post) => { return (
                            <h6 className="mb-0">{post.totalrevenue}</h6>
                            )})}
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
         

        <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Worldwide Sales</h6>
                                
                            </div>
                            <div>
    <CanvasJSChart options = {options} 
      
    />
    

  </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-6">
                        <div class="bg-light text-center rounded p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">New Customers</h6>
                                
                            </div>
                            <div>
			<CanvasJSChart options = {option} 
				
			/>
			
		</div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-md-6 col-xl-4">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6 className="mb-0">Messages</h6>
                            
                        </div>
                        {posts.map((post, index) => (
        <div key={index} className="d-flex align-items-center border-bottom py-3">
            <img className="rounded-circle flex-shrink-0" src="\image\user.jpg" alt="" style={{ width: "40px", height: "40px" }}></img>
            <div className="w-100 ms-3">
                <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">{post.name1}</h6>
                    <small>{post.time}</small>
                </div>
                <span>{post.message}</span>
            </div>
        </div>
    ))}
    </div>
      </div>
                        
                        
        
                <div className="col-sm-12 col-md-6 col-xl-4">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Calender</h6>
                            
                        </div>
                        <div id="calender">
                       <DatePicker
                       selected={selectedDate}
                       onChange={(date) => setSelectedDate(date)}
                       inline
                       />
                      </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-xl-4">
                    <div className="h-100 bg-light rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">To Do List</h6>
                            
                        </div>
                        <form action="" onSubmit={handleFormSubmit}>
                        <div className="d-flex mb-2">
                            <input className="form-control bg-transparent" type="text" id="task" name="task" onChange={handleChange} placeholder="Enter task"></input>
                            <button type="submit" className="btn btn-primary ms-2">Add</button>
                        </div></form>
                        
                        {tasks.map((task) => { return (
                        <div className="d-flex align-items-center border-bottom py-2">
                            <input className="form-check-input m-0" type="checkbox"></input>
                            <div className="w-100 ms-3">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <span>{task.task}</span>
                                    <button onClick={() => handleDelete(task.id)} className="btn btn-sm"><FontAwesomeIcon icon={faTrashAlt}/></button>
                                </div>
                            </div>
                        </div>)})}
                        
                        
                        
                        
                    </div>
                </div>
          </div>
        </div>

        {/* Footer */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light rounded-top p-4">
            <div className="row">
              <div className="col-12 col-sm-6 text-center text-sm-start">
                 
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i><FontAwesomeIcon icon={faArrowUp}/></i>
      </a>
 
    </div> 
    </div>
    // </div>
    
  );
}

export default Main;


