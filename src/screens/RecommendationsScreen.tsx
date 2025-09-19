import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function RecommendationsScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: isDark ? '#0D1117' : '#F3F4F6',
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
    },
    titulo: {
      fontSize: 26,
      fontWeight: '700',
      color: '#FF6F00',
      textAlign: 'center',
      marginBottom: 6,
    },
    subtitulo: {
      fontSize: 16,
      textAlign: 'center',
      color: isDark ? '#9CA3AF' : '#6B7280',
      marginBottom: 32,
    },
    card: {
      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 6,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardIcon: {
      marginRight: 12,
    },
    planoTitulo: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FF6F00',
      marginBottom: 8,
    },
    descricao: {
      fontSize: 14,
      color: isDark ? '#D1D5DB' : '#374151',
      marginBottom: 12,
    },
    lista: {
      fontSize: 14,
      color: isDark ? '#F3F4F6' : '#1F2937',
      marginBottom: 6,
      paddingLeft: 8,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Recomendações de Investimento</Text>
      <Text style={styles.subtitulo}>
        Com base no seu perfil de risco, separamos as melhores opções para você:
      </Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="rocket-outline" size={28} color="#003366" style={styles.cardIcon} />
          <Text style={styles.planoTitulo}>Plano A — Perfil Agressivo</Text>
        </View>
        <Text style={styles.descricao}>
          Ideal para quem busca altos retornos e está disposto a correr maiores riscos.
        </Text>
        <Text style={styles.lista}>• Ações de alto crescimento</Text>
        <Text style={styles.lista}>• Criptomoedas</Text>
        <Text style={styles.lista}>• ETFs de tecnologia</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="scale-outline" size={28} color="#003366" style={styles.cardIcon} />
          <Text style={styles.planoTitulo}>Plano B — Perfil Moderado</Text>
        </View>
        <Text style={styles.descricao}>
          Indicado para quem busca equilíbrio entre risco e segurança.
        </Text>
        <Text style={styles.lista}>• Fundos Imobiliários (FIIs)</Text>
        <Text style={styles.lista}>• Ações de empresas consolidadas</Text>
        <Text style={styles.lista}>• Fundos multimercado</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="shield-outline" size={28} color="#003366" style={styles.cardIcon} />
          <Text style={styles.planoTitulo}>Plano C — Perfil Conservador</Text>
        </View>
        <Text style={styles.descricao}>
          Para quem prefere segurança e previsibilidade nos investimentos.
        </Text>
        <Text style={styles.lista}>• Tesouro Direto</Text>
        <Text style={styles.lista}>• CDBs e LCIs</Text>
        <Text style={styles.lista}>• Fundos de renda fixa</Text>
      </View>
    </ScrollView>
  );
}