import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { setUsuario } = useUser();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const dados = await AsyncStorage.getItem(`usuario:${email}`);
      if (!dados) {
        Alert.alert('Erro', 'Usuário não encontrado!');
        return;
      }

      const usuario = JSON.parse(dados);
      if (usuario.senha !== senha) {
        Alert.alert('Erro', 'Senha incorreta!');
        return;
      }

      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      setUsuario(usuario);
      navigation.replace('Main');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Falha ao realizar login!');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0D1117' : '#F2F5F9',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    iconHeader: {
      alignItems: 'center',   // centraliza no eixo horizontal
      justifyContent: 'center',
      marginBottom: 20,
    },
    card: {
      backgroundColor: isDark ? '#161B22' : '#FFFFFF',
      width: '100%',
      borderRadius: 16,
      padding: 28,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 6,
    },
    titulo: {
      fontSize: 26,
      fontWeight: '700',
      color: '#FF6F00',
      textAlign: 'center',
      marginBottom: 6,
    },
    subtitulo: {
      fontSize: 15,
      color: isDark ? '#9CA3AF' : '#566573',
      textAlign: 'center',
      marginBottom: 8,
    },
    frase: {
      fontSize: 14,
      fontStyle: 'italic',
      color: isDark ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      marginBottom: 24,
    },
    input: {
      height: 50,
      borderRadius: 10,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: isDark ? '#21262D' : '#FFFFFF',
      color: isDark ? '#F9FAFB' : '#2C3E50',
      borderWidth: 1,
      borderColor: isDark ? '#444' : '#D6DBDF',
    },
    botao: {
      backgroundColor: '#FF6F00',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 4,
    },
    botaoTexto: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    link: {
      marginTop: 20,
      color: '#FF6F00',
      textAlign: 'center',
      fontSize: 14,
      textDecorationLine: 'underline',
    },
    linkSecundario: {
      marginTop: 12,
      color: isDark ? '#9CA3AF' : '#566573',
      textAlign: 'center',
      fontSize: 13,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.iconHeader}>
      <Ionicons name="airplane-outline" size={48} color="#FF6F00" />
         <Text style={styles.titulo}>Smart Invest</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>Bem-vindo</Text>
        <Text style={styles.subtitulo}>Sua jornada financeira começa aqui</Text>
        <Text style={styles.frase}>“Investir é transformar sonhos em planos.”</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={isDark ? '#888' : '#999'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={isDark ? '#888' : '#999'}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.linkSecundario}>Não sei minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}