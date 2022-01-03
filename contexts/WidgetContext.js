import React, {createContext, useState} from 'react';
export const WidgetContext = createContext();

export const WidgetContextProvider = props => {
  const [showWidget, setShowWidget] = useState(true);

  return (
    <WidgetContext.Provider value={[showWidget, setShowWidget]}>
      {props.children}
    </WidgetContext.Provider>
  );
};
