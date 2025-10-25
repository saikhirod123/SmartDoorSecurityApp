import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CrossPlatformDatePicker = ({ 
  label, 
  value, 
  onChange, 
  mode = 'date',
  minimumDate = null,
  style = {},
  disabled = false 
}) => {
  const [show, setShow] = React.useState(false);

  const handleChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date) => {
    if (mode === 'time') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toDateString();
  };

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTimeForInput = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleWebChange = (e) => {
    if (mode === 'date') {
      const newDate = new Date(e.target.value);
      onChange(newDate);
    } else if (mode === 'time') {
      const [hours, minutes] = e.target.value.split(':');
      const newTime = new Date(value);
      newTime.setHours(parseInt(hours), parseInt(minutes));
      onChange(newTime);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webContainer, style]}>
        <input
          type={mode}
          value={mode === 'date' ? formatDateForInput(value) : formatTimeForInput(value)}
          onChange={handleWebChange}
          min={minimumDate ? formatDateForInput(minimumDate) : undefined}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '500',
            color: disabled ? '#999' : '#2C3E50',
            backgroundColor: '#F8F9FB',
            border: '1.5px solid #E1E5EB',
            borderRadius: '12px',
            outline: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        />
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity 
        style={[styles.mobileContainer, style]} 
        onPress={() => !disabled && setShow(true)} 
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View style={styles.inputContent}>
          <Ionicons 
            name={mode === 'time' ? 'time' : 'calendar'} 
            size={20} 
            color={disabled ? '#999' : '#276CF0'} 
            style={styles.icon} 
          />
          <Text style={[styles.text, disabled && styles.textDisabled]}>
            {formatDate(value)}
          </Text>
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value}
          mode={mode}
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    width: '100%',
  },
  mobileContainer: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E1E5EB',
    overflow: 'hidden',
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  textDisabled: {
    color: '#999',
  },
});
