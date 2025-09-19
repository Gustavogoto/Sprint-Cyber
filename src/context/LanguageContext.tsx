import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextProps {
  idioma: Language;
  setIdioma: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [idioma, setIdiomaState] = useState<Language>('pt');

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('idioma');
      if (stored) setIdiomaState(stored as Language);
    })();
  }, []);

  const setIdioma = async (lang: Language) => {
    await AsyncStorage.setItem('idioma', lang);
    setIdiomaState(lang);
  };

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage deve ser usado dentro de LanguageProvider');
  return context;
};
