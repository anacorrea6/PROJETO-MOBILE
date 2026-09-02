import { StyleSheet } from 'react-native';
import TelaInicialCompras from './src/screens/telaInicialScreen';

export default function App() {
  return (
    < TelaInicialCompras/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
