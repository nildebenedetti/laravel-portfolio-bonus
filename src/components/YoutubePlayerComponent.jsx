function YoutubePlayerComponent( {videoID}) {
    const videoId = videoID;

    if (!videoID) {
    return <div className="custom-videoplayer mb-4">Loading video...</div>;
    }

    return (
        
        <div className="custom-videoplayer w-100 vh-75 mb-4">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video YouTube"
                style={{ width: "100%", height:"100%" }}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}
export default YoutubePlayerComponent;