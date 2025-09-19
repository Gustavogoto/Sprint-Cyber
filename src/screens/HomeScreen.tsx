import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { usuario } = useUser();
  const isDark = theme === 'dark';

  const hora = new Date().getHours();
  const periodo =
    hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  const patrimonioTotal = 12500.75;
  const rentabilidadeMensal = 3.2;
  const recomendacoesHoje = 3;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0D1117' : '#F3F4F6',
      paddingHorizontal: 16,
      paddingTop: 50,
    },
    // === HEADER ESTILO FOTO ===
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      padding: 12,
      borderRadius: 10,
    },
    perfil: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#111827',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    avatarTexto: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 16,
    },
    saudacaoHeader: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#F9FAFB' : '#111827',
    },
    subtextHeader: {
      fontSize: 12,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
    botaoTrocar: {
      borderWidth: 1,
      borderColor: '#111827',
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    botaoTexto: {
      color: '#111827',
      fontWeight: '600',
      fontSize: 14,
    },

    // === RESTO DO SEU CÓDIGO ORIGINAL ===
    saudacao: {
      fontSize: 25,
      fontWeight: '700',
      color: '#FF6F00',
      marginBottom: 16,
    },
    subtext: {
      fontSize: 16,
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: -20,
    },
    resumoBox: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      padding: 15,
      borderRadius: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 14,
    },
    valorBox: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    valorTexto: {
      marginLeft: 12,
    },
    valorLabel: {
      fontSize: 14,
      color: isDark ? '#D1D5DB' : '#6B7280',
    },
    valorValor: {
      fontSize: 20,
      fontWeight: '700',
      color: isDark ? '#F9FAFB' : '#111827',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#F9FAFB' : '#1F2937',
      marginBottom: 16,
    },
    cardSection: {
      backgroundColor: isDark ? '#111827' : '#FFFFFF',
      padding: 16,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3,
      elevation: 14,
      gap: 16,
      marginBottom: 32,
    },
    card: {
      backgroundColor: isDark ? '#1C1C1C' : '#FFFFFF',
      padding: 20,
      borderRadius: 14,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 16,
    },
    cardContent: {
      flex: 1,
    },
    cardTitulo: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FF6F00',
      marginBottom: 4,
    },
    cardDescricao: {
      fontSize: 14,
      color: isDark ? '#9CA3AF' : '#6B7280',
    },
  });

  return (
    <ScrollView style={styles.container}>
      {/* SAUDAÇÃO DINÂMICA (sem nome) */}
      <Text style={styles.saudacao}>{periodo}!</Text>

      {/* HEADER ESTILO FOTO */}
      <View style={styles.header}>
        <View style={styles.perfil}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>
              {usuario?.nome
                ? usuario.nome
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                : 'US'}
            </Text>
          </View>
          <View>
            <Text style={styles.saudacaoHeader}>
              Olá, {usuario?.nome || 'Usuário'}
            </Text>
            <Text style={styles.subtextHeader}>Ag ••46 conta •••12-8</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.botaoTrocar}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.botaoTexto}>Trocar conta</Text>
        </TouchableOpacity>
      </View>

      {/* RESUMO */}
      <View style={styles.resumoBox}>
        <View style={styles.valorBox}>
          <Ionicons name="wallet-outline" size={28} color="#003366" />
          <View style={styles.valorTexto}>
            <Text style={styles.valorLabel}>Patrimônio total</Text>
            <Text style={styles.valorValor}>
              R$ {patrimonioTotal.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        <View style={styles.valorBox}>
          <Ionicons name="trending-up-outline" size={28} color="#28B463" />
          <View style={styles.valorTexto}>
            <Text style={styles.valorLabel}>Rentabilidade mensal</Text>
            <Text style={styles.valorValor}>
              {rentabilidadeMensal.toFixed(1)}%
            </Text>
          </View>
        </View>

        <View style={styles.valorBox}>
          <Ionicons name="sparkles-outline" size={28} color="#FF6F00" />
          <View style={styles.valorTexto}>
            <Text style={styles.valorLabel}>Recomendações novas</Text>
            <Text style={styles.valorValor}>{recomendacoesHoje}</Text>
          </View>
        </View>
      </View>

      {/* CARDS */}
      <View style={styles.cardSection}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons
            name="person-outline"
            size={32}
            color="#003366"
            style={styles.icon}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitulo}>Perfil</Text>
            <Text style={styles.cardDescricao}>
              Visualize e edite suas informações pessoais
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Recommendations')}
        >
          <Ionicons
            name="thumbs-up-outline"
            size={32}
            color="#003366"
            style={styles.icon}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitulo}>Recomendações</Text>
            <Text style={styles.cardDescricao}>
              Veja sugestões de investimentos com base no seu perfil
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons
            name="settings-outline"
            size={32}
            color="#003366"
            style={styles.icon}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitulo}>Configurações</Text>
            <Text style={styles.cardDescricao}>
              Ajuste preferências e detalhes da sua conta
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
