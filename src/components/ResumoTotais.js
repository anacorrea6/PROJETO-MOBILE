//--------------------------------------------------------------------
// Cards informativos com os calculos de Total da lista e Total Pago
//--------------------------------------------------------------------



import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ResumoTotais({ itens }) {
    const totalLista = itens.reduce((acc, item) => acc + Number(item.valor || 0), 0)
    const totalPago = itens
        .filter((item) => item.concluido)
        .reduce((acc, item) => acc + Number(item.valor || 0), 0)

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.iconeCard}>🛒</Text>
                <View style={styles.info}>
                    <Text style={styles.tituloTotal}>TOTAL DA LISTA</Text>
                    <Text style={styles.valorTotal}>R$ {totalLista.toFixed(2)}</Text>
                    <Text style={styles.subtexto}>Valor estimado</Text>
                </View>
            </View>

            <View style={[styles.card, styles.cardBordaEsquerda]}>
                <Text style={styles.iconeCardSuccess}>✓</Text>
                <View style={styles.info}>
                    <Text style={[styles.tituloTotal, { color: '#27ae60' }]}>TOTAL PAGO</Text>
                    <Text style={styles.valorTotal}>R$ {totalPago.toFixed(2)}</Text>
                    <Text style={styles.subtexto}>Valor já pago</Text>
                </View>
            </View>
        </View>
    )
}








const styles = StyleSheet.create({
    container: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16, elevation: 1 },
    card: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
    cardBordaEsquerda: { borderLeftWidth: 1, borderLeftColor: '#f0f0f0', paddingLeft: 12 },
    iconeCard: { fontSize: 24, padding: 8, backgroundColor: '#f0eefd', borderRadius: 20 },
    iconeCardSuccess: { fontSize: 18, padding: 8, backgroundColor: '#e8f8f0', color: '#27ae60', borderRadius: 20, fontWeight: 'bold' },
    tituloTotal: { fontSize: 11, fontWeight: 'bold', color: '#5e42c1' },
    valorTotal: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginVertical: 2 },
    subtexto: { fontSize: 11, color: '#95a5a6' }
});