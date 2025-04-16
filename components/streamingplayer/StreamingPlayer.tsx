interface StreamingPlayerProps {
  videoUrl: string;
}

const StreamingPlayer = ({ videoUrl }: StreamingPlayerProps) => {
  return (
    <div className="relative w-full max-w-3xl">
      <video controls autoPlay className="w-full h-auto rounded-lg">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default StreamingPlayer;
