//---------------------------------------------
// Serviço isolado para ler(getItem) e gravar os dados(setItem)
//---------------------------------------------


import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@carrinho_de_compras'

export const salvarItensStorage = async (itens) => {
    try {
        
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itens))

    } catch (error) {
        console.error("Erro ao salvar itens:", error)
    }
}

export const carregarItensStorage = async () => {
    try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY)
        return dados ? JSON.parse(dados) : []
    } catch (error) {
        console.error("Erro ao carregar itens:", error)
    }
}