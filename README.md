# 🛒 Carrinho de Compras - App Mobile

Aplicativo mobile desenvolvido em React Native com Expo para gerenciamento de listas de compras. O projeto possui arquitetura modular baseada em componentes e suporte a armazenamento local assíncrono.

## 🚀 Funcionalidades

- **Adicionar Produtos:** Cadastro de novos itens informando nome e valor monetário.
- **Listagem Eficiente:** Exibição dinâmica dos itens salvos utilizando o componente `FlatList`.
- **Cálculo de Totais:** Exibição automatizada do resumo de quantidade e valor total acumulado.
- **Persistência Local:** Salvamento e recuperação automática da lista de compras através do `@react-native-async-storage/async-storage`.

## 🛠️ Tecnologias Utilizadas

- **React Native** (Framework base)
- **Expo** (Toolchain de desenvolvimento)
- **AsyncStorage** (Banco de dados de chave-valor local)
- **JavaScript / JSX** (Linguagem)

## 📂 Estrutura de Arquivos

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

Clonar o repositório:

Bash
git clone [https://github.com/anacorrea6/PROJETO-MOBILE.git](https://github.com/anacorrea6/PROJETO-MOBILE.git)
Entrar na pasta da aplicação:

Bash
cd PROJETO-MOBILE/carrinho-compra
Instalar as dependências:

Bash
npm install
Iniciar o servidor de desenvolvimento:

Bash
npx expo start -c
Abrir a aplicação:

Pressione a no terminal para carregar no emulador Android.

Pressione w para visualizar via Navegador Web.

Ou escaneie o código QR Code exibido no terminal utilizando a câmera (iOS) ou a opção do app Expo Go (Android).
