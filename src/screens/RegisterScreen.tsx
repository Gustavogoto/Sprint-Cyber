import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nascimento, setNascimento] = useState('');

  const { cadastrar } = useUser();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleRegister = async () => {
    if (
      !nome ||
      !email ||
      !senha ||
      !nascimento ||
      !nascimento.match(/^\d{2}\/\d{2}\/\d{4}$/)
    ) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente!');
      return;
    }

    try {
      const existente = await AsyncStorage.getItem(`usuario:${email}`);
      if (existente) {
        Alert.alert('Erro', 'Este e-mail já está cadastrado!');
        return;
      }

      const novoUsuario = {
        nome,
        email,
        senha,
        nascimento,
        idioma: 'pt-BR',
      };

      await AsyncStorage.setItem(`usuario:${email}`, JSON.stringify(novoUsuario));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      Alert.alert('Erro', 'Falha ao salvar os dados!');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0D1117' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    card: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
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
      marginBottom: 6,
      textAlign: 'center',
    },
    subtitulo: {
      fontSize: 15,
      color: isDark ? '#9CA3AF' : '#566573',
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
      backgroundColor: '#003366',
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
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.titulo}>Criar Conta</Text>
        <Text style={styles.subtitulo}>Preencha os dados abaixo</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor={isDark ? '#888' : '#999'}
          value={nome}
          onChangeText={setNome}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Data de nascimento (DD/MM/AAAA)"
          placeholderTextColor={isDark ? '#888' : '#999'}
          value={nascimento}
          onChangeText={setNascimento}
        />

        <TouchableOpacity style={styles.botao} onPress={handleRegister}>
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}