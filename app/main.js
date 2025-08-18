import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import HistoryDrawerButton from '../components/HistoryDrawerButton';
import NotificationsIconButton from '../components/NotificationsIconButton';
import QuickActionSlider from '../components/QuickActionSlider';
import SearchIconButton from '../components/SearchIconButton';

const windowHeight = Dimensions.get('window').height;

export default function MainPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [user, setUser] = useState({
    photoURL: '',
    name: '',
    mobile: '',
    flatNumber: '',
  });

  // Logout menu modal state & animation
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(-200)).current;

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

  // Drawer open/close for logout menu
  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuAnim, {
      toValue: -200,
      duration: 150,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  const handleLogout = async () => {
    closeMenu();
    await AsyncStorage.removeItem('user');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goToProfile}
          style={styles.profileContainer}
          activeOpacity={0.7}
        >
          <Ionicons name="person-circle" size={40} color="#fff" style={styles.accountIcon} />
          <Text style={styles.flatNumberText}>{user.flatNumber || 'N/A'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openMenu}
          activeOpacity={0.7}
          style={styles.menuIcon}
        >
          <Ionicons name="ellipsis-vertical" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* LOGOUT MENU MODAL */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.menuBackdrop} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.menuDrawer, { right: menuAnim }]}>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {/* TOP BANNER SECTION */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri:
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
          }}
          style={styles.buildingImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayWelcome}>Welcome, {user.name || 'User'}!</Text>
          <Text style={styles.overlayFlat}>Flat Number: {user.flatNumber || 'N/A'}</Text>
        </View>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        <QuickActionSlider />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <SearchIconButton onPress={() => Alert.alert('Search tapped')} />
        <NotificationsIconButton onPress={() => Alert.alert('Notifications tapped')} />
        <HistoryDrawerButton />
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
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    marginRight: 10,
  },
  flatNumberText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  menuIcon: {
    padding: 8,
  },

  menuBackdrop: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  menuDrawer: {
    position: 'absolute',
    top: 60,
    right: 10,
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#007AFF',
    fontFamily: 'Inter_600SemiBold',
  },

  topSection: {
    width: '100%',
    height: windowHeight * 0.2,
    position: 'relative',
    backgroundColor: '#222',
    marginBottom: 10,
  },
  buildingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayWelcome: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 8,
    textShadowOffset: { width: 1, height: 1 },
    letterSpacing: 0.2,
  },
  overlayFlat: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#fff',
    marginTop: 6,
    textShadowColor: '#000',
    textShadowRadius: 8,
    textShadowOffset: { width: 1, height: 1 },
    letterSpacing: 0.15,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },

  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 8,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 -2px 4px rgba(0,0,0,0.1)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }),
  },
});
