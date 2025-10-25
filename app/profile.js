import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BG_COLOR = '#F7F8FB';

export default function AccountPage() {
  const router = useRouter();
  const auth = getAuth();

  const [user, setUser] = useState({
    name: 'John Somarriba',
    flatNumber: '',
    mobile: '',
    unit: 'Unit 100',
    pin: '1234',
    away: 'Not Defined',
    photoURL: '',
  });
  const [secure, setSecure] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userDetails').then((data) => {
      if (data) {
        const userData = JSON.parse(data);
        setUser((u) => ({
          ...u,
          ...userData,
        }));
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
      await auth.signOut();
      router.replace('/login');
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Ionicons name="menu" size={26} color="#222" />
          <Text style={styles.headerTitle}>Account</Text>
          <View style={{ width: 26 }} />
        </View>

        {/* User Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            {user.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <Ionicons name="person-circle-outline" size={58} color="#C6CCD7" />
            )}
          </View>
          <View>
            <Text style={styles.nameText}>{user.name}</Text>
            <Text style={styles.unitText}>{user.flatNumber}</Text>
          </View>
        </View>

        {/* USER INFORMATION Section */}
        <SectionHeader text="USER INFORMATION" />
        <View style={styles.sectionCard}>
          {/* Removed email */}
          <InfoRow label="Flat Number" value={user.flatNumber} />
          <InfoRow label="Phone Number" value={user.mobile} />
          <TouchableOpacity onPress={() => router.push('/change-phone')}>
            <Text style={styles.linkText}>Change Phone Number</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/change-password')}>
            <Text style={styles.linkText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* PIN CODE Section */}
        <SectionHeader text="PIN CODE" />
        <View style={styles.sectionCard}>
          <View style={[styles.infoRow, { alignItems: 'center' }]}>
            <Text style={styles.infoLabel}>PIN</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.pinDots}>{secure ? '●●●●' : user.pin}</Text>
              <TouchableOpacity onPress={() => setSecure((s) => !s)} style={{ marginLeft: 10 }}>
                <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={22} color="#828A9E" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/manage-pin')}>
            <Text style={styles.linkText}>Manage PIN</Text>
          </TouchableOpacity>
          <Text style={styles.pinSub}>
            You can use the PIN anytime at the touchscreen to gain access to your property.
          </Text>
        </View>

        {/* Away Message */}
        <SectionHeader text="AWAY MESSAGE" />
        <TouchableOpacity
          style={[
            styles.sectionCard,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            },
          ]}
          onPress={() => router.push('/away-message')}
        >
          <Text style={[styles.infoValue, { fontSize: 16 }]}>{user.away}</Text>
          <Ionicons name="chevron-forward" size={22} color="#B4BAC4" />
        </TouchableOpacity>
        <Text style={styles.awaySub}>
          Use this feature to leave a note in the directory for visitors/deliveries.
        </Text>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.tabBar}>
        <TabIcon
          icon="home-outline"
          label="Home"
          active={router.pathname === '/main'}
          onPress={() => {
            if (router.pathname !== '/main') {
              router.push('/main');
            }
          }}
        />
        <TabIcon icon="person-outline" label="Visitors" onPress={() => router.push('/visitors')} />
        <TabIcon icon="settings-outline" label="Account" active />
      </View>
    </View>
  );
}

function SectionHeader({ text }) {
  return <Text style={styles.sectionHeader}>{text}</Text>;
}
function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}
function TabIcon({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tabIconWrap} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={25} color={active ? '#276CF0' : '#A3A8B3'} />
      <Text style={[styles.tabLabel, { color: active ? '#276CF0' : '#A3A8B3' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR },
  headerRow: {
    marginTop: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#383838',
  },
  profileCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 14,
    elevation: 1,
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 14,
  },
  avatarWrap: { marginRight: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#D3D9E4' },
  nameText: { fontSize: 18, fontWeight: 'bold', color: '#262932' },
  unitText: { fontSize: 13.5, color: '#7C8592', fontWeight: '500' },

  sectionHeader: {
    fontSize: 11.5,
    marginLeft: 20,
    marginVertical: 6,
    fontWeight: '700',
    color: '#A3A9B0',
    letterSpacing: 0.6,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 13,
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 14,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 7,
  },
  infoLabel: { color: '#8A93A6', fontSize: 15, fontWeight: '600', marginRight: 12 },
  infoValue: { color: '#262932', fontSize: 15, fontWeight: '500', maxWidth: '60%' },
  linkText: {
    color: '#276CF0',
    fontWeight: '700',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  pinDots: {
    color: '#262932',
    fontSize: 19,
    letterSpacing: 7,
    fontWeight: '600',
  },
  pinSub: {
    color: '#ADB1BD',
    fontSize: 12.5,
    marginTop: 5,
    lineHeight: 15,
  },
  awaySub: {
    marginHorizontal: 19,
    color: '#ACB2B7',
    fontSize: 12.5,
    marginTop: 2,
    marginBottom: 8,
    lineHeight: 15,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 12,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  tabBar: {
    height: 62,
    backgroundColor: '#fff',
    borderTopColor: '#DFE4EA',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
  },
  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
