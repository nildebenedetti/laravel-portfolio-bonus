import { useContext } from "react";
import YoutubePlayerComponent from "./YoutubePlayerComponent.jsx";
import { ThemeContext } from "../contexts/ThemeContext.jsx";

function MediaCarousel({ project }) {
    const { theme } = useContext(ThemeContext);

    if (!project) return null;

    const BASEURL = import.meta.env.VITE_SERVER_URL;

    const mediaItems = [];

    if (project.video_ID) {
        mediaItems.push({ type: 'video', ID: project.video_ID });
    }

    // collect only present images safely
    const images = [
        project.image ? { type: 'image', src: `${BASEURL}/storage/${project.image}`, alt: project.alt_text || project.alt } : null,
        project.image_pt_1 ? { type: 'image', src: `${BASEURL}/storage/${project.image_pt_1}`, alt: project.alt_text_pt_1 } : null,
        project.image_pt_2 ? { type: 'image', src: `${BASEURL}/storage/${project.image_pt_2}`, alt: project.alt_text_pt_2 } : null,
        project.image_pt_3 ? { type: 'image', src: `${BASEURL}/storage/${project.image_pt_3}`, alt: project.alt_text_pt_3 } : null,
        project.image_pt_4 ? { type: 'image', src: `${BASEURL}/storage/${project.image_pt_4}`, alt: project.alt_text_pt_4 } : null,
    ].filter(Boolean); // remove all nulls 

    mediaItems.push(...images);

    console.log(mediaItems);
    

    // check if video is present
    const hasVideo = Boolean(project.video_ID);

    if (!hasVideo && images.length === 0) return null;

    const carouselId = `carouselProject-${project.id || 'detail'}`;

    return (
        <div id={carouselId} 
            className={`carousel slide mb-4 ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}
            data-bs-interval="false">

            {/* Indicators visible only if more than 1 slide) */}
            {mediaItems.length > 1 && (
                <div className="carousel-indicators">
                    {mediaItems.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : undefined}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Slide */}
            <div className="carousel-inner">
                {mediaItems.map((item, index) => (
                    <div 
                        key={index} 
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    >
                        { item.type === 'video' && (<YoutubePlayerComponent
                        videoID={item.ID}
                        title={`${project.title} - project demo video`}
                    />

                        )}

                        { item.type === 'image' && ( <img 
                                src={item.src} 
                                className="d-block w-100" 
                                alt={item.alt || `Image ${index + 1} of ${project.title || 'project'}`} 
                            />)}

                        {item.type === 'image' && item.alt && (
                                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                                    <p className="mb-0 text-white">{item.alt}</p>
                                </div>
                            )}
                    </div>

                ))}
            </div>

            {/* visible only if iamges >1 */}
            {mediaItems.length > 1 && (
                <>
                    <button 
                        className="carousel-control-prev" 
                        type="button" 
                        data-bs-target={`#${carouselId}`} 
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button 
                        className="carousel-control-next" 
                        type="button" 
                        data-bs-target={`#${carouselId}`} 
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </>
            )}
        </div>
    );
}

export default MediaCarousel;