import * as ImagePicker from "expo-image-picker";
import { Link, useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { db, storage } from "./firebaseConfig";

export default function ProfilePage() {
  const { name: initialName, building: initialBuilding, flatNumber: initialFlatNumber, mobile } = useLocalSearchParams();

  const [name, setName] = useState(initialName || "");
  const [building, setBuilding] = useState(initialBuilding || "");
  const [flatNumber, setFlatNumber] = useState(initialFlatNumber || "");
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatingInfo, setUpdatingInfo] = useState(false);

  const userDocId = mobile;

  // Fetch profile image and data from Firestore on component mount
  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(db, "users", userDocId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setBuilding(data.building || "");
          setFlatNumber(data.flatNumber || "");
          setImageUri(data.photoURL || null);
        }
      } catch (err) {
        Alert.alert("Error", "Failed to load profile data.");
      }
    })();
  }, [mobile]);

  // Pick image from device
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera roll permissions are required.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      await uploadImage(result.uri);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_images/${userDocId}.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      // Save URL to Firestore user doc
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { photoURL: downloadURL });
      setImageUri(downloadURL);
      Alert.alert("Success", "Profile picture updated!");
    } catch (error) {
      Alert.alert("Upload failed", error.message);
    } finally {
      setUploading(false);
    }
  };

  // Remove profile picture
  const removeImage = () => {
    if (!imageUri) {
      Alert.alert("No profile picture to remove.");
      return;
    }
    Alert.alert(
      "Confirm",
      "Are you sure you want to remove your profile picture?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            setUploading(true);
            try {
              const storageRef = ref(storage, `profile_images/${userDocId}.jpg`);
              await deleteObject(storageRef);
              const userRef = doc(db, "users", userDocId);
              await updateDoc(userRef, { photoURL: "" });
              setImageUri(null);
              Alert.alert("Removed", "Profile picture removed.");
            } catch (err) {
              Alert.alert("Error", err.message);
            } finally {
              setUploading(false);
            }
          },
        },
      ]
    );
  };

  // Save profile info edits
  const saveInfo = async () => {
    if (!name.trim() || !building.trim() || !flatNumber.trim()) {
      Alert.alert("Validation error", "Name, Building, and Flat Number are required.");
      return;
    }
    setUpdatingInfo(true);
    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { name, building, flatNumber });
      Alert.alert("Success", "Profile information updated.");
      setEditing(false);
    } catch (err) {
      Alert.alert("Update failed", err.message);
    } finally {
      setUpdatingInfo(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <TouchableOpacity onPress={uploading ? null : pickImage} style={styles.imageContainer}>
        {uploading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Tap to select photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {!!imageUri && !uploading && (
        <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
          <Text style={styles.removeText}>Remove Profile Picture</Text>
        </TouchableOpacity>
      )}

      {editing ? (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              editable={!updatingInfo}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Building:</Text>
            <TextInput
              style={styles.input}
              value={building}
              onChangeText={setBuilding}
              editable={!updatingInfo}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Flat Number:</Text>
            <TextInput
              style={styles.input}
              value={flatNumber}
              onChangeText={setFlatNumber}
              editable={!updatingInfo}
              autoCapitalize="characters"
            />
          </View>
          <TouchableOpacity
            style={[styles.button, updatingInfo && styles.buttonDisabled]}
            onPress={saveInfo}
            disabled={updatingInfo}
          >
            {updatingInfo ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setEditing(false)} disabled={updatingInfo}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name || "N/A"}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Building:</Text>
            <Text style={styles.value}>{building || "N/A"}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Flat Number:</Text>
            <Text style={styles.value}>{flatNumber || "N/A"}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text style={styles.value}>{mobile || "N/A"}</Text>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
            <Text style={styles.editText}>Edit Profile Info</Text>
          </TouchableOpacity>
        </>
      )}

      <Link href="/main" style={styles.backLink}>
        <Text style={styles.backText}>⬅ Back to Main</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  imageContainer: {
    borderRadius: 75,
    overflow: "hidden",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  profileImage: { width: 150, height: 150 },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  placeholderText: {
    color: "#666",
  },
  removeButton: {
    marginBottom: 20,
  },
  removeText: {
    color: "red",
    textDecorationLine: "underline",
  },
  infoBox: {
    flexDirection: "row",
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
    width: 120,
  },
  value: { fontSize: 16, flexShrink: 1 },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#7ea9ff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    marginBottom: 20,
  },
  cancelText: {
    color: "#007AFF",
    fontSize: 16,
  },
  editButton: {
    marginTop: 10,
  },
  editText: {
    color: "#007AFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  backLink: { marginTop: 30, alignSelf: "center" },
  backText: { color: "#007AFF", fontSize: 16 },
});
