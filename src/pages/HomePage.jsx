import { useState, useEffect } from "react";

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/projects/");

        const { data } = await response.json();

        console.log(data);
        

        setProjects(data);

      } catch (error) {
        
        console.error("error while fetching projects data", error);

      } finally {
        
        setLoading(false);
      
      }
    };

    fetchProjectsData();

  }, []);

  return <>
      <h1>Home</h1>

      <div className="container">
        <ul>
          {projects.map(( project ) => (
            <li key={project.id}>{project.title}</li>
          ))}
        </ul>
      </div>
    </>
  ;
}
export default HomePage;
