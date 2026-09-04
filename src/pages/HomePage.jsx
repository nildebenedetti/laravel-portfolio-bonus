import { useState, useEffect } from "react";

function HomePage() {
  const [ projects, setProjects ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/FAKE`);

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
