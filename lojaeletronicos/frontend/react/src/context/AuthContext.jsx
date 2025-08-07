import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simular login (substituir pela API real)
    const login = async (email, senha) => {
        try {
            // Chamada da API para verificar se é um administrador
            // const response = await api.post('/auth/login', { email, senha });
            
            // Mock para testar modalidade admin
            const mockUser = {
                id: 1,
                nome: 'Admin User',
                email: email,
                role: email === 'admin@tecnofacil.com' ? 'admin' : 'user', // Mock validation
                avatar: null
            };
            
            setUsuario(mockUser);
            localStorage.setItem('usuario', JSON.stringify(mockUser));
            return { success: true, user: mockUser };
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, error: 'Credenciais inválidas' };
        }
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
    };

    const isAdmin = () => {
        return usuario?.role === 'admin';
    };

    // Verificar se há usuário logado no localStorage
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

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
                isAdmin,
                loading,
                isLoggedIn: !!usuario
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