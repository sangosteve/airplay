import React, {createContext, useState} from 'react';
export const PlayingContext = createContext();

export const PlayingContextProvider = props => {
  const [playing, setPlaying] = useState(false);

  return (
    <PlayingContext.Provider value={[playing, setPlaying]}>
      {props.children}
    </PlayingContext.Provider>
  );
};
