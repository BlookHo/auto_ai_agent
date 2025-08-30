export const settingsTranslations = {
  en: {
    settings: {
      title: 'Settings',
      comingSoon: 'Coming soon...',
      tabs: {
        llm: 'AI Settings',
        profile: 'Profile',
        notifications: 'Notifications'
      },
      llm: {
        title: 'AI Model Settings',
        description: 'Configure your preferred AI model and settings for vehicle diagnostics.',
        provider: 'AI Provider',
        model: 'Model',
        apiKey: 'API Key',
        apiKeyHelper: 'Your API key is stored securely and never leaves your browser.',
        temperature: 'Temperature',
        temperatureHelper: 'Higher values make the output more random, while lower values make it more focused and deterministic.',
        saveSuccess: 'Settings saved successfully',
        saveError: 'Failed to save settings'
      },
      profile: {
        title: 'Profile Settings'
      },
      notifications: {
        title: 'Notification Settings'
      }
    }
  },
  // Add other languages as needed
  es: {
    settings: {
      title: 'Configuración',
      comingSoon: 'Próximamente...',
      tabs: {
        llm: 'Configuración de IA',
        profile: 'Perfil',
        notifications: 'Notificaciones'
      },
      llm: {
        title: 'Configuración del modelo de IA',
        description: 'Configure su modelo de IA preferido y la configuración para diagnósticos de vehículos.',
        provider: 'Proveedor de IA',
        model: 'Modelo',
        apiKey: 'Clave API',
        apiKeyHelper: 'Su clave API se almacena de forma segura y nunca abandona su navegador.',
        temperature: 'Temperatura',
        temperatureHelper: 'Valores más altos hacen que la salida sea más aleatoria, mientras que valores más bajos la hacen más enfocada y determinista.',
        saveSuccess: 'Configuración guardada correctamente',
        saveError: 'Error al guardar la configuración'
      }
    }
  }
};

export default settingsTranslations;
