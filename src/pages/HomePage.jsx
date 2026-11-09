import { useState, useEffect } from "react";
import '../components/ProjectCard.jsx';
import ProjectCard from "../components/ProjectCard.jsx";

function HomePage() {
  const [ types, setTypes ] = useState(null);
  const [ technologies, setTechnologies ] = useState(null);
  const [ projects, setProjects ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  const [ errorMsg, setErrorMsg] = useState(null);

  // stack type range is set via this array
  const stackTypeRange = [
    'full_stack',
    'frontend',
    'backend'
  ];


  // one fetch for typesd and technologies
  useEffect( () => {
    async function fetchInitialParameters () {

      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);

        if (!response.ok) {

            throw new Error(`Error HTTP: ${response.status}`);
          
          }

          const data = await response.json();
        
        const allProjects = Array.isArray(data) 
          ? data 
          : (data.allProjects || data.projects || data.data || []);

        const uniqueTypes = new Set();
        const uniqueTechnologiesMap = new Map(); // evita duplicazioni

        allProjects.forEach( project => {
          
          uniqueTypes.add(project.type);

        });

        setTypes([...uniqueTypes]);

        allProjects.forEach(project => {
          if (Array.isArray(project.technologies)) {
            project.technologies.forEach(tech => {
              // Usiamo l'id come chiave: la Map sovrascrive automaticamente i doppioni
              uniqueTechnologiesMap.set(tech.id, tech);
            });
          }
        });

        // Trasformiamo la Map pulita in un array finale di oggetti unici
        const uniqueTechnologies = Array.from(uniqueTechnologiesMap.values());

        setTechnologies([...uniqueTechnologies]);

      } catch (err) {
        console.error('error while loading Project Types and Technologies range:', err)
      } 

    }

    fetchInitialParameters();   
    

  }, []);



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

  // logghini debugghini
  //   useEffect(() => {
  //   console.log("Projects aggiornati:", projects);
  //   console.log("Types aggiornati:", types);
  //   console.log("Technologies aggiornate:", technologies);
  // }, [types, technologies, projects]);

  // useMemo hook to memoize projects list
  // filter by category
  // filter by technology

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
