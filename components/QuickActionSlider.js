import { Alert, StyleSheet, Text, View } from 'react-native';
import SlideToUnlock from 'react-native-slide-to-unlock';

export default function QuickActionSlider() {
  const handleUnlock = () => {
    Alert.alert('Success', 'Door Unlocked!');
    // Replace with actual unlock logic if needed
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Main Entrance</Text>
      <SlideToUnlock
        containerStyle={styles.slideContainer}
        sliderElement={
          <View style={styles.sliderElement}>
            <Text style={styles.sliderText}>⇄ SLIDE TO UNLOCK</Text>
          </View>
        }
        onUnlock={handleUnlock}
        reverseSlideEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    elevation: 2, // subtle shadow on Android
    shadowColor: '#000', // subtle shadow on iOS
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007AFF',
    textAlign: 'center',
  },
  slideContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#f3f4f6',
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sliderElement: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    elevation: 3,
  },
  sliderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
