// Entra dados do nome, valores e botoes
import React from 'react';
import { StyleSheet,
     View, 
     TextInput, 
     TouchableOpacity, 
     Text } from 'react-native';

export default function Formulario({ nome, 
    setNome, 
    valor, 
    setValor, 
    Adicionar 
}) {

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nome do produto (ex: Mascara Facial efeito glow)"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor em R$ (ex: 27,90)"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.botaoAdicionar} onPress={Adicionar}>
        <Text style={styles.textoBotaoAdicionar}>Cadastrar Item</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  form: { backgroundColor: '#FFF', padding: 16, borderRadius: 10, marginBottom: 16, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#E5E5EA', borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 16 },
  botaoAdicionar: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  textoBotaoAdicionar: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});