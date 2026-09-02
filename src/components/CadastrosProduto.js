import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function Formulario({ nome, setNome, valor, setValor, Adicionar }) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nome do produto (ex: Hidratante Facial)"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor R$ (ex: 29,90)"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.botaoAdicionar} onPress={Adicionar}>
        <Text style={styles.textoBotaoAdicionar}>+ ADICIONAR À LISTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16, 
    elevation: 2 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#E5E5EA', 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 10, 
    fontSize: 14,
    backgroundColor: '#FAFAFA'
  },
  botaoAdicionar: { 
    backgroundColor: '#5E42C1', 
    padding: 14, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  textoBotaoAdicionar: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
});