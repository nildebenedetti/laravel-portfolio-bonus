import { useNavigate } from 'react-router'; 
import styles from "./ProjectCard.module.css";

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
                    <h3 className="project-title text-capitalize h5 fw-bold">{project.title}</h3>
                </div>
                
                <div className="card-body">
                    <small className="d-block mb-2">
                        <span className="fw-bold">Client:</span>
                        <br /> 
                        <span className="fst-italic">{project.client}</span>
                    </small>

                    {project.image && (
                        <div className={styles.imageWrapper}>
                            <img src={`${baseUrl}/storage/${project.image}`} alt={project.alt_text} />
                        </div>
                    )}
                    
                    <div className="type-wrapper py-2">
                        <span className={`badge rounded-pill ${pillColors[project.type?.name] || ''}`}>
                            {project.type?.name}
                        </span>
                    </div>
                    
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