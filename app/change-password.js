import { useRouter } from 'expo-router';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG_COLOR = '#F7F8FB';

export default function ChangePassword() {
  const router = useRouter();
  const auth = getAuth();

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const validateAndChange = async () => {
    setError('');
    if (!currentPass || !newPass || !confirmPass) {
      setError('Please fill all fields');
      return;
    }
    if (newPass.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (newPass !== confirmPass) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error('User not authenticated');

      const credential = EmailAuthProvider.credential(user.email, currentPass);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPass);
      Alert.alert('Success', 'Password updated successfully. Please login again.');
      router.replace('/login');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Change Password</Text>

          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Current Password"
            value={currentPass}
            onChangeText={setCurrentPass}
          />

          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="New Password"
            value={newPass}
            onChangeText={setNewPass}
          />

          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Confirm New Password"
            value={confirmPass}
            onChangeText={setConfirmPass}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={validateAndChange}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG_COLOR },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#276CF0',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
