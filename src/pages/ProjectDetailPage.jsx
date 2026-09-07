import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import styles from "./ProjectDetailPage.module.css";

function ProjectDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

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
        <h1>ciao</h1>
    </>
    }

export default ProjectDetailPage;