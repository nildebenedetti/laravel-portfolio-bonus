import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router";
import styles from "./ProjectDetailPage.module.css";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import MediaCarousel from "../components/MediaCarousel.jsx";
import { stackTypeRange } from "../utils/utilities.js";
import { FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

function ProjectDetailPage() {
    const { id } = useParams();
    const { theme } = useContext(ThemeContext);
    const [ project, setProject ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(false);


    useEffect( () => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`);

                if (!response.ok) {
                    throw new Error("error while fetching project data.");
                }

                const { data } = await response.json();

                setProject(data);
                setError(null);

            } catch  (error) {

                console.error("error while fetching project data", error);
                setError(error.message || "something went wrong while fetching project data");

            } finally {
                
                setIsLoading(false);

            }
        }

        fetchProject();

    }, [ id ]);

    if (!project) {
        return <div className="container py-5 text-center">Caricamento in corso...</div>;
    }

    const stackLabel = stackTypeRange.find( (item) => project.stack_type === item.value)?.label || project.stack_type;


    if (isLoading) {
        return <>
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            </>
        }
        
    if (error) {
    return <>
        <div className="container py-5">
            <div className="alert alert-danger">{error}</div>
            <Link to="/" className="btn btn-outline-dark">
            &larr; Back to all Projects
            </Link>
        </div>
        </>
    }

    return <>
        <div className="navigation-btn my-2 align-self-start ms-3 mt-2">
            <Link to="/" className="btn btn-metal-dark my-2">
            &larr; Back to all Projects
            </Link>
        </div>
        <div className="wrapper33">
            <div className="row g-3 justify-content-center">
        {/* Main Column: Description and GitHub Call to Action */}
        <div className="col-lg-8">
            <div className="px-3 border-0 py-2 rounded-4">
            
            {/* Project Header */}
            <div className="border-bottom pb-4 mb-4">
                {/* Project Title */}
                
                <h1 className="display-5 fw-bold text-capitalize mt-3">
                {project.title}
                </h1>

                {/* Live Link */}
                {project.live_link && <div>
                    <a href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary text-underlined"><FaExternalLinkAlt className="" /> Visit Live Website</a>
                </div>}

                {project.type?.name && (
                <h5 className="mt-3">{project.type.name}</h5>
                )}

                { project.client ? <>
                <div className="d-flex flex-column align-items-start justify-content-start gap-2 mb-3">
                <span>
                    Client: {project.client}
                </span>
                </div> 
                </> :  <><div className="d-flex flex-column align-items-start justify-content-start gap-2 mb-3">
                <span>
                    Personal Project
                </span>
                </div> </>
                }
                
                

                {/* Media Carousel */}
                {(project.video_ID || project.image || project.image_pt_1 || project.image_pt_2 || project.image_pt_3 || project.image_pt_4) && (
                    <MediaCarousel project={project} />
                )}

                {/* Architecture */}
                { project.stack_type &&  <h5 className="mb-3">Architecture: {stackLabel}</h5>}

                {/* Tech Stack Badges */}
                {project.technologies && project.technologies.length > 0 && <div className="d-flex align-items-baseline gap-2">
                    <h5 className="mb-3">Technologies:</h5>
                <div className="d-flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((technology) => (
                    <span
                        key={technology.id || technology.name}
                        className="badge rounded-pill"
                        style={{ backgroundColor: technology.color }}
                    >
                        {technology.name}
                    </span>
                    ))}
                </div>
                </div>}
                

            </div>

            {/* GitHub Repository Box */}
                <div className={`${ theme === 'dark' ? 'bg-light' : 'bg-dark'} px-4 py-3 rounded-3 border mb-4 text-center text-md-start d-flex flex-column flex-md-row align-items-center justify-content-between gap-3`}>
                    <div>
                        <h5 className={`mb-1 fw-bold ${ theme === 'dark' ? 'text-dark' : 'text-light' }`}>{ project.stack_type === 'full_stack' ? 'Project Repositories' : 'Project Repository' }</h5>
                        <p className={`text-opacity-50 small mb-0 ${ theme === 'dark' ? 'text-dark' : 'text-light' }`}>
                        Inspect the full source code on GitHub.
                        </p>
                    </div>
                    { project.github_link && (
                    <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-metal-dark btn-lg px-4 shadow-sm flex-shrink-0"
                    >
                        <FaGithub className="text-xl me-2"/> View on GitHub
                    </a>
                    )}

                    { project.stack_type === 'full_stack' && <div className="d-flex flex-column align-items-center">
                    { project.frontend_github_link && ( <>                
                    <div className="d-flex-flex-column">
                        <p className={`${ theme === 'dark' ? 'text-dark' : 'text-light' }`}>Frontend Repo:</p>
                        <a
                            href={project.frontend_github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-metal-dark btn-lg px-4 shadow-sm flex-shrink-0"
                        >
                            <FaGithub className="text-xl me-2"/> View on GitHub
                        </a>
                    </div>
                    </>)}

                    { project.backend_github_link && ( <>                
                    <div className="d-flex-flex-column mt-3">
                        <p className={`${ theme === 'dark' ? 'text-dark' : 'text-light' }`}>Backend Repo:</p>
                        <a
                            href={project.backend_github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-metal-dark btn-lg px-4 shadow-sm flex-shrink-0"
                        >
                            <FaGithub className="text-xl me-2"/> View on GitHub
                        </a>
                    </div>
                    </>)}
                    </div>}
                </div>


            {/* Full Description */}
            <div>
                <h4 className="fw-bold mb-3 text-dark">Project Description</h4>
                <div className={`fs-5 lh-lg ${styles.description}`}>
                {project.description}
                </div>
            </div>

            </div>
        </div>

        {/* Sidebar: Quick Info and Details */}
        <div className="col-lg-3">
            <div className="card border-0 p-4 mb-4">
            <h5 className="fw-bold mb-3 text-dark">Quick Details</h5>

            <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent px-0 py-3">
                <small className="text-muted d-block">Project Title</small>
                <span className={` ${ theme === 'dark' ? 'text-light' : 'text-dark' } fw-semibold`}>{project.title}</span>
                </li>

                <li className="list-group-item bg-transparent px-0 py-3">
                <small className="text-muted d-block">Client</small>
                <span className={`fw-semibold ${ theme === 'dark' ? 'text-light' : 'text-dark' }`}>{project.client || "N/A"}</span>
                </li>

                <li className="list-group-item bg-transparent px-0 py-3">
                <small className="text-muted d-block">Tech Stack</small>
                <span className={`${ theme === 'dark' ? 'text-light' : 'text-dark' }fw-semibold `}>
                    {project.technologies && project.technologies.length > 0
                    ? project.technologies.map((tech) => tech.name).join(", ")
                    : "N/A"}
                </span>
                </li>

                <li className="list-group-item bg-transparent px-0 py-3">
                    <small className="text-muted d-block mb-1">Github</small>

                {project.github_link && <div className="mb-3">
                    <span className={`${ theme === 'dark' ? 'text-light' : 'text-dark' }fw-semibold `}><FaGithub className="text-xl me-1"/> Github Repo:</span><br />
                    <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-break small text-secondary"
                    >
                    {project.github_link}
                    </a>
                </div>
                }

                {project.frontend_github_link && <div className="mb-3">
                    <span className={`${ theme === 'dark' ? 'text-light' : 'text-dark' }fw-semibold `}><FaGithub className="text-xl me-1"/> Frontend Repo:</span><br />
                    <a
                    href={project.frontend_github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-break small text-secondary"
                    >
                    {project.frontend_github_link}
                    </a>
                </div>
                }

                {project.backend_github_link && <div className="mb-3">
                    <span className={`${ theme === 'dark' ? 'text-light' : 'text-dark' }fw-semibold `}><FaGithub className="text-xl me-1"/> Backend Repo:</span><br />
                    <a
                    href={project.backend_github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-break small text-secondary"
                    >
                    {project.backend_github_link}
                    </a>
                </div>
                }

            </li>
            </ul>
            </div>
        </div>
        </div>
        </div>
    </>
    
    }

export default ProjectDetailPage;


