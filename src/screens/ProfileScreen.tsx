import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }: any) {
  const { usuario } = useUser();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [avatarUrl, setAvatarUrl] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [ultimoLogin, setUltimoLogin] = useState('');

  const patrimonioTotal = 12500.75;
  const rentabilidadeMensal = 3.2;
  const perfilRisco = 'Moderado';
  const dataCriacao = '17/09/2023';

  useEffect(() => {
    const agora = new Date();
    const horaFormatada = agora.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setUltimoLogin(horaFormatada);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: isDark ? '#0D1117' : '#F3F4F6',
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
    },
    card: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 24,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 6,
      marginBottom: 24,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardIcon: {
      marginRight: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FF6F00',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignSelf: 'center',
      marginBottom: 16,
      borderWidth: 2,
      borderColor: isDark ? '#444' : '#DDD',
    },
    info: {
      fontSize: 15,
      color: isDark ? '#D1D5DB' : '#4B5563',
      marginBottom: 6,
    },
    meta: {
      fontSize: 14,
      color: isDark ? '#D1D5DB' : '#4B5563',
      marginBottom: 6,
    },
    input: {
      backgroundColor: isDark ? '#1F2937' : '#FFF',
      padding: 10,
      borderRadius: 8,
      marginBottom: 12,
      color: isDark ? '#F9FAFB' : '#111827',
    },
    editButton: {
      marginTop: 16,
      backgroundColor: '#003366',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignSelf: 'center',
    },
    editText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    logoutButton: {
      marginTop: 12,
      backgroundColor: '#FF6F00',
      paddingVertical: 10,
      paddingHorizontal: 28,
      borderRadius: 8,
      alignSelf: 'center',
    },
    logoutText: {
      color: '#FFF',
      fontSize: 15,
      fontWeight: '600',
    },
    quote: {
      fontSize: 14,
      fontStyle: 'italic',
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginTop: 32,
      textAlign: 'center',
    },
    emptyText: {
      fontSize: 18,
      color: isDark ? '#AAA' : '#888',
      marginTop: 20,
      textAlign: 'center',
    },
  });

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Nenhum usuário logado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Dados Pessoais */}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => setShowInput(!showInput)}>
          <Image
            source={
              avatarUrl
                ? { uri: avatarUrl }
                : require('../../assets/avatar-placeholder.png')
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        {showInput && (
          <TextInput
            style={styles.input}
            placeholder="Cole o link da imagem"
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            onChangeText={setAvatarUrl}
            value={avatarUrl}
          />
        )}
        <View style={styles.cardHeader}>
          <Ionicons name="person-outline" size={24} color="#FF6F00" style={styles.cardIcon} />
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        </View>
        <Text style={styles.info}>Nome: {usuario.nome}</Text>
        <Text style={styles.info}>Email: {usuario.email}</Text>
        <Text style={styles.info}>Nascimento: {usuario.nascimento}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.editText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Resumo Financeiro */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="bar-chart-outline" size={24} color="#FF6F00" style={styles.cardIcon} />
          <Text style={styles.sectionTitle}>Resumo Financeiro</Text>
        </View>
        <Text style={styles.info}>Perfil de risco: {perfilRisco}</Text>
        <Text style={styles.info}>Patrimônio: R$ {patrimonioTotal.toFixed(2).replace('.', ',')}</Text>
        <Text style={styles.info}>Rentabilidade: +{rentabilidadeMensal.toFixed(1)}%</Text>
      </View>

      {/* Histórico de Acesso */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={24} color="#FF6F00" style={styles.cardIcon} />
          <Text style={styles.sectionTitle}>Histórico de Acesso</Text>
        </View>
        <Text style={styles.info}>Último login: {ultimoLogin}</Text>
        <Text style={styles.info}>Conta criada em: {dataCriacao}</Text>
      </View>

      {/* Minhas Metas */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="flag-outline" size={24} color="#FF6F00" style={styles.cardIcon} />
          <Text style={styles.sectionTitle}>Minhas Metas</Text>
        </View>
        <Text style={styles.meta}>• Comprar um carro até Dez/2026</Text>
        <Text style={styles.meta}>• Juntar R$ 50.000 até 2027</Text>
      </View>

      {/* Botão de sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => BackHandler.exitApp()}>
        <Text style={styles.logoutText}>Sair do App</Text>
      </TouchableOpacity>

      {/* Frase motivacional */}
      <Text style={styles.quote}>
        “Investir é plantar hoje o que você quer colher amanhã.”
      </Text>
    </ScrollView>
  );
}