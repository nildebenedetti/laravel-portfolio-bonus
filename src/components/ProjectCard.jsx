import { useNavigate } from 'react-router'; 
import styles from "./ProjectCard.module.css";
import { stackTypeRange } from '../utils/utilities.js';

function ProjectCard({ project }) {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_SERVER_URL;

    const pillColors = {
        "eCommerce": "br-green",
        "Showcase Website": "bg-violet",
        "AI": "bg-orange",
        "API Service": "bg-red",
        "CRM / ERP": "bg-blue"
    };

    const btnClickHandler = () => {
        navigate(`/projects/${project.id}`);
    };

    return (
        <div className="card w-100 h-100 shadow-sm d-flex flex-column justify-content-between">
            <div>
                <div className="card-top px-3 pt-3">
                    <h2 className="project-title text-capitalize h5 fw-bold">{project.title}</h2>
                    <h5>{ project.type.name }</h5>
                </div>
                
                <div className="card-body">
                    { project.client && (<div className="d-flex align-items-baseline gap-1">
                        <h6>Client:</h6>
                        <p>{project.client}</p>
                        </div>) }

                    {project.image && (
                        <div className={styles.imageWrapper}>
                            <img src={`${baseUrl}/storage/${project.image}`} alt={project.alt_text} />
                        </div>
                    )}
                    
                    { project.technologies && project.technologies.length > 0 && <div className="tech-stack-wrapper py-2 d-flex gap-2">
                        { project.technologies.map( (tech) => {
                            return (<span  key={tech.id || tech.name}
                                        className="badge rounded-pill"
                                        style={{ backgroundColor: tech.color }}>
                            {tech.name}
                        </span>);
                        })


                        }
                        
                    </div>}
                    
                    <div className="description-wrapper">
                        <p className={styles.description}>{project.description}</p>
                    </div>

                </div>
            </div>

            <div className="px-4 pb-3 d-flex justify-content-end">
                <button className="btn-metal-dark my-2" onClick={btnClickHandler}>See more</button>
            </div>
        </div>
    );
}

export default ProjectCard;