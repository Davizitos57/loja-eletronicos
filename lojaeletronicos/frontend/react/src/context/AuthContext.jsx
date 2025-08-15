import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const login = async (email, senha) => {
        setLoading(true);
        try {
            const response = await api.post('/usuarios/login', { email, senha });
            const userData = response.data;

            const userWithRole = {
                ...userData,
                role: userData.tipoUsuario === 'ADMIN' ? 'admin' : 'user'
            };

            setUsuario(userWithRole);
            localStorage.setItem('usuario', JSON.stringify(userWithRole));
            setLoading(false);
            return { success: true, user: userWithRole };
        } catch (error) {
            console.error('Erro no login:', error);
            setLoading(false);
            return { success: false, error: error.response?.data?.message || 'Credenciais inválidas' };
        }
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
    };

    const isAdmin = () => {
        return usuario?.role === 'admin';
    };

    const isLoggedIn = () => {
        return !!usuario;
    };

     useEffect(() => {
        const savedUser = localStorage.getItem('usuario');
        if (savedUser) {
            try {
                setUsuario(JSON.parse(savedUser));
            } catch (error) {
                console.error('Erro ao recuperar usuário:', error);
                localStorage.removeItem('usuario');
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!usuario && !loading) {
            const mockAdminUser = {
                id: 1,
                nome: 'Admin Teste',
                email: 'admin@tecnofacil.com',
                role: 'admin',
                avatar: null
            };
            setUsuario(mockAdminUser);
        }
    }, [usuario, loading]);

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
                isAdmin,
                isLoggedIn,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
}