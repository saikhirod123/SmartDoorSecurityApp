import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F7F8FB' 
  },
  
  scrollContainer: { 
    flexGrow: 1, 
    paddingBottom: 24 
  },
  
  // Header Styles
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  
  backButton: { 
    padding: 4 
  },
  
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#24292f' 
  },
  
  headerSpacer: { 
    width: 24 
  },
  
  // Banner Styles
  bannerArea: {
    backgroundColor: '#EFE6D9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: width * 0.08,
    paddingBottom: width * 0.06,
    paddingHorizontal: 20,
  },
  
  bannerIcon: { 
    marginBottom: 12 
  },
  
  inviteMsg: {
    fontSize: width < 360 ? 20 : 22,
    fontWeight: '500',
    lineHeight: 30,
    color: '#6e5000',
    textAlign: 'center',
  },
  
  userName: {
    fontWeight: '700',
    color: '#84601B',
    fontSize: width < 360 ? 22 : 24,
  },
  
  // Card Styles
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 2,
    paddingVertical: width * 0.08,
    paddingHorizontal: width * 0.05,
    flex: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  
  // Passcode Container Styles
  passcodeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  
  passcodeLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  passcodeLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
  },
  
  passcodeBox: {
    backgroundColor: '#F0F7FF',
    borderWidth: 3,
    borderColor: '#276CF0',
    borderRadius: 20,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.12,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#276CF0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  
  passcodeText: {
    fontSize: width < 360 ? 36 : 44,
    fontWeight: '800',
    color: '#276CF0',
    letterSpacing: 10,
    textAlign: 'center',
  },
  
  // Copy Button Styles
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#E8F4FF',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#C2E0FF',
  },
  
  copyText: {
    color: '#276CF0',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 8,
  },
  
  // Validity Card Styles
  validityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E7',
    borderLeftWidth: 4,
    borderLeftColor: '#FFA726',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '100%',
  },
  
  validityInfo: {
    marginLeft: 10,
    flex: 1,
  },
  
  validityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  
  validityText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
    marginBottom: 2,
  },
  
  validitySubtext: {
    fontSize: 12,
    color: '#999',
  },
  
  // Info Box Styles
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F7FF',
    borderLeftWidth: 4,
    borderLeftColor: '#276CF0',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    lineHeight: 21,
  },
  
  // Location Card Styles
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  
  locationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  
  locationLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  
  locationText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  
  // Share Section Styles
  shareSection: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  
  shareSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  
  shareButtonsContainer: {
    flexDirection: 'row',
    gap: 14,
  },
  
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: height * 0.02,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  
  smsButton: {
    backgroundColor: '#276CF0',
  },
  
  shareButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});
