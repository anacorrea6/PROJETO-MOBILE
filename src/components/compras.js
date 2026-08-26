import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

export default function ItemCompra({
    item,
    aoAlternarNoCarrinho, 
    aoExcluir,
    aoEditar,
}) {
    const [editando, setEditando] = useState(false);

    const [nomeEditado, setNomeEditado] = useState(item.nome);
    const [qtdEditada, setqtdEditada] = useState(String(item.quantidade || 1));
    const [valorEditado, setValorEditado] = useState(String(item.valor || 0));

    function confirmarEdicao() {
        const nomeLimpo = nomeEditado.trim();
        const qtd = parseInt(qtdEditada) || 1;
        const valor = parseFloat(valorEditado.replace)(",", ".") || 0;

        if (nomeLimpo.length === 0) {
            cancelarEdicao();
            return;
    }
    aoEditar(item.id, {
        nome: nomeLimpo,
        quantidade: qtd,
        valor: valor,
    });
    setEditando(false);
    }
    function cancelarEdicao() {
        setNomeEditado(item.nome);
        setQtdEditada(String(item.quantidade));
        setValorEditado(String(item.valor));
        setEditando(false);
  }

  const totalItem = (item.quantidade || 1) * (item.valor || 0);
}


  return (
    <View style={styles.item}>
      {editando ? (
        <View style={styles.containerInputs}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            value={nomeEditado}
            onChangeText={setNomeEditado}
            placeholder="Item"
            autoFocus
          />
          <TextInput
            style={[styles.input, { flex: 0.6 }]}
            value={qtdEditada}
            onChangeText={setQtdEditada}
            keyboardType="numeric"
            placeholder="Qtd"
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={valorEditado}
            onChangeText={setValorEditado}
            keyboardType="decimal-pad"
            placeholder="R$ Valor"
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.textoContainer}
          onPress={() => aoAlternarNoCarrinho(item.id)}
        >
          <View>
            <Text style={[styles.nomeItem, item.noCarrinho && styles.itemComprado]}>
              {item.nome}
            </Text>
            <Text style={styles.subtextoItem}>
              {item.quantidade}x • R$ {(item.valor || 0).toFixed(2)}
            </Text>
          </View>
          
          <Text style={[styles.valorTotalItem, item.noCarrinho && styles.itemComprado]}>
            R$ {totalItem.toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.acoesEdicao}>
        {editando ? (   // botao 
          <>
            <TouchableOpacity style={styles.botaoSalvar} onPress={confirmarEdicao}>
              <Text style={styles.textoBotao}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCancelar} onPress={cancelarEdicao}>
              <Text style={styles.textoBotao}>✕</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.botaoEditar} onPress={() => setEditando(true)}>
              <Text style={styles.textoBotao}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoExcluir} onPress={() => aoExcluir(item.id)}>
              <Text style={styles.textoBotao}>🗑️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );


const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  containerInputs: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    marginRight: 10,
  },
  input: {
    fontSize: 14,
    color: "#222",
    borderBottomWidth: 1,
    borderBottomColor: "#3498db",
    paddingVertical: 2,
  },
  textoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  nomeItem: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  subtextoItem: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 2,
  },
  valorTotalItem: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  itemComprado: {
    textDecorationLine: "line-through",
    color: "#bdc3c7",
  },
  acoesEdicao: {
    flexDirection: "row",
    gap: 6,
  },
  botaoExcluir: { backgroundColor: "#e74c3c", padding: 8, borderRadius: 6 },
  botaoEditar: { backgroundColor: "#3498db", padding: 8, borderRadius: 6 },
  botaoSalvar: { backgroundColor: "#2ecc71", padding: 8, borderRadius: 6 },
  botaoCancelar: { backgroundColor: "#95a5a6", padding: 8, borderRadius: 6 },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});
