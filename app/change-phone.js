import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { app } from '../firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);
const BG_COLOR = '#F7F8FB';

export default function ChangePhoneNumber() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (text) => {
    setError('');
    if (!/^\d{10}$/.test(text)) {
      setError('Enter a valid 10-digit phone number');
    }
    setPhone(text);
  };

  const handleUpdatePhone = async () => {
    if (error || phone.length !== 10) {
      Alert.alert('Invalid Input', 'Please enter a valid 10-digit phone number.');
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { mobile: phone });

      // Update AsyncStorage
      const storedUser = await AsyncStorage.getItem('userDetails');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.mobile = phone;
        await AsyncStorage.setItem('userDetails', JSON.stringify(userData));
      }
      Alert.alert('Success', 'Phone number updated successfully.');
      router.back();
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Change Phone Number</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={24} color="#555" style={styles.icon} />
            <TextInput
              value={phone}
              onChangeText={validatePhone}
              placeholder="10-digit phone number"
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.input}
            />
          </View>
          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleUpdatePhone}>
            <Text style={styles.buttonText}>Update Phone Number</Text>
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
  inputWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  errorText: {
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
