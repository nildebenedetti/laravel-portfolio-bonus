import { useState } from "react";
import styles from "./YoutubePlayerComponent.module.css";

// Accepts a bare YouTube id or a full YouTube URL and returns a safe 11-char id
function extractVideoId(value) {
    if (!value) return null;

    const raw = String(value).trim();
    const urlMatch = raw.match(/(?:youtu\.be\/|[?&]v=|embed\/)([A-Za-z0-9_-]{11})/);
    const candidate = urlMatch ? urlMatch[1] : raw;

    return /^[A-Za-z0-9_-]{11}$/.test(candidate) ? candidate : null;
}

function YoutubePlayerComponent({ videoID, title = "YouTube video player" }) {
    const [ isLoaded, setIsLoaded ] = useState(false);

    const videoId = extractVideoId(videoID);

    // No valid video: render nothing instead of a permanent "Loading video..."
    if (!videoId) return null;

    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`;
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return (
        <figure className={styles.player}>
            <div
                className={`${styles.frame} ${isLoaded ? styles.isLoaded : ""}`}
                aria-busy={!isLoaded}
            >
                {!isLoaded && (
                    <div className={styles.placeholder} aria-hidden="true">
                        <div className={styles.spinner} />
                        <span className={styles.placeholderText}>Loading video...</span>
                    </div>
                )}

                <iframe
                    className={styles.iframe}
                    src={embedUrl}
                    title={title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => setIsLoaded(true)}
                />
            </div>

            <figcaption className={styles.caption}>
                <a
                    className={styles.externalLink}
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Watch on YouTube
                </a>
            </figcaption>
        </figure>
    );
}

export default YoutubePlayerComponent;
