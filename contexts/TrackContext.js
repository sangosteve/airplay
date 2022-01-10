import React, {createContext, useState} from 'react';
export const TrackContext = createContext();

export const TrackContextProvider = props => {
  const [currentTrackId, setCurrentTrackId] = useState(null);

  return (
    <TrackContext.Provider value={[currentTrackId, setCurrentTrackId]}>
      {props.children}
    </TrackContext.Provider>
  );
};
