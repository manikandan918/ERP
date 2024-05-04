import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar,  Nav } from "react-bootstrap";
import { Container, Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGaugeHigh,faLaptop,faWarehouse,faEnvelope,faBox,faList,faUsers,faUserShield,faMoneyCheckAlt,faCalendarTimes,faUserFriends,faShoppingCart,faExchangeAlt,faFileInvoice,faCircle,faTrashAlt,faPencilAlt,faSitemap,faVideo,faLifeRing,faCog,faFolderOpen,faDatabase,faComment,faArrowUp,faChartLine,faBars,faFileAlt,faChartBar,faTable,faKeyboard,faTh,faBell,faChartArea,faChartPie} from '@fortawesome/free-solid-svg-icons';
import './user.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';

function User() {
  const [names, setNames] = useState([]);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [project, setProject] = useState('');
  const [rank, setRank] = useState('');
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts')
      .then(response => response.data)
      .then((e) => {
        let names = e.data;
        setNames(names);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => setPosts(response.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'role':
        setRole(value);
        break;
      case 'project':
        setProject(value);
        break;
        case 'rank':
        setRank(value);
        break;
        case 'image':
        setImage(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const data = {
        name,
        location,
        role,
        project,
        rank,
        image
    };


    if (editId) {
      // If there's an editId, it means we're updating an existing entry
      axios.put(`http://127.0.0.1:8000/api/updateuser/${editId}`, data)
        .then(response => {
          console.log('Response:', response);
          alert("The request was successfully processed, and the data has been updated on the server.");
          handleClose();
          // Update the post in the local state
          setPosts(posts.map(post => (post.id === editId ? data : post)));
        })
        .catch(error => {
          console.error('Error:', error);
          alert("There was an error processing your request. Please check the connection and try again.");
          handleClose();
        });
    } else {
      axios.post('http://127.0.0.1:8000/api/insertusers', data)
        .then(response => {
          console.log('Response:', response);
          alert("The request was successfully processed");
          handleClose();
          setPosts([...posts, data]); // Add the new post to the local state
        })
        .catch(error => {
          console.error('Error:', error.response);
          alert("There was an error processing your request. Please check the connection.");
          handleClose();
        });
    }
  };
  //delete

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/deleteuser/${id}`)
        .then(() => {
            console.log('The data has been successfully deleted from the server.');
            alert("The request was successfully processed, and the data has been deleted from the server.");
            // Remove the deleted post from the state
            setPosts(posts.filter(post => post.id !== id));
        })
        .catch(error => {
            console.error('There was an error deleting the data:', error);
        });
} 

const handleShow = () => setShow(true);


const handleEdit = (id) => {
  setEditId(id);
  const selectedPost = posts.find(post => post.id === id);
  if (selectedPost) {
    setName(selectedPost.name);
    setLocation(selectedPost.location);
    setRole(selectedPost.role);
    setProject(selectedPost.project);
    setRank(selectedPost.rank);
    setImage(selectedPost.image);
    setShow(true);
  }
};


const handleClose = () => {
  setName('');
  setLocation('');
  setRole('');
  setProject('');
  setRank('');
  setImage('');
  setShow(false);
  setEditId(null);
};

  return (
    <div>
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
            <a className="nav-link active nav-itemcollapsed" data-bs-toggle="collapse" href="#people-list" >
              <i className="me-2"><FontAwesomeIcon icon={faList} /></i>People<i className="bi bi-chevron-down mt-2" style={{ marginTop: "2px" }} ></i>        
            </a>
                   <ul id="people-list" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                      <Link to="/User" className="nav-item nav-link active">
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
          <a href="#" className="sidebar-toggler flex-shrink-0">
            <i><FontAwesomeIcon icon={faBars} /></i>
          </a>
          <form className="d-none d-md-flex ms-4">
            <input className="form-control border-0" type="search" placeholder="Search" />
          </form>
          <div className="navbar-nav align-items-center ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="light" id={`dropdown-messages`}>
                <i className=" me-lg-2"><FontAwesomeIcon icon={faEnvelope} /></i>
                <span className="d-none d-lg-inline-flex">Message</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {names.map((name, index) => (
                  <div key={index}>
                    <Dropdown.Item>
                      <div className="d-flex align-items-center">
                        <img className="rounded-circle " src="\image\user.jpg" alt="" style={{ width: "40px", height: "40px" }} />
                        <div className="ms-2">
                          <h6 className="fw-normal mb-0">{name.name1} sent you a message</h6>
                          <small>{name.time}</small>
                        </div>
                      </div>
                    </Dropdown.Item>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="light" id={`dropdown-notifications`}>
                <i className="me-lg-2"><FontAwesomeIcon icon={faBell} /></i>
                <span className="d-none d-lg-inline-flex">Notification</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {names.map((name, index) => (
                  <div key={index}>
                    <Dropdown.Item href="#">
                      <div className="d-flex align-items-center">
                        <img className="rounded-circle" src="\image\user.jpg" alt="" style={{ width: "40px", height: "40px" }} />
                        <div className="ms-2">
                          <h6 className="fw-normal mb-0">{name.name1}, A New user added</h6>
                          <small>{name.time}</small>
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
                {names.map((name, index) => (
                  <span className="d-none d-lg-inline-flex">{name.Adminname}</span>
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



        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0"></h6>
              <Button variant="primary" onClick={handleShow}>
                Create
              </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              <Modal.Title>{editId ? 'Edit user' : 'Create user'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" name="location" value={location} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Role </label>
                    <input type="text" className="form-control" id="role" name="role" value={role} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="text" className="form-label">Rank:</label>
                    <input type="text" className="form-control" id="rank" name="rank" value={rank} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">Project:</label>
                    <input type="" className="form-control" id="project" name="project" value={project} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">image:</label>
                    <input type="file" className="form-control" id="image" name="image" onChange={handleChange} required />
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleFormSubmit}>
                      {editId ? 'Update' : 'Save'}
                    </Button>
              </Modal.Footer>
            </Modal>
            <div className="container-fluid">
  <div className="row gy-3">
    {posts.map((post, index) => (
      <div key={index} className="col-4">
        <div className="card pt-5 position-relative">
          {/* Delete Button positioned at top-right */}
          <button
            onClick={() => handleDelete(post.id)}
            className="btn btn-sm btn-danger position-absolute top-0 start-0 m-2"
            style={{ zIndex: 1 }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>

          {/* Another Button also positioned at top-right */}
          <button
            onClick={() => handleEdit(post.id)}
            className="btn btn-sm btn-warning position-absolute top-1 start-4 "
            style={{ zIndex: 1 }}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>

          <div className="user text-center">
            <div className="profile">
              <img src="\image\user.jpg" className="rounded-circle" width="80" alt="Profile" />
            </div>
          </div>
          <div className="mt-5 text-center">
            <h4 className="mb-0">{post.name}</h4>
            <span className="text-muted d-block mb-2 mt-1">{post.location}</span>
            <button className="btn btn-primary btn-sm follow">{post.role}</button>
            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
              <div className="stats">
                <h6 className="">Projects</h6>
                <span>{post.project}</span>
              </div>
              <div className="stats">
                <h6 className="">Ranks</h6>
                <span>{post.rank}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


              </div>
              </div>
            </div>
          </div>
        </div>
      
    
 
  );
}

export default User;
