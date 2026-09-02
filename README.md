 🛒 Carrinho de Compras - App Mobile

Aplicativo mobile desenvolvido em React Native com Expo para gerenciamento de listas de compras. O projeto possui arquitetura modular baseada em componentes e suporte a armazenamento local assíncrono.

 🚀 Funcionalidades

- **Adicionar Produtos:** Cadastro de novos itens informando nome e valor monetário.
- **Listagem Eficiente:** Exibição dinâmica dos itens salvos utilizando o componente `FlatList`.
- **Cálculo de Totais:** Exibição automatizada do resumo de quantidade e valor total acumulado.
- **Persistência Local:** Salvamento e recuperação automática da lista de compras através do `@react-native-async-storage/async-storage`.

🛠️ Tecnologias Utilizadas

- **React Native** (Framework base)
- **Expo** (Toolchain de desenvolvimento)
- **AsyncStorage** (Banco de dados de chave-valor local)
- **JavaScript / JSX** (Linguagem)

 📂 Estrutura de Arquivos

```text
carrinho-compra/
├── src/
│   ├── components/
│   │   ├── CadastrosProduto.js  # Formulário de entrada de dados
│   │   ├── itemCompra.js        # Exibição individual e controle do item
│   │   └── ResumoTotais.js      # Painel do cálculo totalizador
│   ├── screens/
│   │   └── telaInicialScreen.js # Tela principal e controle de estados
│   └── services/
│       └── storage.js           # Leitura e gravação no AsyncStorage
├── App.js                       # Ponto de entrada do aplicativo
└── package.jsons



🔧 Como Executar o Projeto
Pré-requisitos: Node.js instalado e o aplicativo Expo Go (caso deseje rodar no dispositivo físico) ou um emulador Android/iOS configurado.

👩‍💻Autores e responsáveis:
- Ana Júlia Corrêa Ferraz
- Ana Júlia Ribeiro Ferreira