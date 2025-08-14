import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SecureU</Text>
      <Text style={styles.subtitle}>Your Society Security App</Text>

      {/* Go to Signup */}
      <Link href="/signup" style={styles.button}>
        <Text style={styles.buttonText}>Go to Signup</Text>
      </Link>

      {/* Go to Login */}
      <Link href="/login" style={[styles.button, { marginTop: 15, backgroundColor: '#34C759' }]}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
