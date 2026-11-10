import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import styles from "./ProjectDetailPage.module.css";
import YoutubePlayerComponent from "../components/YoutubePlayerComponent.jsx";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import ImageCarousel from "../components/ImageCarousel.jsx";
import { stackTypeRange } from "../utils/utilities.js";

function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
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
        <div className="navigation-btn my-2">
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
                <h1 className="display-5 fw-bold text-capitalize my-3">
                {project.title}
                </h1>

                {project.type?.name && (
                <h5 >{project.type.name}</h5>
                )}

                { project.client ? <>
                <div className="d-flex flex-column align-items-start justify-content-start gap-2 mb-2">
                <span>
                    Client: {project.client}
                </span>
                </div> 
                </> :  <><div className="d-flex flex-column align-items-start justify-content-start gap-2 mb-2">
                <span>
                    Personal Project
                </span>
                </div> </>
                }

                {/* Youtube Player */}
                { project.video_ID &&
                    <YoutubePlayerComponent videoID={project.video_ID}/>
                }

                {/* Architecture */}
                { project.stack_type &&  <h5 className="mb-3">Architecture: {stackLabel}</h5>}

                {/* Tech Stack Badges */}
                {project.technologies && project.technologies.length > 0 && (
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
                )}
            </div>

            {/* GitHub Repository Box */}
                <div className={`${ theme === 'dark' ? 'bg-light' : 'bg-dark'} p-4 rounded-3 border mb-4 text-center text-md-start d-flex flex-column flex-md-row align-items-center justify-content-between gap-3`}>
                    <div>
                        <h5 className={`mb-1 fw-bold ${ theme === 'dark' ? 'text-dark' : 'text-light' }`}>Project Repository</h5>
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
                        View on GitHub
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
                            View on GitHub
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
                            View on GitHub
                        </a>
                    </div>
                    </>)}
                    </div>}
                </div>

            {/* Image Carousel */}
            {(project.image || project.image_pt_1 || project.image_pt_2 || project.image_pt_3 || project.image_pt_4) && (
                <ImageCarousel project={project} />
            )}


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
            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4">
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

                {project.github_link && (
                <li className="list-group-item bg-transparent px-0 py-3 border-bottom-0">
                    <small className="text-muted d-block mb-1">Direct Link</small>
                    <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-break small"
                    >
                    {project.github_link}
                    </a>
                </li>
                )}
            </ul>
            </div>
        </div>
        </div>
        </div>
    </>
    
    }

export default ProjectDetailPage;


