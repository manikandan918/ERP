import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import axios from "axios";
import { Dropdown  } from 'react-bootstrap';
import {faGaugeHigh,faLaptop,faEnvelope,faBox,faUsers,faFileInvoice,faSitemap,faVideo,faLifeRing,faCog,faFolderOpen,faDatabase,faComment,faArrowUp,faChartLine,faBars,faFileAlt,faChartBar,faTable,faKeyboard,faTh,faBell,faChartArea,faChartPie} from '@fortawesome/free-solid-svg-icons';
import  { Component } from 'react';
import "./Home.css";
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';


function Chats() {
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(""); // Default selected user

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts')
      .then(response => {
        setPosts(response.data.data);
        const initialMessages = {};
        response.data.data.forEach(post => {
          initialMessages[post.name1] = [
            { text: `Hi, I'm ${post.name1}.`, sender: post.name1, time: "10:00 AM, Today" },
            { text: "How can I help you?", sender: post.name1, time: "10:01 AM, Today" }
          ];
        });
        setMessages(initialMessages);
        setSelectedUser(response.data.data[0].name1); // Set default selected user
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    const newMessageObj = {
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages({
      ...messages,
      [selectedUser]: [...messages[selectedUser], newMessageObj]
    });
    setNewMessage('');
  };

  const switchUser = (user) => {
    setSelectedUser(user === selectedUser ? '' : user);
  };

  // Filter messages based on selectedUser
  const filteredMessages = messages[selectedUser] || [];

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
          <Link to="/Inventory" className="nav-item nav-link">
            <i className="me-2"><FontAwesomeIcon icon={faBox} /></i>Inventory
          </Link>
          <Link to="/Invoices" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faFileInvoice} /></i>Invoices
          </Link>
          <Link to="/Projects" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faFolderOpen} /></i>Projects
          </Link>
          <Link to="/Chats" className="nav-item nav-link active ">
            <i className="me-2"><FontAwesomeIcon icon={faComment} /></i>Chats
          </Link>
          <Link to="/User" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faUsers} /></i>User Management
          </Link>
          <Link to="/zoom" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faVideo} /></i>Zoom Meeting
          </Link>
          <Link to="/HRM" className="nav-item nav-link">
            <i className=" me-2"><FontAwesomeIcon icon={faSitemap} /></i>HRM Management
          </Link>
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
                <a href="#" className="sidebar-toggler flex-shrink-0" >
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
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card chat-app">
                <div id="plist" className="people-list">
                  <ul className="list-unstyled chat-list mt-2 mb-0">
                    {posts.map((post, index) => (
                      <li
                        key={index}
                        className={`clearfix ${selectedUser === post.name1 ? "active" : ""}`}
                        onClick={() => switchUser(post.name1)}
                      >
                        <img src="\image\user.jpg" alt="avatar" />
                        <div className="about">
                          <h6><div className="name">{post.name1}</div></h6>
                          <div className="status"> <i className="fa fa-circle online"></i> online </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="chat">
                  <div className="chat-header clearfix">
                    {selectedUser && (
                      <div className="row">
                        <div className="col-lg-6">
                          <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                            <img src="\image\user.jpg" alt="avatar" />
                          </a>
                          <div className="chat-about">
                            <h6 className="mb-0">{selectedUser}</h6>
                            <small>Last seen: 2hr ago</small>
                          </div>
                        </div>
                        {/* <div className="col-lg-6 hidden-sm text-right">
                          
                        </div> */}
                      </div>
                    )}
                  </div>
                  <div className="chat-history">
                    <ul className="mb-0">
                      {filteredMessages.map((message, index) => (
                        <li key={index} className={`clearfix ${message.sender === 'me' ? 'me' : 'other'}`}>
                          <div className={`message-data ${message.sender === 'me' ? 'text-right' : ''}`}>
                            <span className="message-data-time">{message.time}</span>
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                          </div>
                          <div className={`message ${message.sender === 'me' ? 'my-message float-right' : 'other-message'}`}>{message.text}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                      <div className="input-group-prepend">
                        <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={handleSendMessage}>
                          <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter text here..."
                        value={newMessage}
                        onChange={handleInputChange}
                        onKeyPress={(event) => {
                          if (event.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  );
}

export default Chats;
