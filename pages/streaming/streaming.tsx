import React from 'react';
import StreamingPlayer from '../../components/streamingplayer/StreamingPlayer'; 

const App: React.FC = () => {
  const videoUrl = 'https://example.com/video.mp4'; 

  return <StreamingPlayer videoUrl={videoUrl} />;
};

export default App;
