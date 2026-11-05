import { IoLogoLinkedin, IoMail,   } from "react-icons/io5";
import { FaTelegram, FaGithub } from "react-icons/fa6";

function Contacts() {
    const mail = import.meta.env.VITE_EMAIL;
    const linkedInURL = import.meta.env.VITE_LINKEDIN_URL;
    const fullName = import.meta.env.VITE_FULLNAME;
    const telegram = import.meta.env.VITE_TELEGRAM;
    const github = import.meta.env.VITE_GITHUB;
    

    const myName = fullName.split(" ")[0];
    const githubLink = `https://github.com/${github}`;

    return <>

    <div className="container mx-auto py-4">
        <h1 className="mb-3 mt-3">It's me, {myName}!</h1>
        <br />

        <h3 className="my-3">About me</h3>

        <p>A Full-stack Developer with an agency background and a degree in linguistics.
        <br /><br />
        Agency environment gave me a keen eye for business logics, and the intuition needed for balancing business goals with a smooth user experience.
        <br /><br />
        Studying languages trained me to decode complex structures and read between the lines of specifications. 
        <br /><br />Today, I bring that analytical mindset into building with PHP (Laravel) and JavaScript (React, Node).
        <br /><br />
        To me, code is a tool for daydreaming between architecture and exact creativity. 
        <br />
        I find a special kind of satisfaction in database modeling, defining clean logic, and making data flow through Eloquent. 
        <br />
        I simply enjoy smoothing out friction, making things easy for the user and clear for whoever reads the codebase after me.
        <br /><br />
        When I’m not polishing component hierarchies or backend logic, you’ll likely find me practicing martial arts, chasing word etymologies, or sipping tea in the city center.
        </p>

        <br />

        <h3 className="my-3">Let's Chat!</h3>

        <p>Would enjoy a nice chat about coding or feel like sharing (constructive) opinions? <br/>
        Feel free to ping me via one of the following channels!
        </p>

        <ul className="list-unstyled py-5 d-flex flex-column align-items-center justify-content-center">
            <li className="w-100 d-flex justify-content-center mb-3">
                <a 
                    href={`mailto:${mail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-50 btn-metal-dark fst-underlined inline-block text-center mb-3"
                >
                <IoMail className="text-xl me-2" />{mail}
                </a>
            </li>
            <li className="w-100 d-flex justify-content-center mb-3">
                <a 
                href={linkedInURL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-50 btn-metal-dark mb-3"
                ><IoLogoLinkedin className="text-xl me-2" />{fullName} </a>
            </li>
            <li className="w-100 d-flex justify-content-center mb-3">
                <a href="https://github.com/nildebenedetti/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-50 btn-metal-dark fst-underlined inline-block text-center mb-3"
                > <FaGithub className="text-xl me-2"/> @{github}</a>
            </li>
            <li className="w-100 d-flex justify-content-center mb-3">
                <a href={`https://t.me/${telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-50 btn-metal-dark"    
                ><FaTelegram className="text-xl me-2"/>@{telegram}</a>
            </li>

        </ul>

    </div>
    </>
}
export default Contacts