# Sueca da Memória

Jogo da memória temático de baralho Sueca, desenvolvido como case técnico em Vue 3. O jogador informa o nome, encontra os 10 pares de cartas com o menor número de tentativas possível e compete pelo ranking local.

**Link de acesso:** [sueca-da-memoria.vercel.app](https://sueca-da-memoria.vercel.app)

---

## Sumário

- [Como acessar](#como-acessar)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Scripts disponíveis](#scripts-disponíveis)
- [Como jogar](#como-jogar)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura do projeto](#arquitetura-do-projeto)
- [Rotas](#rotas)
- [Persistência de dados](#persistência-de-dados)
- [Deploy](#deploy)
- [Estrutura de pastas](#estrutura-de-pastas)

---

## Como acessar

| Ambiente | URL                                                                        |
| -------- | -------------------------------------------------------------------------- |
| Produção | [https://sueca-da-memoria.vercel.app](https://sueca-da-memoria.vercel.app) |
| Local    | [http://localhost:5173](http://localhost:5173) (após `npm run dev`)        |

---

## Pré-requisitos

- **Node.js** `^20.19.0` ou `>=22.12.0` (conforme `package.json`)
- **npm** (ou compatível: pnpm, yarn)

---

## Instalação e execução

```bash
# 1. Clone o repositório
git clone https://github.com/Digoassun/jogo_da_memoria.git
cd jogo_da_memoria

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Build de produção

```bash
npm run build
npm run preview   # preview local do build
```

---

## Scripts disponíveis

| Comando              | Descrição                                  |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Servidor de desenvolvimento com hot-reload |
| `npm run build`      | Type-check + build otimizado para produção |
| `npm run preview`    | Preview do build de produção               |
| `npm run type-check` | Verificação de tipos com `vue-tsc`         |
| `npm run lint`       | ESLint + Oxlint                            |
| `npm run format`     | Formata código com Prettier                |

---

## Como jogar

1. Na **Home**, digite seu nome (mínimo 2 caracteres) e clique em **Jogar**.
2. Você será redirecionado para o tabuleiro com **20 cartas** (10 pares).
3. Clique em duas cartas por vez para revelá-las
4. Encontre todos os **10 pares** para vencer.
5. Ao final, veja sua posição no ranking e volte ao início.

---

## Funcionalidades

### Home

- Formulário de nome com validação (obrigatório, mínimo 2 caracteres).
- Exibição do **Top 5** do ranking local.

### Jogo

- Tabuleiro 5×4 com cartas do baralho Sueca (2–7, Q, J, K, A).
- Contador de **tentativas** e **pares encontrados** (ex.: `3/10`).
- Feedback visual:
  - Borda vermelha em pares errados.
  - Borda verde + opacidade reduzida em pares acertados.
- Preload das imagens das cartas para evitar flick no primeiro clique.
- Guard de rota: `/game` exige nome válido; acesso direto redireciona para `/`.

### Vitória

- Modal com posição final, **Top 10** e destaque do jogador.
- Se o jogador estiver fora do Top 10, sua linha é exibida separadamente.
- Partida salva automaticamente no ranking local.

### Ranking

- Persistido em `localStorage`.
- Ordenação: menos tentativas primeiro; desempate pela data da partida.
- Todas as partidas concluídas são registradas.

### Outros

- Página **404** para rotas inexistentes.
- Layout responsivo (mobile e desktop).
- Acessibilidade básica: `aria-label`, `role="dialog"`, foco visível nos botões.

---

## Tecnologias

| Tecnologia                                    | Uso                                                    |
| --------------------------------------------- | ------------------------------------------------------ |
| [Vue 3](https://vuejs.org/)                   | Framework reativo (Composition API + `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática                                       |
| [Vite 8](https://vite.dev/)                   | Build tool e dev server                                |
| [Vue Router 5](https://router.vuejs.org/)     | Roteamento SPA + guards                                |
| [Pinia](https://pinia.vuejs.org/)             | Gerenciamento de estado                                |
| [Tailwind CSS 4](https://tailwindcss.com/)    | Estilização utilitária                                 |

---

## Arquitetura do projeto

O projeto segue uma separação clara de responsabilidades:

```
Pages → Composables → Stores / Repositories
              ↓
         Components (apresentação)
```

| Camada                        | Responsabilidade                                                    |
| ----------------------------- | ------------------------------------------------------------------- |
| **Pages**                     | Montagem da tela (`Home`, `Game`, `NotFound`)                       |
| **Composables**               | Orquestração e regras de UI (`useHome`, `useGame`, `useMemoryGame`) |
| **Stores (Pinia)**            | Estado global reativo (`user`, `game`, `ranking`)                   |
| **Repositories**              | Leitura/escrita no `localStorage`                                   |
| **Components**                | UI pura, sem lógica de negócio                                      |
| **Types / Utils / Constants** | Tipos, validações e configurações compartilhadas                    |

### Composables principais

- **`useMemoryGame`** — lógica do tabuleiro: embaralhamento, virar cartas, match/mismatch, vitória.
- **`useGame`** — integra jogo + stores + preload + modal de vitória.
- **`useHome`** — formulário de nome, ranking Top 5 e navegação.

---

## Rotas

| Rota    | Página   | Observação                         |
| ------- | -------- | ---------------------------------- |
| `/`     | Home     | Entrada do jogo                    |
| `/game` | Game     | Protegida — requer nome do jogador |
| `/*`    | NotFound | Qualquer rota inválida             |

---

## Persistência de dados

Dados salvos no `localStorage` do navegador:

| Chave                 | Conteúdo                                       |
| --------------------- | ---------------------------------------------- |
| `memory-game:user`    | Nome do jogador da sessão                      |
| `memory-game:ranking` | Histórico de partidas (nome, tentativas, data) |

> O ranking é **local por navegador/dispositivo**. Não há backend.

---

## Deploy

Hospedado na **Vercel** com rewrite SPA configurado em `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Isso garante que rotas como `/game` funcionem ao acessar a URL diretamente em produção.

---

## Estrutura de pastas

```
src/
├── components/
│   ├── game/          # Tabuleiro, cartas, header, modal de vitória
│   ├── home/          # Formulário de nome
│   ├── ranking/       # Lista e item do ranking
│   └── ui/            # Botão, input reutilizáveis
├── composables/       # useHome, useGame, useMemoryGame
├── constants/         # Assets das cartas, chaves de storage
├── data/              # Definição das cartas do baralho
├── page/              # Home, Game, NotFound
├── repositories/      # Acesso ao localStorage
├── router/            # Rotas e guards
├── stores/            # Pinia stores
├── styles/            # CSS global + Tailwind
├── types/             # Tipos TypeScript
└── utils/             # Validações, preload de imagens

public/
├── cards/             # Imagens das cartas (WebP)
├── logo.png
└── fav.png
```

---

## Licença

Projeto desenvolvido como case técnico. Consulte o repositório para informações de licenciamento.
