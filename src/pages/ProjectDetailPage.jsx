import styles from "./ProjectDetailPage.module.css";
import { useParams } from "react-router";

function ProjectDetailPage() {
    const { id } = useParams();
    return <>
        <div>ProjectDetailPage #{id}</div>
    </>
}
export default ProjectDetailPage;