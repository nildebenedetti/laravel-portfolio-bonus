import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import ProjectCard from "../components/ProjectCard.jsx";
import { stackTypeRange } from "../utils/utilities.js";

function HomePage() {
  const [ types, setTypes ] = useState([]);
  const [ technologies, setTechnologies ] = useState([]);
  const [ projects, setProjects ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  const [ errorMsg, setErrorMsg] = useState(null);
  const [ searchParams, setSearchParams ] = useSearchParams();



  // single fetch: projects, types and technologies are all derived from the same response
  useEffect( () => {
    async function fetchProjectsData () {

      try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);

        if (!response.ok) {

            throw new Error(`Error HTTP: ${response.status}`);

          }

        const data = await response.json();

        const allProjects = Array.isArray(data)
          ? data
          : (data.data || data.allProjects || data.projects || []);

        const uniqueTypesMap = new Map();
        const uniqueTechnologiesMap = new Map(); // evita duplicazioni

        allProjects.forEach( project => {

          if (project.type && project.type.id) {
            uniqueTypesMap.set(project.type.id, project.type);
          }

          if (Array.isArray(project.technologies)) {
            project.technologies.forEach(tech => {
              // Usiamo l'id come chiave: la Map sovrascrive automaticamente i doppioni
              uniqueTechnologiesMap.set(tech.id, tech);
            });
          }

        });

        setProjects(allProjects);
        setTypes(Array.from(uniqueTypesMap.values()));
        setTechnologies(Array.from(uniqueTechnologiesMap.values()));

      } catch (error) {

        console.error("error while fetching projects data", error);
        setIsError(true);
        setErrorMsg(error.message);

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

  // active filters are read from the URL, so they survive reloads and can be shared
  const activeTypeIds = useMemo(
    () => (searchParams.get('type') || '').split(',').filter(Boolean),
    [searchParams]
  );

  // stack types
  const activeStackTypes = useMemo(
    () => (searchParams.get('stack_type') || '').split(',').filter(Boolean),
    [searchParams]
  );

  // active technologies
  const activeTechIds = useMemo(
    () => (searchParams.get('technologies') || '').split(',').filter(Boolean),
    [searchParams]
  );


  // filter handler: toggles one value inside a multi-value URL param
  const handleFilterChange = (paramKey, value) => {
    const stringValue = value.toString();

    setSearchParams( prevParams => {
      // work on a copy: never mutate the current searchParams object
      const nextParams = new URLSearchParams(prevParams);
      const currentValues = nextParams.get(paramKey) ? nextParams.get(paramKey).split(',') : [];

      const updatedValues = currentValues.includes(stringValue)
        ? currentValues.filter( val => val !== stringValue )
        : [...currentValues, stringValue];

      if (updatedValues.length > 0) {
        nextParams.set(paramKey, updatedValues.join(','));
      } else {
        nextParams.delete(paramKey);
      }

      return nextParams;
    });
  }

  // clear handler: removes every value of a single filter group
  const handleFilterClear = (paramKey) => {
    setSearchParams( prevParams => {
      const nextParams = new URLSearchParams(prevParams);
      nextParams.delete(paramKey);
      return nextParams;
    });
  }

  // shared clear button: same look as the chips, shown only when the group is filtering
  const clearButton = (paramKey, isVisible, label) => (
    isVisible && (
      <button type="button"
              onClick={ () => handleFilterClear(paramKey) }
              className="btn-metal-dark btn-filter-clear mx-1 my-2"
              aria-label={`Clear ${label} filters`}>✕ Clear</button>
    )
  );


  // useMemo hook to memoize projects list
  
  const visibleProjects = useMemo( () => {

    let list = [...projects];

    // filter by type

    if (activeTypeIds.length > 0) {
      list = list.filter( project => project.type && activeTypeIds.includes(project.type.id.toString()));
    }

    // filter by stack type
    if (activeStackTypes.length > 0) {
      list = list.filter( project => project.stack_type && activeStackTypes.includes(project.stack_type) )
    }

    // filter by technology
    if (activeTechIds.length > 0) {
      list = list.filter(project => 
        Array.isArray(project.technologies) && 
        project.technologies.some(tech => activeTechIds.includes(tech.id.toString()))
      );
    }

    return list;

  }, [projects, activeTypeIds, activeStackTypes, activeTechIds]);
  

  if (isLoading) return <p>Data is loading...</p>;
  if (isError) return <p>Error while fetching data.{errorMsg && ` (${errorMsg})`}</p>;

  return <>
      <div className="container mx-auto py-4">
      <div className="welcome py-3">
        <h1>Welcome to my Portfolio</h1>
        <p className="py-3 text-description">Feel free to wander through my projects however you like: dive straight into the code on GitHub, watch the demos, or read through the descriptions.</p>
      </div>
      <h2 className="pb-4">All Projects</h2>
      <div className="filterChips">
        <div className="typeFilterChips mb-3">
          <h6>Select Type:</h6>
          { types.map( ( type ) => {

            const isActive = activeTypeIds.includes(type.id.toString());

            return <button key={type.id} 
                          onClick={() => handleFilterChange('type',type.id) }
                          className={`btn-metal-dark mx-1 my-2 ${ isActive ? 'active border-light bg-secondary' : ''}`}>{type.name}{isActive && "  ✓"}</button>
          } )}
          { clearButton('type', activeTypeIds.length > 0, 'type') }
        </div>
        <div className="stackTypesFilterChips mb-3">
          <h6>Select Architecture:</h6>
          {
            stackTypeRange.map( (stackType) => {
              const isActive = activeStackTypes.includes(stackType.value);
              return <button key={stackType.value}
                            onClick={ () => ( handleFilterChange('stack_type', stackType.value)) }
                            className={`btn-metal-dark mx-1 my-2 ${ isActive ? 'active border-light bg-secondary' : ''}`}>{stackType.label}{isActive && "  ✓"}
              </button>
            })
          }
          { clearButton('stack_type', activeStackTypes.length > 0, 'architecture') }
        </div>
        <div className="technologieFilterChips mb-3">
          <h6>Select Tech Stack:</h6>
          {
            technologies.map( (tech) => {
              const isActive = activeTechIds.includes(tech.id.toString());
              return <button key={tech.id}
                            onClick={ () => handleFilterChange('technologies', tech.id) }  
                            className={`btn-metal-dark mx-1 my-2 ${isActive ? 'active border-light bg-secondary' : ''}`}>{tech.name}{isActive && "  ✓"}</button>
            })
          }
          { clearButton('technologies', activeTechIds.length > 0, 'technology') }
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
        {visibleProjects.map((project) => (
          <div className="col d-flex" key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    <div className="d-flex flex-column align-items-center justify-content-center gap-3 my-3 pt-3">
          <h5 className="mb-3 mt-3">Want to know more about me?</h5>
          <a href="/contacts" className="btn-metal-dark mb-0">
            Go to Contacts
          </a>
        </div>
    </div>
    </>
  ;
}
export default HomePage;
