import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Aqui você implementaria a chamada real para sua API
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'teste@email.com' && password === '123456') {
        const userData = {
          id: 1,
          name: 'Usuário Teste',
          email: email,
          avatar: 'https://i.pravatar.cc/150?img=3'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
        return { success: true };
      } else {
        return { success: false, error: 'Credenciais inválidas' };
      }
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você implementaria a validação e criação real do usuário
      setUser({
        id: Date.now(),
        ...userData,
        avatar: 'https://i.pravatar.cc/150?img=3'
      });
      navigate('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao registrar usuário' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 