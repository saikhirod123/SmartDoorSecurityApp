import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

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
        const profileData = docSnap.data(); // contains name, building, flatNumber, mobile
        await AsyncStorage.setItem('user', JSON.stringify(profileData));

        router.push({
          pathname: '/main',
          params: profileData
        });
      } else {
        alert('No user profile found');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.input} placeholder="Building Name"
        value={building} onChangeText={t => { setBuilding(t); validateField('building', t); }} />
      {errors.building && <Text style={styles.error}>{errors.building}</Text>}

      <TextInput style={styles.input} placeholder="Flat Number"
        value={flatNumber} onChangeText={t => { setFlatNumber(t); validateField('flatNumber', t); }} />
      {errors.flatNumber && <Text style={styles.error}>{errors.flatNumber}</Text>}

      <TextInput style={styles.input} placeholder="Mobile Number"
        value={mobile} onChangeText={t => { setMobile(t); validateField('mobile', t); }} keyboardType="phone-pad" />
      {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

      <TextInput style={styles.input} placeholder="Password"
        value={password} secureTextEntry
        onChangeText={t => { setPassword(t); validateField('password', t); }} />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={!isFormValid}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/" style={styles.backLink}><Text style={styles.backText}>⬅ Back to Home</Text></Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 5, fontSize: 16, backgroundColor: '#fff' },
  button: { backgroundColor: '#34C759', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  error: { color: 'red', fontSize: 13, marginBottom: 8 },
  backLink: { marginTop: 20, alignSelf: 'center' },
  backText: { color: '#007AFF', fontSize: 16 }
});
