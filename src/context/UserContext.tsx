import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Usuario = {
  nome: string;
  email: string;
  senha: string;
  nascimento: string;
  idioma: string;
};

type UserContextType = {
  usuario: Usuario | null;
  setUsuario: (user: Usuario | null) => void;
  cadastrar: (user: Usuario) => Promise<boolean>;
  logar: (email: string, senha: string) => Promise<boolean>;
  sair: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const json = await AsyncStorage.getItem('user');
      if (json) {
        setUsuario(JSON.parse(json));
      }
    };
    carregarUsuario();
  }, []);

  const cadastrar = async (novoUsuario: Usuario): Promise<boolean> => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logar = async (email: string, senha: string): Promise<boolean> => {
    try {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        const user: Usuario = JSON.parse(stored);
        if (user.email === email && user.senha === senha) {
          setUsuario(user);
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  };

  const sair = () => {
    setUsuario(null);
    AsyncStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, cadastrar, logar, sair }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro do UserProvider');
  return context;
};
