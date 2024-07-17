import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import api from "../api/apiResponse";
import Fade from "react-awesome-reveal";
function Certificate() {
    const [certificate, setCertificate] = useState([]);
    useEffect(() => 
    {
        const fetchCertificate = async () =>{
           try{
             const response = await axios.get(api.getCertificate);
             setCertificate(response.data);
             console.log(response.data);
           }catch(error){
            console.log("Error fething data : " + error);
           }

        }    
        fetchCertificate();
}, [])

    const certificates = certificate.map(cr => {
           let linkCertificate = `${api.url}/storage/` + cr.linkfile;
            return(
                
                 <div key={cr.id} className="columns portfolio-item">
                    <div className="item-wrap certificate">
                        <div style={{textAlign: "center", marginBottom: "5px"}}>
                        <p style={{marginBottom: "5px"}}>
                        {cr.name}
                        </p>
                        <p style={{marginBottom: "5px"}}>
                        Credential : {cr.source}
                        </p>
                        </div>
                        <a className="button" href={linkCertificate}>
                      
                            
                            Check Certificate

                        </a>

                    </div>
                </div>
                 
            )
    })

    return(
      <div className="App">
         
        
       <section id="portfolio" style={{minHeight: '100vh'}}>
       
      <Fade left duration={1000}>
        <div className="row">
          <div className="twelve columns collapsed" style={{textAlign : "center"}}>
            <a className="button" style={{color: "white", margin: "auto",  marginBottom : "10px"}} href="/" >
                Back 
            </a>
            <h1>Certificates</h1>
            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
              {certificates}
            </div>
          </div>
        </div>
      </Fade>
    </section>
      </div>
    );
}
export default Certificate;