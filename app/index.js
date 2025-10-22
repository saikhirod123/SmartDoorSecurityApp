import { Link } from 'expo-router';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

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
      <Link href="/login" style={[styles.button, styles.loginButton]}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: height * 0.08,
    paddingHorizontal: width * 0.06,
  },
  title: {
    fontSize: width > 400 ? 32 : 24,
    fontWeight: 'bold',
    marginBottom: height * 0.015,
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width > 350 ? 18 : 14,
    color: '#666',
    marginBottom: height * 0.04,
    textAlign: 'center',
    maxWidth: '90%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: height * 0.022,
    paddingHorizontal: width * 0.18,
    borderRadius: 8,
    alignItems: 'center',
    width: width > 500 ? 340 : '90%',
    maxWidth: 400,
    minWidth: 220
  },
  loginButton: {
    marginTop: height * 0.025,
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: width > 380 ? 20 : 16,
    fontWeight: 'bold',
    letterSpacing: Platform.OS === 'web' ? 1.5 : 0.5,
    textAlign: 'center'
  }
});
