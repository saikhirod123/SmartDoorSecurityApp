// components/HistoryDrawerButton.js
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { db } from '../firebaseConfig';

export default function HistoryDrawerButton() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-300)).current;
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    // Fetch recent visitors on component mount
    const fetchVisitors = async () => {
      try {
        const q = query(collection(db, 'visitors'), orderBy('timestamp', 'desc'), limit(20));
        const snapshot = await getDocs(q);
        const visitorList = [];
        snapshot.forEach((doc) => visitorList.push({ id: doc.id, ...doc.data() }));
        setVisitors(visitorList);
      } catch (err) {
        Alert.alert('Error', 'Failed to load visitor history.');
      }
    };
    fetchVisitors();
  }, []);

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -300,
      duration: 200,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: false,
    }).start(() => setDrawerVisible(false));
  };

  return (
    <>
      <TouchableOpacity style={{ padding: 10 }} onPress={openDrawer} activeOpacity={0.7}>
        <Ionicons name="time-outline" size={26} color="#007AFF" />
      </TouchableOpacity>

      <Modal visible={drawerVisible} transparent animationType="none" onRequestClose={closeDrawer}>
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <View style={styles.drawerBackdrop} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.drawer, { left: drawerAnim }]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Visitor History</Text>
          </View>
          <FlatList
            data={visitors}
            keyExtractor={(item) => item.id}
            style={styles.drawerList}
            renderItem={({ item }) => (
              <View style={styles.drawerVisitorItem}>
                <Image
                  source={{
                    uri:
                      item.photoURL ||
                      'https://i.pravatar.cc/80?u=' + encodeURIComponent(item.name || 'guest'),
                  }}
                  style={styles.drawerVisitorImage}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.drawerVisitorName}>{item.name}</Text>
                  <Text style={styles.drawerVisitorTime}>
                    {item.timestamp
                      ? moment(item.timestamp.toDate ? item.timestamp.toDate() : item.timestamp).format('MMM D, h:mm A')
                      : ''}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.drawerEmpty}>No visitors found.</Text>}
          />
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  drawerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000a',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 20,
  },
  drawerHeader: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  drawerList: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  drawerVisitorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  drawerVisitorImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e5e5e5',
  },
  drawerVisitorName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
  },
  drawerVisitorTime: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  drawerEmpty: {
    margin: 32,
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
