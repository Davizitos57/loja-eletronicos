import { useState } from 'react';

export function useNavegacao(categorias) {
    const [scrollPositions, setScrollPositions] = useState({});

    const navegarHorizontal = (categoriaId, direcao) => {
        const categoria = categorias.find(cat => cat.id === categoriaId);
        if (!categoria) return;

        const cardWidth = 280; // 260 + gap
        const currentScroll = scrollPositions[categoriaId] || 0;
        const containerWidth = window.innerWidth - 100;
        const maxScroll = Math.max(0, (categoria.produtos.length * cardWidth) - containerWidth);
        
        let newScroll;
        if (direcao === 'left') {
            newScroll = Math.max(0, currentScroll - cardWidth * 2);
        } else {
            newScroll = Math.min(maxScroll, currentScroll + cardWidth * 2);
        }
        
        setScrollPositions(prev => ({
            ...prev,
            [categoriaId]: newScroll
        }));
    };

    const podeNavegar = (categoriaId, direcao) => {
        const categoria = categorias.find(cat => cat.id === categoriaId);
        if (!categoria) return false;

        const cardWidth = 280;
        const currentScroll = scrollPositions[categoriaId] || 0;
        const containerWidth = window.innerWidth - 100;
        const maxScroll = Math.max(0, (categoria.produtos.length * cardWidth) - containerWidth);

        if (direcao === 'left') {
            return currentScroll > 0;
        } else {
            return currentScroll < maxScroll;
        }
    };

    return {
        scrollPositions,
        navegarHorizontal,
        podeNavegar
    };
}