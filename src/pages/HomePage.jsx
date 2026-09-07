import { useState, useEffect } from "react";
import '../components/ProjectCard.jsx';
import ProjectCard from "../components/ProjectCard.jsx";

function HomePage() {
  const [ projects, setProjects ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);

      if (!response.ok) {

          throw new Error(`Errore HTTP: ${response.status}`);
        
        }

        const { data } = await response.json();
        

        setProjects(data);

      } catch (error) {
        
        console.error("error while fetching projects data", error);
        setIsError(true);


      } finally {
        
        setIsLoading(false);
      
      }
    };

    fetchProjectsData();

  }, []);

  if (isLoading) return <p>Data is loading...</p>;
  if (isError) return <p>Error while fetching data.</p>;

  return <>
      <h1>All Projects</h1>
      <div className="container mx-auto">
        <div className="row justify-content-center g-3">
          {projects.map(( project ) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </>
  ;
}
export default HomePage;
