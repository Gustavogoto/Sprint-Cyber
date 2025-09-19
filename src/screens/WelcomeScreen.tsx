import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Marca no topo esquerdo */}
      <View style={styles.brandHeader}>
        <Ionicons name="logo-usd" size={28} color="#111" style={styles.brandIcon} />
        <Text style={styles.brandText}>$MART INVEST</Text>
      </View>

      {/* Parte superior - Laranja Itaú */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Plante suas moedas e colha sua fortuna.</Text>
      </View>

      {/* Parte inferior - Azul escuro Itaú */}
      <View style={styles.bottomSection}>
        <View style={styles.subtitleBox}>
          <Text style={styles.subtitle}>Simplifique sua vida financeira de uma maneira fácil.</Text>
        </View>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.btnSecundario}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.btnSecundarioTexto}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnPrincipal}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.btnPrincipalTexto}>Fazer cadastro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  brandIcon: {
    marginRight: 8,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  topSection: {
    flex: 1,
    backgroundColor: '#FF6F00',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: '800',
    color: '#111',
    textAlign: 'left',
    lineHeight: 54,
  },
  subtitleBox: {
    marginTop: 30,
    marginBottom: 24,
    marginRight: 4,
    
  },
  subtitle: {
    fontSize: 28,
    color: '#111',
    fontWeight: '800',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 0,
    lineHeight: 32,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
    marginBottom: 90,
  },
  btnPrincipal: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: 'center',
  },
  btnPrincipalTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  btnSecundario: {
    flex: 1,
    backgroundColor: '#FF6F00',
    paddingVertical: 14,
    borderRadius: 10,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  btnSecundarioTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});