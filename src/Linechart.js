import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import { Dropdown  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGaugeHigh,faLaptop,faEnvelope,faBox,faUsers,faFileInvoice,faTrashAlt,faSitemap,faVideo,faLifeRing,faCog,faFolderOpen,faDatabase,faComment,faArrowUp,faChartLine,faBars,faFileAlt,faChartBar,faTable,faKeyboard,faTh,faBell,faChartArea,faChartPie} from '@fortawesome/free-solid-svg-icons';import  { Component } from 'react';


function Linechart() {
  
  return(
  <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link" href="index.html">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-toggle="collapse" href="#components-nav">
              <i className="bi bi-menu-button-wide"></i><span>Components</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <a href="components-alerts.html">
                  <i className="bi bi-circle"></i><span>Alerts</span>
                </a>
              </li>
              <li>
                <a href="components-accordion.html">
                  <i className="bi bi-circle"></i><span>Accordion</span>
                </a>
              </li>
              {/* Add other component items here */}
            </ul>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-toggle="collapse" href="#forms-nav">
              <i className="bi bi-journal-text"></i><span>Forms</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="forms-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
                <a href="forms-elements.html">
                  <i className="bi bi-circle"></i><span>Form Elements</span>
                </a>
              </li>
              <li>
                <a href="forms-layouts.html">
                  <i className="bi bi-circle"></i><span>Form Layouts</span>
                </a>
              </li>
              {/* Add other form items here */}
            </ul>
          </li>

          {/* Add other navigation items here */}
        </ul>
      </aside>
    </div>
    
  );
}

export default Linechart;
