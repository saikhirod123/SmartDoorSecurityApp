// components/SearchIconButton.js
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function SearchIconButton({ onPress }) {
  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="search" size={28} color="#007AFF" />
    </TouchableOpacity>
  );
}
