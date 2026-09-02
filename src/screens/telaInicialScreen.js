import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Formulario from '../components/CadastrosProduto';
import ItemCompra from '../components/itemCompra';
import ResumoTotais from '../components/ResumoTotais';
import { carregarItensStorage, salvarItensStorage } from '../services/storage';


export default function TelaCarrinho() {

  const [itens, setItens] = useState([])
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')

  // Carregar os dados ao abrir o app
  useEffect(() => {
    async function carregarDados() {
      const itensSalvos = await carregarItensStorage()
      setItens(itensSalvos)
    }
    carregarDados()
  }, [])


  // Salvar no AsyncStorage sempre que a lista mudar
  const atualizarPersistir = (novalista) => {
    setItens(novalista)
    salvarItensStorage(novalista)
  }

  const adicionarProduto = () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "Insira o nome do produto")
    } 

    const valorTexto = String(valor || '0').replace(',', '.')
    const valorNumerico = parseFloat(valorTexto)

    const novoItem = {
      id: Date.now().toString(),
      nome: nome.trim(),
      valor: valorNumerico,
      concluido: false,
      imagem: 'https://via.placeholder.com/80'
    }

    const novaLista = [ ...itens, novoItem ]

    // Atualiza estado e limpas campos
    setItens(novaLista)
    salvarItensStorage(novaLista)
    setNome('')
    setValor('')
  }

  const alternarStatus = (id) => {
    const listaAtualizada = itens.map((item) =>
      item.id === id ? { ...item, concluido: !item.concluido } : item)
    atualizarPersistir(listaAtualizada)
  }

  const excluirItem = (id) => {
    const listaAtualizada = itens.filter((item) => item.id !== id)
    atualizarPersistir(listaAtualizada)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.titulo}>Meu Carrinho de Compras</Text>
              <Text style={styles.subtitulo}>Organize sua lista de cuidados ♡</Text>
            </View>
            <Formulario
              nome={nome}
              setNome={setNome}
              valor={valor}
              setValor={setValor}
              Adicionar={adicionarProduto}
            />
            <ResumoTotais itens={itens} />
          </>
        }
        renderItem={({ item }) => (
          <ItemCompra
            item={item}
            aoAlternarStatus={alternarStatus}
            aoExcluir={excluirItem}
          />
        )}
      />
      <View style={styles.rodape}>
        <Text style={styles.textoRodape}>💡 Dica: marque como pago quando finalizar a compra do item! ♡</Text>
      </View>
    </SafeAreaView>
  )


}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingHorizontal: 16 },
  header: { alignItems: 'center', marginVertical: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50' },
  subtitulo: { fontSize: 13, color: '#7f8c8d', marginTop: 4 },
  rodape: { padding: 10, alignItems: 'center', backgroundColor: '#f0eefd' },
  textoRodape: { fontSize: 11, color: '#5e42c1', fontWeight: '500' }
});