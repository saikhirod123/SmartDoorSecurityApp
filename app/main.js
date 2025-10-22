import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const BG_COLOR = '#F7F8FB';

export default function MainPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    flatNumber: '',
    address: '',
    profileUrl: '',
  });

  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      if (data) {
        const userData = JSON.parse(data);
        setUser(userData);
      }
    });
  }, []);

  const goToProfile = () => router.push('/profile');
  const handleQuickAction = (action) => Alert.alert('Selected', action);
  const handleSwipeOpen = (device) => Alert.alert('Opening', device);

  return (
    <View style={styles.container}>
      {/* Top bar and logo */}
      <View style={styles.headerRow}>
        <Ionicons name="menu" size={28} color="#1A1A29" style={{ marginLeft: 5 }} />
        <Image
          source={{ uri: 'https://butterflymx.com/static/butterflymx-logo-colored-500.png' }}
          style={styles.logo}
        />
        <View style={{ width: 28 }} />
      </View>

      {/* Connected banner */}
      <View style={styles.connectedBanner}>
        <Text style={styles.connectedText}>Connected!</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Welcome card with image background */}
        <View style={styles.welcomeCard}>
          <ImageBackground
            source={require('../assets/app_banner.jpg')}
            style={styles.backgroundImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.textOverlay}>
              <Text style={styles.welcomeText}>Welcome, {user.name || 'User'}!</Text>
              <Text style={styles.unitText}>
                {user.flatNumber ? `Unit ${user.flatNumber}` : ''}
              </Text>
            </View>
          </ImageBackground>

          <TouchableOpacity style={styles.profileCircle} onPress={goToProfile}>
            <Image
              source={{
                uri:
                  user.profileUrl ||
                  'https://butterflymx.com/static/butterflymx-logo-colored-500.png',
              }}
              style={{ width: 44, height: 44, borderRadius: 22 }}
            />
          </TouchableOpacity>
        </View>

        {/* Guest Invite (Quick Create) Card */}
        <View style={styles.modalCard}>
          <Text style={styles.title}>Guest Invite</Text>
          <Text style={styles.subtitle}>
            Create pre-approval of expected visitors to ensure hassle-free entry for them
          </Text>

          {/* Quick Invite */}
          <TouchableOpacity
            style={styles.inviteOption}
            onPress={() => handleQuickAction('Quick Invite')}
            activeOpacity={0.8}
          >
            <View style={styles.inviteTextWrap}>
              <Text style={styles.inviteTitle}>Quick Invite &gt;</Text>
              <Text style={styles.inviteDesc}>
                Ensure smooth entry by manually pre-approving guests. Best for small, personal gatherings.
              </Text>
            </View>
            <Ionicons name="person-add-outline" size={30} color="#22343C" />
          </TouchableOpacity>

          {/* Party/Group Invite */}
          <TouchableOpacity
            style={styles.inviteOption}
            onPress={() => handleQuickAction('Party/Group Invite')}
            activeOpacity={0.8}
          >
            <View style={styles.inviteTextWrap}>
              <Text style={styles.inviteTitle}>Party/Group Invite &gt;</Text>
              <Text style={styles.inviteDesc}>
                Create a common guest invite link with a limit for large gatherings and easy tracking.
              </Text>
            </View>
            <Ionicons name="people-outline" size={30} color="#22343C" />
          </TouchableOpacity>

          {/* Frequent Invite */}
          <TouchableOpacity
            style={styles.inviteOption}
            onPress={() => handleQuickAction('Frequent Invite')}
            activeOpacity={0.8}
          >
            <View style={styles.inviteTextWrap}>
              <Text style={styles.inviteTitle}>Frequent Invite &gt;</Text>
              <Text style={styles.inviteDesc}>
                Invite long-term guests with a single passcode, without repeated approvals.
              </Text>
            </View>
            <Ionicons name="repeat-outline" size={30} color="#22343C" />
          </TouchableOpacity>
        </View>

        {/* Single device/intercom card */}
        <View style={styles.cardContainer}>
          <View style={styles.deviceCard}>
            <Text style={styles.deviceTitle}>Jack's MacBook Monarch Intercom</Text>
            <TouchableOpacity
              style={[styles.swipeBtn, { backgroundColor: '#39B5F6' }]}
              onPress={() => handleSwipeOpen("Jack's MacBook Monarch Intercom")}
            >
              <Text style={styles.swipeText}>SWIPE TO OPEN</Text>
              <Ionicons name="arrow-forward-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom tab bar */}
      <View style={styles.tabBar}>
        <TabIcon icon="home-outline" label="Home" onPress={() => router.push('/')} />
        <TabIcon icon="person-outline" label="Visitors" onPress={() => router.push('/visitors')} />
        <TabIcon icon="settings-outline" label="Account" active onPress={goToProfile} />
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    elevation: 2,
  },
  logo: {
    width: 130,
    height: 24,
    resizeMode: 'contain',
  },
  connectedBanner: {
    backgroundColor: '#23C36B',
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  connectedText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  welcomeCard: {
    margin: 12,
    marginBottom: 12,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: height * 0.25,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  textOverlay: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 12,
    padding: 10,
    maxWidth: '85%',
  },
  welcomeText: {
    fontSize: 21,
    fontWeight: '700',
    color: '#fff',
  },
  unitText: {
    fontSize: 15,
    color: '#ddd',
    marginTop: 4,
    fontWeight: '600',
  },
  profileCircle: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  // Guest Invite/Quick Create modal styles
  modalCard: {
    width: width * 0.95,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignSelf: 'center',
    paddingTop: 27,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
  },
  title: {
    fontSize: 21,
    color: '#212224',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14.5,
    color: '#6C6D70',
    marginBottom: 14,
    fontWeight: '400',
  },
  inviteOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 15,
    marginBottom: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 70,
  },
  inviteTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  inviteTitle: {
    color: '#2A2B2F',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  inviteDesc: {
    color: '#444950',
    fontSize: 13,
    fontWeight: '400',
    opacity: 0.67,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 16,
    padding: 18,
    elevation: 1,
  },
  deviceCard: {
    backgroundColor: '#f8faff',
    borderRadius: 14,
    marginBottom: 12,
    padding: 16,
    elevation: 0,
  },
  deviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#42526A',
  },
  swipeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 8,
    marginTop: 3,
  },
  swipeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15.5,
    marginRight: 9,
    letterSpacing: 0.4,
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
