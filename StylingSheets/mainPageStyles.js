import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const BG_COLOR = '#F7F8FB';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  
  container: {
    flex: 1,
  },
  
  // Header Styles
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 65,
    paddingHorizontal: 16,
    paddingTop: 18,
    backgroundColor: '#fff',
  },
  
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e4d4fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  avatarInitials: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 18,
  },
  
  headerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  
  headerFlatNo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  
  headerAddress: {
    fontSize: 14,
    color: '#999',
  },
  
  // Welcome Card Styles
  welcomeCard: {
    marginHorizontal: '4%',
    marginBottom: 12,
    position: 'relative',
  },
  
  backgroundImage: {
    width: '100%',
    height: height * 0.23,
    justifyContent: 'center',
    paddingHorizontal: width * 0.06,
    borderRadius: 16,
  },
  
  textOverlay: {
    backgroundColor: 'rgba(0,0,0,0.32)',
    borderRadius: 12,
    padding: width * 0.03,
    maxWidth: '85%',
    alignSelf: 'flex-start',
  },
  
  welcomeText: {
    fontSize: width < 400 ? 18 : 22,
    fontWeight: '700',
    color: '#fff',
  },
  
  unitText: {
    fontSize: width < 400 ? 13 : 15,
    color: '#ddd',
    marginTop: 4,
    fontWeight: '600',
  },
  
  // Guest Invite Card Styles
  modalCard: {
    width: '95%',
    maxWidth: 580,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignSelf: 'center',
    paddingTop: height * 0.023,
    paddingBottom: height * 0.018,
    paddingHorizontal: width * 0.05,
    marginBottom: 20,
    elevation: 2,
  },
  
  title: {
    fontSize: width < 400 ? 19 : 21,
    color: '#212224',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 6,
  },
  
  subtitle: {
    fontSize: width < 350 ? 13 : 15,
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
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.04,
    minHeight: height * 0.07,
  },
  
  inviteTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  
  inviteTitle: {
    color: '#2A2B2F',
    fontSize: width < 400 ? 14 : 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  
  inviteDesc: {
    color: '#444950',
    fontSize: width < 350 ? 12 : 13,
    fontWeight: '400',
    opacity: 0.67,
  },
  
  // Intercom Card Styles
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: '4%',
    marginBottom: 16,
    padding: width * 0.04,
    elevation: 2,
  },
  
  deviceCard: {
    backgroundColor: '#f8faff',
    borderRadius: 14,
    padding: width * 0.04,
  },
  
  intercomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  deviceTitle: {
    fontSize: width < 400 ? 16 : 18,
    fontWeight: '700',
    color: '#24292f',
    marginLeft: 10,
  },
  
  // Door Status Styles
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  
  statusTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  
  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  
  statusText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  
  autoCloseText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  
  // Hold Button Styles
  holdButton: {
    backgroundColor: '#276CF0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  
  holdButtonActive: {
    backgroundColor: '#1E5BBF',
  },
  
  holdButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 2,
  },
  
  holdButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  
  holdProgress: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 6,
  },
  
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  
  instructionText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Tab Bar Styles
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
    fontSize: width < 400 ? 10 : 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
