import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Zmage from 'react-zmage';
import axios from 'axios';
import Fade from "react-awesome-reveal";
import api from "../api/apiResponse";// Pastikan jalur impor sesuai

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api.getPost);
        console.log(response.data);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
 
  const projectItems = projects.map(pr => {
    let projectImage = "http://127.0.0.1:8000/storage/images/" + pr.gambar;
    let projectTitle = pr.title;
    let id = pr.id;
    return (
      <div key={id} className="columns portfolio-item">
       <Link to={`/showproject/${id}`}  key={id}>
          <div className="item-wrap">
            <Zmage alt={projectTitle} src={projectImage} />
            <div style={{ textAlign: "center" }}>{projectTitle}</div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className='App'>
      <nav id="nav-wrap" style={{backgroundColor: "darkslateblue"}}>
        
                    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                        Show navigation
                    </a>
                    <a className="mobile-btn" href="#home" title="Hide navigation">
                        Hide navigation
                    </a>
                    
                    <ul id="nav" className="nav">
                        <li className="">
                            <a className="smoothscroll" href="/">
                               Back To Home
                            </a>
                        </li>

                      
                    </ul>
                </nav>
    <section id="portfolio" style={{minHeight: '100vh'}}>
      <Fade left duration={1000}>
        <div className="row">
          <div className="twelve columns collapsed">
            <h1>More Project</h1>
            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
              {projectItems}
            </div>
          </div>
        </div>
      </Fade>
    </section>
    </div>
  );
};

export default Project;