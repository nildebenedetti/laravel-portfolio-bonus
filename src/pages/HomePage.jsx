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
      <div className="container mx-auto py-4">
      <h1 className="pb-4">All Projects</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
        {projects.map((project) => (
          <div className="col d-flex" key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
    </>
  ;
}
export default HomePage;
