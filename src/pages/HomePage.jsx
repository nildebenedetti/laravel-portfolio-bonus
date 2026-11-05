import { useState, useEffect } from "react";
import '../components/ProjectCard.jsx';
import ProjectCard from "../components/ProjectCard.jsx";

function HomePage() {
  const [ projects, setProjects ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  const [ errorMsg, setErrorMsg] = useState(null);

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
      <div className="welcome py-3">
        <h1>Welcome to my Portfolio</h1>
        <p className="py-3">Feel free to wander through my projects and explore in the way you prefer: go through code by accessing GitHub repositories or watch the demos and read the provided descriptions!</p>
        <p>Want to know more about me?</p>
        <a href="/contacts" className="btn-metal-dark mb-4">Go to Contacts</a>
      </div>
      <h2 className="pb-4">All Projects</h2>
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
