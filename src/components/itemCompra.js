import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ItemCompra({
  item,
  aoAlternarStatus,
  aoExcluir,

}) {

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imagem || 'https://via.placeholder.com/60' }}
        style={styles.imagem}
      />

      <View style={styles.infoContainer}>
        <Text style={[styles.nome, item.concluido && styles.nomeConcluido]}>
          {item.nome}
        </Text>
        <Text style={styles.valor}>R$ {Number(item.valor).toFixed(2)}</Text>

        <View style={[styles.badge, item.concluido ? styles.badgePago : styles.badgePendente]}>
          <Text style={[styles.badgeTexto, item.concluido ? styles.textoPago : styles.textoPendente]}>
            {item.concluido ? '✓ PAGO' : '🕒 PENDENTE'}
          </Text>
        </View>
      </View>

      <View style={styles.acoesContainer}>
        <TouchableOpacity
          style={[styles.botaoAcao, item.concluido ? styles.botaoDesfazer : styles.botaoPagar]}
          onPress={() => aoAlternarStatus(item.id)}
        >
          <Text style={[styles.textoAcao, item.concluido ? styles.textoDesfazer : styles.textoPagar]}>
            {item.concluido ? '↩ Desfazer' : '✓ Pagar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botaoAcao, styles.botaoExcluir]} onPress={() => aoExcluir(item.id)}>
          <Text style={styles.textoExcluir}>🗑 Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, alignItems: 'center' },
  imagem: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#f5f5f5' },
  infoContainer: { flex: 1, marginLeft: 12 },
  nome: { fontSize: 15, fontWeight: 'bold', color: '#2c3e50' },
  nomeConcluido: { textDecorationLine: 'line-through', color: '#bdc3c7' },
  valor: { fontSize: 14, color: '#7f8c8d', marginVertical: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, alignSelf: 'flex-start', marginTop: 4 },
  badgePago: { backgroundColor: '#e8f8f0' },
  badgePendente: { backgroundColor: '#fef5e7' },
  badgeTexto: { fontSize: 10, fontWeight: 'bold' },
  textoPago: { color: '#27ae60' },
  textoPendente: { color: '#e67e22' },
  acoesContainer: { gap: 6 },
  botaoAcao: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  botaoPagar: { borderColor: '#27ae60', backgroundColor: '#fff' },
  textoPagar: { color: '#27ae60', fontWeight: 'bold', fontSize: 12 },
  botaoDesfazer: { borderColor: '#5e42c1', backgroundColor: '#fff' },
  textoDesfazer: { color: '#5e42c1', fontWeight: 'bold', fontSize: 12 },
  botaoExcluir: { borderColor: '#e74c3c', backgroundColor: '#fff' },
  textoExcluir: { color: '#e74c3c', fontWeight: 'bold', fontSize: 12 }
});