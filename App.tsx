// App.tsx
import { LogBox } from 'react-native';
// ignora apenas esse warning específico
LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component.']);

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
