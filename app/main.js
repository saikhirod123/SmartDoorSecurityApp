import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function MainPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [user, setUser] = useState({
    photoURL: '', // image URL
    name: '',
    mobile: '',
  });

  useEffect(() => {
    if (params?.name) {
      setUser({
        photoURL: params.photoURL || 'https://i.pravatar.cc/150?u=' + params.mobile,
        name: params.name,
        mobile: params.mobile,
        building: params.building,
        flatNumber: params.flatNumber,
      });
    } else {
      AsyncStorage.getItem('user').then(data => {
        if (data) {
          const userData = JSON.parse(data);
          setUser({
            ...userData,
            photoURL: userData.photoURL || `https://i.pravatar.cc/150?u=${userData.mobile}`,
          });
        } else {
          router.replace('/login');
        }
      });
    }
  }, []);

  const goToProfile = () => {
    router.push({
      pathname: '/profile',
      params: user,
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user'); // clear user data
    router.replace('/'); // redirect to index page after logout
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToProfile} style={styles.profileContainer} activeOpacity={0.7}>
          <Image
            source={{
              uri: user.photoURL || 'https://i.pravatar.cc/150?u=default',
            }}
            style={styles.profileImage}
            onError={() => Alert.alert('Failed to load profile image')}
          />
          <Text style={styles.profileText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          {user.name ? `Welcome, ${user.name}!` : 'Welcome!'}
        </Text>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="search" size={28} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="notifications" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    height: 60,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }
      : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 }),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
    marginRight: 8,
  },
  profileText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 -2px 4px rgba(0,0,0,0.1)' }
      : { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 3 }),
  },
  iconButton: { padding: 10 },
});
