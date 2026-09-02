import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function ControleComprasScreen() {
  const [itens, setItens] = useState([
    { id: "1", nome: "Batom", valor: 29.90, concluido: false },
    { id: "2", nome: "Desodorante", valor: 19.90, concluido: true},
  ]);
  const [nome, setNome] = useState(''); //campo de nome do produto
  const [valor, setValor] = useState(''); // ele guarda o valor do numero digitado no campo valor

  const [data, setData] = useState({ x: 0, y: 0, z: 0});
  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState(null);
  const subscriptionRef = useRef(null);

 useEffect(() => { 
    if (carregando) return;

    AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens)).catch(
    (erro) => {
      console.error("Erro ao salvar itens no storage:", erro);
    },
  );
}, [itens, carregando]);

 // o function start  ele liga o sensor, ou seja ele ve os movimentos do celular 
function start() {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS); // accelerometer ele Diz ao celular de quanto em quanto tempo ele deve ler o sensor.
    subscriptionRef.current = Accelerometer.addListener((measurement) => {
      setData(measurement);
    });
    setActive(true);
  }

  function stop() {// esse stop ele desliga o sensor 
    subscriptionRef.current?.remove();
    subscriptionRef.current = null; // ele limpa a memoria 
    setActive(false); // ele avisa o aplicativo quando o sensor esta ligado 
  }

  function triggerAgitarLimpar() {
    stop();
    Alert.alert(
      "Agitar Detectado! 🛒",
      "Deseja limpar todos os itens concluídos do carrinho?",
      [
        { text: "Cancelar", onPress: () => start(), style: "cancel" },
        { 
          text: "Limpar", 
          onPress: () => {
            setItens(listaAtual => listaAtual.filter(item => !item.concluido));
            start();
          } 
        }
      ]
    );
  }


}

function adicionarProduto() {
  const nomeLimpo = nome.trim();
  const valorLimpo = parseFloat(valor.replace(",",".")) || 0;

if (nomeLimpo.length === 0) { // O nome é obrigatorio
      Alert.alert("Erro", "O nome do produto é obrigatório!");
      return;
    }
    const novoItem = { //criando uma estrtura do item
      id: Date.now().toString(), 
      nome: nomeLimpo,
      valor: valorLimpo,
      concluido: false
    };
    //lista ataulizada
    setItens((listaAnterior) => [...listaAnterior, novoItem]);

    setNome('');
    setValor('');
  }
  function alternarStatusItem(id) { // lista atualizar os estato
    setItens((listaAnterior) =>
      listaAnterior.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  function excluirItem(id) {
    setItens((listaAnterior) => listaAnterior.filter((item) => item.id !== id));
  }

  // Calcular o valor total geral da listas
  const valorTotalCarrinho = itens.reduce((total, item) => total + item.valor, 0);



 return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Adicionar Novo Produto">
        <View style={styles.formCadastro}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Nome do produto"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Valor R$"
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarProduto}>
            <Text style={styles.botaoAdicionarTexto}>+</Text>
          </TouchableOpacity>
        </View>
      </Section>

      <Section title={`Itens Cadastrados (${itens.length})`}>
        {itens.length === 0 ? (
          <Text style={styles.listaVazia}>Nenhum item na lista.</Text>
        ) : (
          itens.map((item) => (
            <View key={item.id} style={styles.itemLinha}>
              <TouchableOpacity
                style={styles.itemTextoContainer}
                onPress={() => alternarStatusItem(item.id)}
              >
               
                <Text style={[styles.itemNome, item.concluido && styles.textoConcluido]}>
                  {item.nome}
                </Text>
                <Text style={styles.itemValor}>
                  R$ {item.valor.toFixed(2)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => excluirItem(item.id)}>
                <Text style={styles.botaoDeletarTexto}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.totalContainer}>
          <Text style={styles.totalTexto}>Total:</Text>
          <Text style={styles.totalValor}>R$ {valorTotalCarrinho.toFixed(2)}</Text>
        </View>
      </Section>

      <Section title="Sensor: Chacoalhar para Limpar">
        <InfoRow
          label="Sensor disponível"
          value={available == null ? "Verificando..." : available ? "Sim" : "Não"}
          highlight={available}
        />
        
        <View style={{ marginTop: 10 }}>
          {active ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#db4437" }]}
              onPress={stop}
            >
              <Text style={styles.buttonText}>Desativar Detector de Movimento</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: available === false ? "#ccc" : "#f4b400" },
              ]}
              onPress={start}
              disabled={available === false}
            >
              <Text style={[styles.buttonText, { color: "#333" }]}>
                Ativar Chacoalhar para Limpar
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {active && (
          <Text style={styles.hintSensor}>
            Sensor ativo! Chacoalhe o dispositivo para limpar itens marcados.
          </Text>
        )}
      </Section>

    </ScrollView>
  );






  const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f5f5f5", flexGrow: 1 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: "bold", color: "#333", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#202124", fontWeight: "500" },
  valueGreen: { color: "#0f9d58" },
  valueRed: { color: "#db4437" },
  formCadastro: { flexDirection: "row", gap: 8, alignItems: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },
  botaoAdicionar: { backgroundColor: "#2ecc71", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  botaoAdicionarTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  listaVazia: { color: "#999", fontStyle: "italic", textAlign: "center", marginVertical: 10 },
  itemLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemTextoContainer: { flex: 1, flexDirection: "row", justifyContent: "space-between", marginRight: 15 },
  itemNome: { fontSize: 15, color: "#333" },
  itemValor: { fontSize: 15, fontWeight: "bold", color: "#2c3e50" },
  textoConcluido: { textDecorationLine: "line-through", color: "#bbb" },
  botaoDeletarTexto: { fontSize: 16 },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#eee",
  },
  totalTexto: { fontSize: 16, fontWeight: "bold", color: "#333" },
  totalValor: { fontSize: 18, fontWeight: "bold", color: "#27ae60" },
  button: { paddingVertical: 13, borderRadius: 8, alignItems: "center", marginTop: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  hintSensor: { fontSize: 12, color: "#27ae60", textAlign: "center", marginTop: 8, fontWeight: "500" },
});