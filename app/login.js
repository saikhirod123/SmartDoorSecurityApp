import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../firebaseConfig';
import styles from '../StylingSheets/LoginStyles'; // use the same folder and similar style file as signup

export default function Login() {
  const [building, setBuilding] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const validateField = (field, value) => {
    let message = '';
    if (field === 'building' && !value.trim()) message = 'Building name is required';
    if (field === 'flatNumber' && !value.trim()) message = 'Flat number is required';
    if (field === 'mobile' && !/^\d{10}$/.test(value)) message = 'Enter a valid 10-digit mobile number';
    if (field === 'password' && value.length < 6) message = 'Password must be at least 6 characters';
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  useEffect(() => {
    const noErrors = Object.values(errors).every(e => !e);
    const allFilled =
      building.trim() && flatNumber.trim() &&
      /^\d{10}$/.test(mobile) && password.length >= 6;
    setIsFormValid(noErrors && allFilled);
  }, [building, flatNumber, mobile, password, errors]);

  const handleLogin = async () => {
    if (!isFormValid) return;

    try {
      const email = `${mobile}@dummy.com`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const profileData = docSnap.data();
        // Save user profile data to AsyncStorage for persistence
        await AsyncStorage.setItem('userDetails', JSON.stringify(profileData));
        router.push({
          pathname: '/main',
          params: profileData,
        });
      } else {
        alert('No user profile found');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder="Building Name"
              value={building}
              onChangeText={t => {
                setBuilding(t);
                validateField('building', t);
              }}
            />
            {errors.building && <Text style={styles.error}>{errors.building}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Flat Number"
              value={flatNumber}
              onChangeText={t => {
                setFlatNumber(t);
                validateField('flatNumber', t);
              }}
            />
            {errors.flatNumber && <Text style={styles.error}>{errors.flatNumber}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={mobile}
              onChangeText={t => {
                setMobile(t);
                validateField('mobile', t);
              }}
              keyboardType="phone-pad"
            />
            {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={t => {
                setPassword(t);
                validateField('password', t);
              }}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={!isFormValid}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Link href="/" asChild>
              <TouchableOpacity style={styles.backLink}>
                <Text style={styles.backText}>⬅ Back to Home</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
