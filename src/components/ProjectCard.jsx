import { useNavigate } from 'react-router'; 
import styles from "./ProjectCard.module.css";

function ProjectCard( { project } ) {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    const pillColors = {
        "eCommerce": "br-green",
        "Showcase Website": "bg-violet",
        "AI": "bg-orange",
        "API Service": "bg-red",
        "CRM / ERP": "bg-blue"
    }

    const btnClickHandler = () => {
        navigate(`/projects/${project.id}`);

    };

    return <>
        <div className="card">
            <div className="card-top px-3 pt-3">
                <h3 className="project-title text-capitalize">{project.title}</h3>
            </div>
            <div className="card-body">
                <small>
                    <span className="fw-bold">Client:</span>
                    <br /> 
                    <span className="fst-italic">{project.client}</span>
                </small>
            { project.image && ( <>
            <div className="image-wrapper">
                <img src={`${baseUrl}/storage/${project.image}`} alt={project.alt_text} />
            </div>
            </> )}
            <div className="type-wrapper py-2">
                <span className={`badge rounded-pill ${pillColors[project.type?.name] || ''}`}>{project.type.name}</span>
            </div>
            <div className="description-wrapper">
                <p className={styles.description}>{project.description}</p>
            </div>
                
            </div>
            <div className="px-4 pb-2 d-flex justify-content-end ">
            <button className="btn btn-dark my-2" onClick={btnClickHandler}>See more</button>
            </div>
        </div>
        </>

}
export default ProjectCard;
