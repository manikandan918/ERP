import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import { Dropdown  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGaugeHigh,faLaptop,faWarehouse,faEnvelope,faBox,faList,faUsers,faUserShield,faMoneyCheckAlt,faCalendarTimes,faUserFriends,faShoppingCart,faExchangeAlt,faFileInvoice,faCircle,faTrashAlt,faPencilAlt,faSitemap,faVideo,faLifeRing,faCog,faFolderOpen,faDatabase,faComment,faArrowUp,faChartLine,faBars,faFileAlt,faChartBar,faTable,faKeyboard,faTh,faBell,faChartArea,faChartPie} from '@fortawesome/free-solid-svg-icons';
import  { Component } from 'react';

function Edit() {

    // {data get method function}
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
// form data
  const [inputs, setInputs] = useState({ 
    firstname: "", lastname: "", email: "", phone: "", company: "", jobtitle: "",
    industry: "", address: "", leadsource: "", notes: ""
  });
  const { id } = useParams(); // Retrieve id from route parameters

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const data = { 
      email: inputs.email, firstname: inputs.firstname, lastname: inputs.lastname,
      phone: inputs.phone, company: inputs.company, jobtitle: inputs.jobtitle,
      industry: inputs.industry, address: inputs.address,
      leadsource: inputs.leadsource, notes: inputs.notes
    };

    axios.put(`http://127.0.0.1:8000/api/posts/${id}`, data)
      .then(response => {
        console.log('Response:', response);
        alert("The request was successfully processed, and the data has been updated on the server.");
      })
      .catch(error => {
        console.error('Error:', error);
        alert("There was an error processing your request. Please check the connection and try again.");
      });
  };

  const getEditPost = () => {
    axios.get(`http://127.0.0.1:8000/api/posts/${id}/edit`)
      .then(response => response.data)
      .then(response_data => {
        const post = response_data.data;
        setInputs({
          email: post.email, firstname: post.firstname, lastname: post.lastname,
          phone: post.phone, company: post.company, jobtitle: post.jobtitle,
          industry: post.industry, address: post.address,
          leadsource: post.leadsource, notes: post.notes
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert("There was an error fetching the data. Please check the connection and try again.");
      });
  };

  useEffect(() => {
    getEditPost();
  }, [id]);


  return (
    <div className="Font">
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
          <Link to="/Main" className="nav-item nav-link ">
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
          <Link to="/Table" className="nav-item nav-link active">
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

      

      <div className="container-fluid pt-4 px-4">
    <div className="col-sm-12 col-xl-6 mx-auto">
        <div className="bg-light rounded h-100 p-4">
            <h6 className="mb-4 text-center">Edit Form</h6>
            <form action="" onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name:</label>
                    <input type="text" className="form-control" id="firstname" name="firstname" value={inputs.firstname} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name:</label>
                    <input type="text" className="form-control" id="lastname" name="lastname" value={inputs.lastname} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address:</label>
                    <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input type="tel" className="form-control" id="phone" name="phone" value={inputs.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="company" className="form-label">Company:</label>
                    <input type="text" className="form-control" id="company" name="company" value={inputs.company} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="jobtitle" className="form-label">Job Title:</label>
                    <input type="text" className="form-control" id="jobtitle" name="jobtitle" value={inputs.jobtitle} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="industry" className="form-label">Industry:</label>
                    <input type="text" className="form-control" id="industry" name="industry" value={inputs.industry} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input type="text" className="form-control" id="address" name="address" value={inputs.address} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="leadsource" className="form-label">Lead Source:</label>
                    <input type="text" className="form-control" id="leadsource" name="leadsource" value={inputs.leadsource} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes/Comments:</label>
                    <textarea className="form-control" id="notes" name="notes" value={inputs.notes} onChange={handleChange} rows="4"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
</div>
</div>
    </div></div></div>
    );
}

export default Edit;

