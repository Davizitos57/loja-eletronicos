export const categoriasMock = [
    {
        id: 1,
        nome: 'Smartphones e Telefonia',
        produtos: [
            { 
                id: 1, 
                nome: 'iPhone 15 Pro Max', 
                preco: 9999.99, 
                imagem: 'https://picsum.photos/600/400?random=1',
                descricao: 'O iPhone 15 Pro Max representa o ápice da tecnologia móvel da Apple. Com o revolucionário chip A17 Pro, sistema de câmeras Pro de 48MP e tela Super Retina XDR de 6.7 polegadas, oferece desempenho excepcional para profissionais e entusiastas.',
                estoque: 25,
                categoria: 'Smartphones e Telefonia',
                marca: 'Apple',
                avaliacoes: 4.9,
                especificacoes: [
                    'Chip A17 Pro com GPU de 6 núcleos',
                    'Câmera principal 48MP com zoom óptico 5x',
                    'Tela 6.7" Super Retina XDR ProMotion',
                    'Titânio aeroespacial',
                    '5G mmWave',
                    'Face ID',
                    'Resistente à água IP68',
                    'Bateria até 29h de vídeo',
                    'USB-C com Thunderbolt 3'
                ]
            },
            { 
                id: 2, 
                nome: 'Samsung Galaxy S24 Ultra', 
                preco: 7999.99, 
                imagem: 'https://picsum.photos/600/400?random=2',
                descricao: 'O Galaxy S24 Ultra eleva a produtividade móvel com sua S Pen integrada, câmera de 200MP com IA avançada e tela Dynamic AMOLED 2X de 6.8 polegadas. Perfeito para criação de conteúdo e multitarefas.',
                estoque: 18,
                categoria: 'Smartphones e Telefonia',
                marca: 'Samsung',
                avaliacoes: 4.8,
                especificacoes: [
                    'Snapdragon 8 Gen 3 for Galaxy',
                    'Câmera principal 200MP com zoom 100x',
                    'S Pen integrada com latência ultra-baixa',
                    'Tela 6.8" Dynamic AMOLED 2X QHD+',
                    '12GB RAM LPDDR5X',
                    'Galaxy AI integrada',
                    'Bateria 5000mAh com carregamento 45W',
                    'Resistente à água IP68'
                ]
            },
            { 
                id: 3, 
                nome: 'Xiaomi Redmi Note 13', 
                preco: 1299.99, 
                imagem: 'https://picsum.photos/600/400?random=3',
                descricao: 'O Redmi Note 13 oferece excelente custo-benefício com desempenho sólido para o dia a dia. Câmera de 108MP, tela AMOLED de 120Hz e bateria de longa duração.',
                estoque: 45,
                categoria: 'Smartphones e Telefonia',
                marca: 'Xiaomi',
                avaliacoes: 4.4,
                especificacoes: [
                    'MediaTek Dimensity 6080',
                    'Câmera principal 108MP',
                    'Tela 6.67" AMOLED FHD+ 120Hz',
                    '8GB RAM + 256GB armazenamento',
                    'Bateria 5000mAh com carregamento 33W',
                    'MIUI 14 baseado em Android 13',
                    'Leitor de impressão digital na tela'
                ]
            },
            { 
                id: 4, 
                nome: 'Google Pixel 8 Pro', 
                preco: 6499.99, 
                imagem: 'https://picsum.photos/600/400?random=4',
                descricao: 'O Pixel 8 Pro combina a melhor experiência Android pura com recursos avançados de IA. Câmeras computacionais excepcionais e atualizações garantidas por 7 anos.',
                estoque: 12,
                categoria: 'Smartphones e Telefonia',
                marca: 'Google',
                avaliacoes: 4.7,
                especificacoes: [
                    'Google Tensor G3',
                    'Sistema de câmeras Pro com IA',
                    'Tela 6.7" LTPO OLED 120Hz',
                    'Magic Eraser e Photo Unblur',
                    'Android 14 com 7 anos de atualizações',
                    'Carregamento sem fio 30W',
                    'Titan M security chip'
                ]
            },
            { 
                id: 5, 
                nome: 'OnePlus 12', 
                preco: 4999.99, 
                imagem: 'https://picsum.photos/600/400?random=5',
                descricao: 'O OnePlus 12 mantém a tradição de "flagship killer" com desempenho extremo, carregamento ultrarrápido e design premium a um preço competitivo.',
                estoque: 8,
                categoria: 'Smartphones e Telefonia',
                marca: 'OnePlus',
                avaliacoes: 4.6,
                especificacoes: [
                    'Snapdragon 8 Gen 3',
                    'Carregamento SuperVOOC 100W',
                    'Tela ProXDR 120Hz com Dolby Vision',
                    'Câmeras Hasselblad',
                    'OxygenOS 14',
                    'Sistema de refrigeração avançado',
                    'Alto-falantes stereo Dolby Atmos'
                ]
            },
            { 
                id: 6, 
                nome: 'Motorola Edge 40', 
                preco: 2799.99, 
                imagem: 'https://picsum.photos/600/400?random=6',
                descricao: 'O Edge 40 oferece design elegante e recursos premium com foco na experiência de câmera e conectividade 5G avançada.',
                estoque: 22,
                categoria: 'Smartphones e Telefonia',
                marca: 'Motorola',
                avaliacoes: 4.3,
                especificacoes: [
                    'MediaTek Dimensity 8020',
                    'Câmera principal 50MP OIS',
                    'Tela 6.55" pOLED 144Hz',
                    'Carregamento TurboPower 68W',
                    'Android 13 quase puro',
                    'Design à prova d\'água IP68',
                    'Moto Actions e Moto Display'
                ]
            }
        ]
    },
    {
        id: 2,
        nome: 'Notebooks e Computadores',
        produtos: [
            { 
                id: 7, 
                nome: 'MacBook Pro M3', 
                preco: 15999.99, 
                imagem: 'https://picsum.photos/600/400?random=7',
                descricao: 'O MacBook Pro com chip M3 redefine a computação profissional. Performance excepcional para desenvolvimento, edição de vídeo e tarefas criativas mais exigentes.',
                estoque: 15,
                categoria: 'Notebooks e Computadores',
                marca: 'Apple',
                avaliacoes: 4.9,
                especificacoes: [
                    'Chip Apple M3 Pro de 12 núcleos',
                    '18GB RAM unificada',
                    '1TB SSD ultrarrápido',
                    'Tela 14.2" Liquid Retina XDR',
                    'Até 22h de bateria',
                    '3x Thunderbolt 4, HDMI, SD card',
                    'Magic Keyboard com Touch ID',
                    'Câmera FaceTime HD 1080p'
                ]
            },
            { 
                id: 8, 
                nome: 'Dell XPS 13', 
                preco: 8999.99, 
                imagem: 'https://picsum.photos/600/400?random=8',
                descricao: 'Ultrabook premium com design InfinityEdge, ideal para profissionais que valorizam portabilidade sem abrir mão da performance.',
                estoque: 28,
                categoria: 'Notebooks e Computadores',
                marca: 'Dell',
                avaliacoes: 4.6,
                especificacoes: [
                    'Intel Core i7-1360P de 13ª geração',
                    '16GB LPDDR5 RAM',
                    '512GB NVMe SSD',
                    'Tela 13.4" FHD+ InfinityEdge',
                    'Até 14h de bateria',
                    '2x USB-C Thunderbolt 4',
                    'Teclado retroiluminado',
                    'Windows 11 Pro'
                ]
            },
            { 
                id: 9, 
                nome: 'Lenovo ThinkPad X1', 
                preco: 12999.99, 
                imagem: 'https://picsum.photos/600/400?random=9',
                descricao: 'O ThinkPad X1 Carbon oferece a confiabilidade empresarial lendária da Lenovo com design ultrafino e recursos de segurança avançados.',
                estoque: 10,
                categoria: 'Notebooks e Computadores',
                marca: 'Lenovo',
                avaliacoes: 4.7,
                especificacoes: [
                    'Intel Core i7 vPro de 13ª geração',
                    '32GB LPDDR5 RAM',
                    '1TB PCIe Gen4 SSD',
                    'Tela 14" 2.8K OLED touch',
                    'Certificação militar MIL-STD-810H',
                    'Chip de segurança TPM 2.0',
                    'Teclado TrackPoint icônico',
                    'Webcam IR com Windows Hello'
                ]
            },
            { 
                id: 10, 
                nome: 'ASUS ROG Strix', 
                preco: 7499.99, 
                imagem: 'https://picsum.photos/600/400?random=10',
                descricao: 'Gaming laptop com performance extrema para jogos AAA e streaming. Design agressivo com iluminação RGB e refrigeração avançada.',
                estoque: 6,
                categoria: 'Notebooks e Computadores',
                marca: 'ASUS',
                avaliacoes: 4.5,
                especificacoes: [
                    'AMD Ryzen 9 7940HX',
                    '32GB DDR5 RAM',
                    'NVIDIA RTX 4070 8GB',
                    'Tela 15.6" QHD 240Hz',
                    'SSD 1TB NVMe Gen4',
                    'Teclado mecânico RGB per-key',
                    'Sistema de refrigeração ROG',
                    'Wi-Fi 6E e Bluetooth 5.3'
                ]
            },
            { 
                id: 11, 
                nome: 'HP Pavilion', 
                preco: 3499.99, 
                imagem: 'https://picsum.photos/600/400?random=11',
                descricao: 'Notebook versátil para uso doméstico e profissional básico. Ótimo custo-benefício para estudantes e profissionais iniciantes.',
                estoque: 35,
                categoria: 'Notebooks e Computadores',
                marca: 'HP',
                avaliacoes: 4.2,
                especificacoes: [
                    'Intel Core i5-1335U',
                    '8GB DDR4 RAM (expansível)',
                    '256GB SSD + 1TB HDD',
                    'Tela 15.6" FHD IPS',
                    'Intel Iris Xe Graphics',
                    'Bateria até 8h',
                    'Áudio Bang & Olufsen',
                    'Windows 11 Home'
                ]
            },
            { 
                id: 12, 
                nome: 'Acer Nitro 5', 
                preco: 4299.99, 
                imagem: 'https://picsum.photos/600/400?random=12',
                descricao: 'Gaming laptop de entrada com ótimo custo-benefício. Ideal para jogos 1080p e tarefas que exigem placa de vídeo dedicada.',
                estoque: 18,
                categoria: 'Notebooks e Computadores',
                marca: 'Acer',
                avaliacoes: 4.3,
                especificacoes: [
                    'AMD Ryzen 5 7535HS',
                    '16GB DDR5 RAM',
                    'NVIDIA RTX 4050 6GB',
                    'Tela 15.6" FHD 144Hz',
                    '512GB NVMe SSD',
                    'Teclado retroiluminado vermelho',
                    'NitroSense cooling control',
                    'Wi-Fi 6 e USB-C'
                ]
            }
        ]
    },
    {
        id: 3,
        nome: 'Tablets e E-readers',
        produtos: [
            { 
                id: 13, 
                nome: 'iPad Pro 12.9"', 
                preco: 8999.99, 
                imagem: 'https://picsum.photos/600/400?random=13',
                descricao: 'O iPad Pro redefine a produtividade móvel com chip M2, tela Liquid Retina XDR e compatibilidade com Apple Pencil hover. Perfeito para criação profissional.',
                estoque: 20,
                categoria: 'Tablets e E-readers',
                marca: 'Apple',
                avaliacoes: 4.8,
                especificacoes: [
                    'Chip Apple M2 de 8 núcleos',
                    '8GB RAM unificada',
                    '256GB armazenamento',
                    'Tela 12.9" Liquid Retina XDR',
                    'Apple Pencil hover support',
                    'Face ID',
                    'USB-C Thunderbolt',
                    'Câmeras Pro com LiDAR',
                    '5G cellular (opcional)'
                ]
            },
            { 
                id: 14, 
                nome: 'Samsung Galaxy Tab S9', 
                preco: 4999.99, 
                imagem: 'https://picsum.photos/600/400?random=14',
                descricao: 'Tablet Android premium com S Pen incluída, ideal para desenho digital, anotações e produtividade avançada com DeX mode.',
                estoque: 25,
                categoria: 'Tablets e E-readers',
                marca: 'Samsung',
                avaliacoes: 4.6,
                especificacoes: [
                    'Snapdragon 8 Gen 2 for Galaxy',
                    '12GB RAM LPDDR5X',
                    'S Pen incluída com latência 2.8ms',
                    'Tela 11" Dynamic AMOLED 2X',
                    'Samsung DeX mode',
                    'Resistente à água IP68',
                    'Bateria 8400mAh',
                    '5G ready',
                    'Android 13 com One UI 5.1'
                ]
            },
            { 
                id: 15, 
                nome: 'Microsoft Surface Pro', 
                preco: 6999.99, 
                imagem: 'https://picsum.photos/600/400?random=15',
                descricao: 'O Surface Pro 9 combina a versatilidade de um tablet com o poder de um laptop. Windows 11 completo em formato ultra-portátil.',
                estoque: 15,
                categoria: 'Tablets e E-readers',
                marca: 'Microsoft',
                avaliacoes: 4.4,
                especificacoes: [
                    'Intel Core i5-1235U',
                    '8GB LPDDR5 RAM',
                    '256GB SSD removível',
                    'Tela 13" PixelSense touch',
                    'Type Cover compatível',
                    'Surface Pen support',
                    'Windows 11 Pro',
                    'Wi-Fi 6E e Bluetooth 5.1',
                    'Até 15.5h de bateria'
                ]
            },
            { 
                id: 16, 
                nome: 'Kindle Paperwhite', 
                preco: 599.99, 
                imagem: 'https://picsum.photos/600/400?random=16',
                descricao: 'E-reader premium com tela de 6.8" sem reflexos, iluminação ajustável e resistência à água. Perfeito para leitura em qualquer ambiente.',
                estoque: 50,
                categoria: 'Tablets e E-readers',
                marca: 'Amazon',
                avaliacoes: 4.7,
                especificacoes: [
                    'Tela E Ink 6.8" 300 ppi',
                    'Iluminação frontal ajustável',
                    'Resistente à água IPX8',
                    '8GB armazenamento',
                    'Bateria até 10 semanas',
                    'Wi-Fi integrado',
                    'Acesso ao Kindle Store',
                    'Modo escuro',
                    'USB-C carregamento'
                ]
            },
            { 
                id: 17, 
                nome: 'Xiaomi Pad 6', 
                preco: 1899.99, 
                imagem: 'https://picsum.photos/600/400?random=17',
                descricao: 'Tablet Android com excelente custo-benefício. Tela 2.8K de 144Hz, áudio Dolby Atmos e design premium em metal.',
                estoque: 30,
                categoria: 'Tablets e E-readers',
                marca: 'Xiaomi',
                avaliacoes: 4.3,
                especificacoes: [
                    'Snapdragon 870',
                    '8GB RAM LPDDR5',
                    'Tela 11" 2.8K 144Hz',
                    'Áudio quad-speaker Dolby Atmos',
                    'Bateria 8840mAh',
                    'Carregamento 33W',
                    'MIUI for Pad',
                    'Suporte a stylus (opcional)',
                    'Metal unibody design'
                ]
            }
        ]
    },
    {
        id: 4,
        nome: 'Áudio e Som',
        produtos: [
            { 
                id: 18, 
                nome: 'AirPods Pro 2', 
                preco: 2299.99, 
                imagem: 'https://picsum.photos/600/400?random=18',
                descricao: 'AirPods Pro de 2ª geração com chip H2, cancelamento de ruído adaptativo duas vezes melhor e áudio espacial personalizado.',
                estoque: 40,
                categoria: 'Áudio e Som',
                marca: 'Apple',
                avaliacoes: 4.8,
                especificacoes: [
                    'Chip H2 Apple',
                    'Cancelamento ativo de ruído adaptativo',
                    'Modo transparência adaptativo',
                    'Áudio espacial personalizado',
                    'Até 6h de reprodução',
                    'Estojo MagSafe com 30h total',
                    'Resistência ao suor IPX4',
                    'Controles por toque',
                    'Find My integration'
                ]
            },
            { 
                id: 19, 
                nome: 'Sony WH-1000XM5', 
                preco: 1999.99, 
                imagem: 'https://picsum.photos/600/400?random=19',
                descricao: 'Headphone over-ear com o melhor cancelamento de ruído da categoria. Design renovado, conforto excepcional e qualidade de áudio Hi-Res.',
                estoque: 22,
                categoria: 'Áudio e Som',
                marca: 'Sony',
                avaliacoes: 4.7,
                especificacoes: [
                    'Processador V1 + QN1',
                    'Cancelamento de ruído líder do mercado',
                    'Drivers 30mm de neodímio',
                    'Até 30h de bateria com ANC',
                    'Carregamento rápido 3min = 3h',
                    'Multipoint Bluetooth',
                    'Hi-Res Audio e LDAC',
                    '360 Reality Audio',
                    'Speak-to-chat automático'
                ]
            },
            { 
                id: 20, 
                nome: 'JBL Flip 6', 
                preco: 699.99, 
                imagem: 'https://picsum.photos/600/400?random=20',
                descricao: 'Caixa de som Bluetooth portátil com som potente 360°, resistência à água e poeira IP67. Ideal para aventuras e festas.',
                estoque: 45,
                categoria: 'Áudio e Som',
                marca: 'JBL',
                avaliacoes: 4.5,
                especificacoes: [
                    'Potência 30W RMS',
                    'Som 360° JBL Pro Sound',
                    'Resistência IP67',
                    'Até 12h de reprodução',
                    'Bluetooth 5.1',
                    'JBL PartyBoost',
                    'USB-C carregamento',
                    'Cores vibrantes disponíveis',
                    'Alça resistente integrada'
                ]
            },
            { 
                id: 21, 
                nome: 'Bose QuietComfort', 
                preco: 2799.99, 
                imagem: 'https://picsum.photos/600/400?random=21',
                descricao: 'Headphone premium com cancelamento de ruído ajustável, conforto legendário Bose e qualidade de áudio cristalina para viagens e trabalho.',
                estoque: 18,
                categoria: 'Áudio e Som',
                marca: 'Bose',
                avaliacoes: 4.6,
                especificacoes: [
                    'Cancelamento de ruído ajustável',
                    'Modo transparência',
                    'Até 24h de bateria',
                    'Carregamento rápido 15min = 2.5h',
                    'Bluetooth 5.1 multipoint',
                    'Bose Music app',
                    'Microfones com foco na voz',
                    'Design dobrável',
                    'Controles tácteis intuitivos'
                ]
            },
            { 
                id: 22, 
                nome: 'Marshall Acton III', 
                preco: 1599.99, 
                imagem: 'https://picsum.photos/600/400?random=22',
                descricao: 'Caixa de som com design vintage icônico e som Marshall autêntico. Bluetooth, Wi-Fi e controles analógicos para a experiência musical definitiva.',
                estoque: 12,
                categoria: 'Áudio e Som',
                marca: 'Marshall',
                avaliacoes: 4.4,
                especificacoes: [
                    'Som Marshall signature',
                    'Bluetooth 5.2 e Wi-Fi',
                    'Controles analógicos vintage',
                    'Marshall Bluetooth app',
                    'Tweeter e woofers dedicados',
                    'Equalização personalizável',
                    'Design icônico Marshall',
                    'Multi-room audio',
                    'Spotify Connect ready'
                ]
            }
        ]
    },
    {
        id: 5,
        nome: 'Games e Consoles',
        produtos: [
            { 
                id: 23, 
                nome: 'PlayStation 5', 
                preco: 4999.99, 
                imagem: 'https://picsum.photos/600/400?random=23',
                descricao: 'Console de nova geração com SSD ultrarrápido, ray tracing em tempo real e controle DualSense com feedback háptico revolucionário.',
                estoque: 8,
                categoria: 'Games e Consoles',
                marca: 'Sony',
                avaliacoes: 4.8,
                especificacoes: [
                    'CPU AMD Zen 2 8-core',
                    'GPU AMD RDNA 2 custom',
                    'SSD 825GB ultrarrápido',
                    'Ray tracing em tempo real',
                    'Suporte 4K até 120fps',
                    'Controle DualSense com haptic feedback',
                    'Áudio 3D Tempest Engine',
                    'Retrocompatibilidade PS4',
                    'PlayStation VR2 ready'
                ]
            },
            { 
                id: 24, 
                nome: 'Xbox Series X', 
                preco: 4699.99, 
                imagem: 'https://picsum.photos/600/400?random=24',
                descricao: 'O Xbox mais poderoso de todos os tempos. 4K nativo, 120fps, ray tracing e Quick Resume para alternar entre jogos instantaneamente.',
                estoque: 12,
                categoria: 'Games e Consoles',
                marca: 'Microsoft',
                avaliacoes: 4.7,
                especificacoes: [
                    'CPU AMD Zen 2 8-core 3.8GHz',
                    'GPU 12 TFLOPS RDNA 2',
                    'SSD NVMe 1TB custom',
                    '4K nativo até 120fps',
                    'Quick Resume para múltiplos jogos',
                    'Smart Delivery',
                    'Xbox Game Pass Ultimate',
                    'Retrocompatibilidade 4 gerações',
                    'Auto HDR e Spatial Audio'
                ]
            },
            { 
                id: 25, 
                nome: 'Nintendo Switch OLED', 
                preco: 2299.99, 
                imagem: 'https://picsum.photos/600/400?random=25',
                descricao: 'Console híbrido com tela OLED vibrante de 7", áudio aprimorado e base com porta LAN. Jogue em casa ou em movimento com a mesma qualidade.',
                estoque: 25,
                categoria: 'Games e Consoles',
                marca: 'Nintendo',
                avaliacoes: 4.6,
                especificacoes: [
                    'Tela OLED 7" com cores vibrantes',
                    'Armazenamento 64GB interno',
                    'Áudio aprimorado',
                    'Base com porta LAN integrada',
                    'Joy-Con com HD Rumble',
                    'Modo portátil e TV',
                    'Bateria até 9h (portátil)',
                    'Wi-Fi e Bluetooth',
                    'Compatível com jogos Switch'
                ]
            },
            { 
                id: 26, 
                nome: 'Steam Deck', 
                preco: 3299.99, 
                imagem: 'https://picsum.photos/600/400?random=26',
                descricao: 'PC portátil da Valve para jogar sua biblioteca Steam anywhere. AMD APU custom, tela 7" e SteamOS 3.0 baseado em Linux.',
                estoque: 15,
                categoria: 'Games e Consoles',
                marca: 'Valve',
                avaliacoes: 4.5,
                especificacoes: [
                    'AMD APU Zen 2 + RDNA 2',
                    'Tela 7" LCD 1280x800 60Hz',
                    '16GB LPDDR5 RAM',
                    'SSD NVMe 512GB',
                    'SteamOS 3.0 (Arch Linux)',
                    'Controles integrados precisos',
                    'Dock station compatível',
                    'Biblioteca Steam completa',
                    'Emulação e ROMs suportadas'
                ]
            }
        ]
    }
];