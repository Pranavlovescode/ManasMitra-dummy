import { useAuth } from '@/context/auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
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
import { authColors } from './styles';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signup } = useAuth();
  const colorScheme = useColorScheme();
  // Force light mode
  const isDark = false;
  
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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

  const handleSignup = async () => {
    Keyboard.dismiss();
    setError('');
    
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsSigningUp(true);
    
    try {
      const success = await signup(email, name, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        setError('Email already in use or signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[styles.mainContainer]}>
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
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.subtitleText}>Join us and start your adventure</Text>
            </View>
            
            <View style={styles.formContainer}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#999999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999999"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              
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
              
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#999999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999999"
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              
              <TouchableOpacity 
                style={[styles.signupButton, isSigningUp && { opacity: 0.7 }]}
                onPress={handleSignup}
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signupButtonText}>Create Account</Text>
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
            
            <View style={styles.loginContainer}>
              <Text style={styles.haveAccountText}>Already have an account?</Text>
              <Link href="./login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginText}>Log In</Text>
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
    flex: 1,
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
    marginTop: 50,
    marginBottom: 30,
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
  errorText: {
    color: authColors.error,
    fontSize: 14,
    marginBottom: 16,
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
  signupButton: {
    backgroundColor: authColors.primary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: authColors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  signupButtonText: {
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  haveAccountText: {
    color: '#666666',
    fontSize: 14,
  },
  loginText: {
    color: authColors.primary,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
  }
});