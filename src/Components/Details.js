import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../api/apiResponse";
import axios from "axios";
function Details(){
  
  let {id} = useParams();
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   const fetchProject = async () => {
    try{
        const response = await axios.get(`${api.getPostById}${id}`);
        setProject(response.data);
        setLoading(false);
    }catch(error){
        setError(error);
        setLoading(false);
    }
   }
   fetchProject();

  });
    const contentWithUpdatedSrc = project?.content ? project.content.replace(
    /src="storage\//g,
    `src="${api.url}/storage/`
  ) : '';

    if (loading) return <div>Loading...</div>; // Tampilkan pesan loading selama proses fetch

  if (error) return <div>Error: {error.message}</div>; // Tampilkan pesan error jika ada kesalahan

    return(
        <div className="App">
      {project ? (
       <section id="resume" className="detail" style={{minHeight: '100vh'}}>
            <div className="wDetail">
            <a className="button" style={{color: "white"}} href="/project" >
                Back 
            </a>
          <h1 style={{textAlign: "center"}}>{project.title}</h1>
          <div style={{width : "100%"}}>
          <img style={{width : "100%", margin : "auto"}} src={`${api.url}/storage/images/${project.gambar}`} alt="" />
          </div>
          <h5 style={{marginTop : "10px", marginBottom : "10px"}}>
            {project.category.name}
          </h5>
         <div className="text-sm text-justify" dangerouslySetInnerHTML={{ __html: contentWithUpdatedSrc }} />
                
            </div>
        </section>
      ) : (
        <div>Project Not Found.</div>
      )}
    </div>
    )

}

export default Details;