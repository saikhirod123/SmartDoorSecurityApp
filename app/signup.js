import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from './firebaseConfig';

export default function Signup() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [building, setBuilding] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateField = (field, value) => {
    let message = '';
    if (field === 'name' && !value.trim()) message = 'Name is required';
    if (field === 'mobile' && !/^\d{10}$/.test(value)) message = 'Enter a valid 10-digit mobile number';
    if (field === 'building' && !value.trim()) message = 'Building name is required';
    if (field === 'flatNumber' && !value.trim()) message = 'Flat number is required';
    if (field === 'password' && value.length < 6) message = 'Password must be at least 6 characters';
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const validateForm = () => {
    return Object.values(errors).every(e => !e) &&
      name.trim() && /^\d{10}$/.test(mobile) &&
      building.trim() && flatNumber.trim() && password.length >= 6;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      alert('Please fix form errors before submitting');
      return;
    }

    try {
      const email = `${mobile}@dummy.com`; // trick for Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        mobile,
        building,
        flatNumber
      });

      alert(`Registration Successful! Welcome ${name}`);
      router.push('/login');
    } catch (error) {
      alert('Signup failed: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Name"
        value={name} onChangeText={t => { setName(t); validateField('name', t); }} />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput style={styles.input} placeholder="Mobile Number"
        value={mobile} onChangeText={t => { setMobile(t); validateField('mobile', t); }} keyboardType="phone-pad" />
      {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

      <TextInput style={styles.input} placeholder="Building"
        value={building} onChangeText={t => { setBuilding(t); validateField('building', t); }} />
      {errors.building && <Text style={styles.error}>{errors.building}</Text>}

      <TextInput style={styles.input} placeholder="Flat Number"
        value={flatNumber} onChangeText={t => { setFlatNumber(t); validateField('flatNumber', t); }} />
      {errors.flatNumber && <Text style={styles.error}>{errors.flatNumber}</Text>}

      <TextInput style={styles.input} placeholder="Password"
        value={password} secureTextEntry
        onChangeText={t => { setPassword(t); validateField('password', t); }} />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Link href="/login" style={styles.backLink}><Text style={styles.backText}>Already have an account? Login</Text></Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 5, fontSize: 16, backgroundColor: '#fff' },
  button: { backgroundColor: '#007AFF', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  error: { color: 'red', fontSize: 13, marginBottom: 8 },
  backLink: { marginTop: 20, alignSelf: 'center' },
  backText: { color: '#007AFF', fontSize: 16 }
});
