import React, {Component} from "react";
import Zmage from "react-zmage";
import axios from "axios";
import Fade from "react-awesome-reveal";
import api from "../api/apiResponse";
import { Link } from 'react-router-dom';

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            project :[],
            loading : true,
            error : null
        }
    }
     componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get(api.getPostLimit); // Gantilah URL dengan API yang sesuai
      const project = response.data; // Misalnya, ambil 10 data pertama
      this.setState({ project, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

    render() {
        if (!this.props.data) return null;
         const { project, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    let projectItems;

        


 if (project.length === 0) {
        projectItems = <div style={{ textAlign: "center", margin: "auto" }}>No projects available</div>;
    } else {
        projectItems = project.map(pr => {
            let projectImage = `${api.url}/storage/images/` + pr.gambar;
            let projectTitle = pr.title;
            let id = pr.id;
            return (
                <Link to={`/showproject/${id}`} key={id}>
                    <div className="columns portfolio-item">
                        <div className="item-wrap">
                            <Zmage alt={projectTitle} src={projectImage} />
                            <div style={{ textAlign: "center" }}>{projectTitle}</div>
                        </div>
                    </div>
                </Link>
            );
        });
    }

        return (
            <section id="portfolio">
                <Fade left duration={1000} distance="40px">
                    <div className="row">
                        <div className="twelve columns collapsed">
                            <h1>Check out some of my works</h1>
                            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                                {projectItems}
                            </div>
                        </div>
                    </div>
                    {
                        project.length > 0 ? ( <div style={{textAlign: "center", margin: "10px auto" }} className="">
                                    <p style={{textAlign: "center"}}>
                                        <a href="/project" className="button">
                                        MORE PROJECT                                     </a>

                                    </p>
                                    </div>
                        ) : (
                            ""
                        )
                    }

                    
                </Fade>
            </section>
        );
    }
}

export default Portfolio;