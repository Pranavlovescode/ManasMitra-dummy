import { StyleSheet } from 'react-native';

// Updated colors to use a clean light theme
export const authColors = {
  primary: '#7766FF', // Main purple button color
  secondary: '#5B5FC7', // Secondary accent
  accent: '#4263EB', // Additional accent
  success: '#00D68F', // Success color
  warning: '#FFBA49', // Warning color
  background: '#FFFFFF', // Light background (white)
  darkBackground: '#1A1B25', // Dark background (kept for reference)
  text: '#333333', // Dark text for light mode
  lightText: '#FFFFFF', // Light text for dark mode
  inputBg: '#F5F7FA', // Light input background (light gray)
  darkInputBg: '#2B2A3A', // Dark input background (kept for reference)
  inputBorder: '#E6E8EB', // Input border color light (light gray)
  darkInputBorder: '#3E3D4D', // Dark input border (kept for reference)
  error: '#FF3D71', // Error color
  gradient: ['#7766FF', '#6658D3'], // Purple gradient
};

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: authColors.primary,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: authColors.inputBg,
    borderColor: authColors.inputBorder,
    borderWidth: 1,
  },
  button: {
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: authColors.primary,
    marginTop: 16,
    shadowColor: authColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: 8,
    color: authColors.primary,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  switchText: {
    fontSize: 14,
    color: '#666',
  },
  switchButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: authColors.primary,
    marginLeft: 4,
  },
  errorText: {
    color: authColors.error,
    fontSize: 14,
    marginBottom: 8,
  },
  bottomContainer: {
    marginTop: 'auto',
  },
  decorationContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    opacity: 0.8,
  },
  bottomDecorationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 150,
    opacity: 0.8,
  },
});