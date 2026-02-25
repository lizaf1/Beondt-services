import React, { createContext, useContext, useEffect, useState } from 'react';

interface ContentMap {
  [key: string]: string;
}

const ContentContext = createContext<ContentMap>({});

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<ContentMap>({});

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to fetch content:', err));
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
};
