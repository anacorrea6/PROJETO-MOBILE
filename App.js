import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

import {
  buscarComprasStorage,
  salvarComprasStorage,
} from "./src/services/storage.js";

import CadastroProdutos from "./src/components/CadastrosProduto.js";
import Compras from "./src/components/Compras.js";

export default function App() {
  // Armazena a lista de compras e produtos que estão na memória
  const [listaCompras, setListaCompras] = useState([]);

  // Revisa os dados iniciais
  useEffect(() => {
    // Carrega as últimas compras salvas
    carregarDadosIniciais();
  }, []);

  // Busca os dados armazenados
  const carregarDadosIniciais = async () => {
    const dados = await buscarComprasStorage();
    setListaCompras(dados);
  };

  // Salva a lista atualizada no armazenamento
  const atualizarEGuardar = async (novaLista) => {
    setListaCompras(novaLista);
    await salvarComprasStorage(novaLista);
  };

  // Adiciona um novo produto à lista
  const adicionarProduto = (novoItem) => {
    atualizarEGuardar([...listaCompras, novoItem]);
  };

  // Modifica o status de pagamento de um produto
  const modificarStatus = (id) => {
    const atualizados = listaCompras.map((item) =>
      item.id === id
        ? { ...item, pago: !item.pago }
        : item
    );

    atualizarEGuardar(atualizados);
  };

  // Remove um item da lista
  const excluirProduto = (id) => {
    // Mantém apenas os itens que possuem ID diferente do selecionado
    const filtrados = listaCompras.filter(
      (item) => item.id !== id
    );

    atualizarEGuardar(filtrados);
  };



  return (
    // SafeAreaView garante que o aplicativo respeite as bordas do sistema
    // e a barra de status
    <SafeAreaView style={styles.container}>
      {/* Configura o estilo da barra de status nativa do celular */}
      <StatusBar barStyle="dark-content" />

      {/* Título principal do aplicativo */}
      <Text style={styles.titulo}>
        Meu Carrinho de Compras
      </Text>

      {/* Componente de entrada (Formulário) */}
      <CadastroProdutos
        onAdicionarProduto={adicionarProduto}
      />

      {/* Componente de exibição (Lista e Painel) */}
      <Compras
        lista={listaCompras}
        onAlternarStatus={modificarStatus}
        onExcluir={excluirProduto}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  // Preenche toda a tela com fundo cinza claro e espaçamento superior
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 16,
    paddingTop: 40,
  },

  // Estilo do título centralizado
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#1C1C1E",
  },
});