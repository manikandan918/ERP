import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import axios from "axios";
import { Dropdown  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGaugeHigh,faLaptop,faWarehouse,faEnvelope,faBox,faList,faUsers,faUserShield,faMoneyCheckAlt,faCalendarTimes,faUserFriends,faShoppingCart,faExchangeAlt,faFileInvoice,faCircle,faTrashAlt,faPencilAlt,faSitemap,faVideo,faLifeRing,faCog,faFolderOpen,faDatabase,faComment,faArrowUp,faChartLine,faBars,faFileAlt,faChartBar,faTable,faKeyboard,faTh,faBell,faChartArea,faChartPie} from '@fortawesome/free-solid-svg-icons';


function Invoice() {
  const [posts, setPosts] = useState([]);
  const [date1, setDate1] = useState('');
  const [invoice1, setInvoice1] = useState('');
  const [name1, setName1] = useState('');
  const [amount1, setAmount1] = useState('');
  const [paid, setPaid] = useState('');
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  // {get invoice}

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/invoices')
      .then(response => setPosts(response.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // get posts data
const [names,setNames] = useState([])

useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/posts')
    .then(response =>response.data)
    .then((e)=>{
       let names = e.data
       setNames(names)
    })
},[])

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'date1':
        setDate1(value);
        break;
      case 'invoice1':
        setInvoice1(value);
        break;
      case 'name1':
        setName1(value);
        break;
      case 'amount1':
        setAmount1(value);
        break;
      case 'paid':
        setPaid(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const data = {
      date1,
      invoice1,
      name1,
      amount1,
      paid
    };

    if (editId) {
      // If there's an editId, it means we're updating an existing entry
      axios.put(`http://127.0.0.1:8000/api/updateinvoice/${editId}`, data)
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
      axios.post('http://127.0.0.1:8000/api/insertinvoices', data)
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

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/deleteinvoice/${id}`)
      .then(() => {
        console.log('The data has been successfully deleted from the server.');
        alert("The request was successfully processed, and the data has been deleted from the server.");
        // Remove the deleted post from the state
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the data:', error);
      });
  };

  const handleEdit = (id) => {
    setEditId(id);
    const selectedPost = posts.find(post => post.id === id);
    if (selectedPost) {
      setDate1(selectedPost.date1);
      setInvoice1(selectedPost.invoice1);
      setName1(selectedPost.name1);
      setAmount1(selectedPost.amount1);
      setPaid(selectedPost.paid);
      setShow(true);
    }
  };

  const handleClose = () => {
    setDate1('');
    setInvoice1('');
    setName1('');
    setAmount1('');
    setPaid('');
    setShow(false);
    setEditId(null);
  };

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

          <Link to="/Invoices" className="nav-item nav-link active">
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
                      <i className="me-lg-2">
                             <FontAwesomeIcon icon={faBell}  />
                      </i>
                      <span className="d-none d-lg-inline-flex">Notification</span>
                              </Dropdown.Toggle>
                               <Dropdown.Menu>
                               {names.map((name, index) => (
                              <div key={index}>
                              <Dropdown.Item href="#">
                             <div className="d-flex align-items-center">
                               <img className="rounded-circle" src="\image\user.jpg"alt="" style={{ width: "40px", height: "40px" }} />
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
          <div>
            <div className="container-fluid pt-4 px-4">
              <div className="bg-light text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">Sales Invoice</h6>
                  <Button variant="primary" onClick={() => setShow(true)}>
                    Create
                  </Button>
                </div>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{editId ? 'Edit Invoice' : 'Create Invoice'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                        <label htmlFor="Date" className="form-label">Date:</label>
                        <input type="text" className="form-control" id="date1" name="date1" value={date1} onChange={handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="Invoice" className="form-label">Invoice:</label>
                        <input type="text" className="form-control" id="invoice1" name="invoice1" value={invoice1} onChange={handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Customer:</label>
                        <input type="email" className="form-control" id="name1" name="name1" value={name1} onChange={handleChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Amount:</label>
                        <input type="tel" className="form-control" id="amount1" name="amount1" value={amount1} onChange={handleChange} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="Status" className="form-label">Status:</label>
                        <input type="text" className="form-control" id="paid" name="paid" value={paid} onChange={handleChange} />
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

                <div className="table-responsive">
                  <table className="table text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                      <tr className="text-dark">
                        <th scope="col">Date</th>
                        <th scope="col">Invoice</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, index) => (
                        <tr key={index}>
                          <td>{post.date1}</td>
                          <td>{post.invoice1}</td>
                          <td>{post.name1}</td>
                          <td>{post.amount1}</td>
                          <td>{post.paid}</td>
                          <td>
                          <button onClick={() => handleEdit(post.id)} className="btn btn-sm btn-warning ms-4 "><FontAwesomeIcon icon={faPencilAlt} /></button>
                          <button onClick={() => handleDelete(post.id)} className="btn btn-sm btn-danger ms-4 "><FontAwesomeIcon icon={faTrashAlt} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
