import { useAuth } from '@/context/auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { authColors, authStyles } from './styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const colorScheme = useColorScheme();
  // Force light mode
  const isDark = false;
  
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Simple animation for the decorations
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  const handleLogin = async () => {
    Keyboard.dismiss();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const containerStyle = [
    authStyles.container,
    { backgroundColor: isDark ? authColors.darkBackground : authColors.background }
  ];
  
  const textStyle = {
    color: isDark ? '#fff' : authColors.text,
  };

  const inputStyle = [
    authStyles.input,
    {
      backgroundColor: isDark ? authColors.darkInputBg : authColors.inputBg,
      borderColor: isDark ? authColors.darkInputBorder : authColors.inputBorder,
      color: isDark ? '#fff' : '#333',
    }
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[containerStyle, styles.mainContainer]}>
          <StatusBar style="dark" />
          
          {/* Decorative elements - Simplified and positioned like in the screenshot */}
          <Animated.View style={[
            styles.circleDecoration,
            { transform: [{ scale: animatedValue.interpolate({inputRange: [0, 1], outputRange: [1, 1.1]}) }] }
          ]} />
          
          <Animated.View style={[
            styles.bottomCircleDecoration,
            { transform: [{ scale: animatedValue.interpolate({inputRange: [0, 1], outputRange: [1, 1.05]}) }] }
          ]} />
          
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitleText}>Log in to continue your journey</Text>
            </View>
            
            <View style={styles.formContainer}>
              {error ? <Text style={authStyles.errorText}>{error}</Text> : null}
              
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#999999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#999999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#999999" 
                  />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.loginButton, isLoggingIn && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Log In</Text>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={22} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={22} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.signupContainer}>
              <Text style={styles.noAccountText}>Don't have an account?</Text>
              <Link href="./signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: authColors.background,
  },
  circleDecoration: {
    position: 'absolute',
    right: -50,
    top: 80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: authColors.primary,
    opacity: 0.1,
  },
  bottomCircleDecoration: {
    position: 'absolute',
    left: -40,
    bottom: 60,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: authColors.secondary,
    opacity: 0.1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: authColors.text,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666666',
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: authColors.inputBg,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 55,
    borderWidth: 1,
    borderColor: authColors.inputBorder,
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  input: {
    flex: 1,
    height: 55,
    color: authColors.text,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: authColors.primary,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: authColors.primary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 2,
    shadowColor: authColors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  noAccountText: {
    color: '#666666',
    fontSize: 14,
  },
  signUpText: {
    color: authColors.primary,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
  }
});