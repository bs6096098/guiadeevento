import { useState, useEffect } from 'react';

export function useColorMode() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('color_mode');
    return savedMode || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('color_mode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return { mode, toggleColorMode };
} 