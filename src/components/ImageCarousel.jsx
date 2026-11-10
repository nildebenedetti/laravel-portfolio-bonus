
function ImageCarousel({ project }) {
    if (!project) return null;

    const BASEURL = import.meta.env.VITE_SERVER_URL;

// collect only present images safely
    const images = [
        project.image ? { src: `${BASEURL}/storage/${project.image}`, alt: project.alt_text || project.alt } : null,
        project.image_pt_1 ? { src: `${BASEURL}/storage/${project.image_pt_1}`, alt: project.alt_text_pt_1 } : null,
        project.image_pt_2 ? { src: `${BASEURL}/storage/${project.image_pt_2}`, alt: project.alt_text_pt_2 } : null,
        project.image_pt_3 ? { src: `${BASEURL}/storage/${project.image_pt_3}`, alt: project.alt_text_pt_3 } : null,
        project.image_pt_4 ? { src: `${BASEURL}/storage/${project.image_pt_4}`, alt: project.alt_text_pt_4 } : null,
    ].filter(Boolean); // remove all nulls 

    if (images.length === 0) return null;

    const carouselId = `carouselProject-${project.id || 'detail'}`;

    return (
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
            {/* Indicators visible only if more than 1 image) */}
            {images.length > 1 && (
                <div className="carousel-indicators">
                    {images.map((_, index) => (
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
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    >
                        <img 
                            src={img.src} 
                            className="d-block w-100" 
                            alt={img.alt || `Image ${index + 1} of ${project.title || 'project'}`} 
                        />

                        {img.alt && (
                            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                                <p className="mb-0 text-white">{img.alt}</p>
                            </div>
                        )}
                    </div>

                ))}
            </div>

            {/* visible only if iamges >1 */}
            {images.length > 1 && (
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

export default ImageCarousel;