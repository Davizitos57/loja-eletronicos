import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // FUNÇÃO PARA ATUALIZAR OS DADOS DO USUÁRIO NO ESTADO GLOBAL
    const refreshUsuario = async () => {
        if (!usuario?.id) return;
        try {
            const response = await api.get(`/usuarios/${usuario.id}`);
            const userData = response.data;
            const userWithRole = {
                ...userData,
                role: userData.tipoUsuario === 'ADMIN' ? 'admin' : 'user'
            };
            setUsuario(userWithRole);
            localStorage.setItem('usuario', JSON.stringify(userWithRole));
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário no contexto:', error);
            // Em caso de erro (ex: token expirado), faz logout
            logout();
        }
    };
    
    const atualizarUsuario = async (dadosAtualizados) => {
        if (!usuario) return { success: false, error: 'Usuário não logado' };
        try {
            await api.put(`/usuarios/${usuario.id}`, dadosAtualizados);
            await refreshUsuario(); // Usa a nova função para pegar os dados atualizados
            return { success: true };
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return { success: false, error: 'Falha ao atualizar dados' };
        }
    };

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
            return { success: true, user: userWithRole };
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, error: error.response?.data?.message || 'Credenciais inválidas' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
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

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
                loading,
                isLoggedIn: !!usuario,
                isAdmin: () => usuario?.role === 'admin',
                atualizarUsuario,
                refreshUsuario // EXPORTA A NOVA FUNÇÃO
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