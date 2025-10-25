import { Link } from 'expo-router';
import { Platform, Text, View } from 'react-native';

// Import platform-based styles
const styles = Platform.OS === 'web'
  ? require('../StylingSheets/styles.web').default
  : require('../StylingSheets/styles.mobile').default;

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
