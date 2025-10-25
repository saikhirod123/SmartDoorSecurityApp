import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { Stack, useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Linking, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CrossPlatformDatePicker } from '../components/CrossPlatformDatePicker';
import { app } from '../firebaseConfig';
import { styles } from '../StylingSheets/frequentVisitorInviteStyles';

export default function FrequentVisitorInvite() {
  const router = useRouter();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [userName, setUserName] = useState('User');
  const [flatNumber, setFlatNumber] = useState('');
  const [building, setBuilding] = useState('');
  const [location, setLocation] = useState('');

  const [duration, setDuration] = useState('1 Week');
  const DURATION_OPTIONS = ['1 Week', '1 Month', '>1 Month'];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  const [passcode, setPasscode] = useState('');
  const [inviteCreated, setInviteCreated] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    // Auto-calculate end date based on selected duration
    if (duration === '1 Week') {
      setEndDate(new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000));
    } else if (duration === '1 Month') {
      const newEndDate = new Date(startDate);
      newEndDate.setMonth(newEndDate.getMonth() + 1);
      setEndDate(newEndDate);
    }
  }, [duration, startDate]);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userDetails');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name || 'User');
        setFlatNumber(user.flatNumber || '');
        setBuilding(user.building || '');
        setLocation(
          user.flatNumber && user.building
            ? `Block - ${user.flatNumber}, ${user.building}`
            : ''
        );
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleCreateInvite = async () => {
    if (startDate >= endDate) {
      Alert.alert('Invalid Dates', 'End date must be after start date');
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'Please login to create invites');
        return;
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setPasscode(code);

      await addDoc(collection(db, 'invites'), {
        userId: currentUser.uid,
        userName: userName,
        flatNumber: flatNumber,
        building: building,
        location: location,
        passcode: code,
        type: 'frequent',
        duration: duration,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        createdAt: serverTimestamp(),
        expiresAt: endDate,
        isActive: true,
      });

      setInviteCreated(true);
      Alert.alert('Success!', `Frequent visitor invite created with passcode: ${code}`);
    } catch (error) {
      console.error('Error creating invite:', error);
      Alert.alert('Error', 'Failed to create invite. Please try again.');
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(passcode);
      Alert.alert('✅ Copied!', 'Passcode copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy passcode');
    }
  };

  const createInviteMessage = () => {
    return `🏠 *Frequent Visitor Invite from ${userName}*\n\n` +
      `📍 Location: ${location}\n` +
      `📅 Valid from: ${startDate.toDateString()}\n` +
      `📅 Valid until: ${endDate.toDateString()}\n` +
      `⏰ Duration: ${duration}\n` +
      `🔑 Passcode: *${passcode}*\n\n` +
      `This passcode allows entry during the specified period.`;
  };

  const handleWhatsAppShare = async () => {
    if (!passcode) {
      Alert.alert('Create Invite First', 'Please create an invite before sharing');
      return;
    }

    try {
      const message = createInviteMessage();
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert('WhatsApp Not Found', 'WhatsApp is not installed on your device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open WhatsApp');
    }
  };

  const handleSMSShare = async () => {
    if (!passcode) {
      Alert.alert('Create Invite First', 'Please create an invite before sharing');
      return;
    }

    try {
      const message = createInviteMessage();
      const encodedMessage = encodeURIComponent(message);
      
      let smsUrl = Platform.OS === 'ios' ? `sms:&body=${encodedMessage}` : `sms:?body=${encodedMessage}`;

      const supported = await Linking.canOpenURL(smsUrl);
      if (supported) {
        await Linking.openURL(smsUrl);
      } else {
        Alert.alert('Error', 'Unable to open SMS app');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open SMS');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#363636" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Frequent Visitor Invite</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Banner */}
          <View style={styles.bannerArea}>
            <MaterialCommunityIcons name="account-clock" size={48} color="#84601B" style={styles.bannerIcon} />
            <Text style={styles.inviteMsg}>
              <Text style={styles.userName}>{userName.toUpperCase()}</Text>
              {'\nhas invited you.'}
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            
            {/* Duration Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.floatingLabel}>Allow entry for</Text>
              <View style={styles.durationRow}>
                {DURATION_OPTIONS.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.durationChip, duration === opt && styles.durationChipActive]}
                    onPress={() => setDuration(opt)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.durationChipText, duration === opt && styles.durationChipTextActive]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Start Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.floatingLabel}>Start Date</Text>
              <CrossPlatformDatePicker
                value={startDate}
                onChange={setStartDate}
                mode="date"
                minimumDate={new Date()}
              />
            </View>

            {/* End Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.floatingLabel}>End Date</Text>
              <CrossPlatformDatePicker
                value={endDate}
                onChange={setEndDate}
                mode="date"
                minimumDate={startDate}
                disabled={duration !== '>1 Month'}
              />
              {duration !== '>1 Month' && (
                <Text style={styles.helperText}>Auto-calculated based on duration</Text>
              )}
            </View>

            {/* Create Invite Button */}
            <TouchableOpacity
              style={styles.createBtn}
              onPress={handleCreateInvite}
              activeOpacity={0.8}
            >
              <Ionicons name="add-circle" size={22} color="#313131" style={{ marginRight: 8 }} />
              <Text style={styles.createBtnText}>Create Invite</Text>
            </TouchableOpacity>

            {/* Passcode Display */}
            {inviteCreated && passcode && (
              <View style={styles.passcodeSection}>
                <View style={styles.passcodeBox}>
                  <Ionicons name="shield-checkmark" size={28} color="#276CF0" style={{ marginBottom: 8 }} />
                  <Text style={styles.passcodeLabel}>Your Frequent Visitor Passcode</Text>
                  <Text style={styles.passcodeText}>{passcode}</Text>
                  <TouchableOpacity style={styles.copyBtn} onPress={handleCopyToClipboard} activeOpacity={0.7}>
                    <Ionicons name="copy" size={18} color="#276CF0" />
                    <Text style={styles.copyText}>Copy Passcode</Text>
                  </TouchableOpacity>

                  {/* Validity Info */}
                  <View style={styles.validityCard}>
                    <Ionicons name="time-outline" size={20} color="#666" />
                    <View style={styles.validityInfo}>
                      <Text style={styles.validityLabel}>Valid Period</Text>
                      <Text style={styles.validityText}>
                        {startDate.toLocaleDateString('en-IN')} - {endDate.toLocaleDateString('en-IN')}
                      </Text>
                      <Text style={styles.validitySubtext}>{duration} access</Text>
                    </View>
                  </View>
                </View>

                {/* Share Buttons */}
                <Text style={styles.shareTitle}>Share Invite</Text>
                <View style={styles.shareButtonsContainer}>
                  <TouchableOpacity style={[styles.shareButton, styles.whatsappButton]} onPress={handleWhatsAppShare} activeOpacity={0.85}>
                    <Ionicons name="logo-whatsapp" size={24} color="#fff" />
                    <Text style={styles.shareButtonText}>WhatsApp</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.shareButton, styles.smsButton]} onPress={handleSMSShare} activeOpacity={0.85}>
                    <Ionicons name="chatbubbles" size={22} color="#fff" />
                    <Text style={styles.shareButtonText}>SMS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
