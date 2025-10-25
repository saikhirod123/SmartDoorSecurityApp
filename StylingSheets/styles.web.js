import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    minHeight: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: height * 0.015,
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: height * 0.04,
    textAlign: 'center',
    maxWidth: '90%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: 'center',
    width: 400,
    maxWidth: 400,
    minWidth: 220,
  },
  loginButton: {
    marginTop: height * 0.025,
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
});
