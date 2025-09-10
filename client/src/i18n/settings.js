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
        apiKeyRequiredForModels: 'Please enter your API key to see available models',
        failedToLoadModels: 'Failed to load models. Please check your API key and try again.',
        noModelsAvailable: 'No models available',
        temperature: 'Temperature',
        temperatureHelper: 'Higher values make the output more random, while lower values make it more focused and deterministic (0-2).',
        saveSuccess: 'Settings saved successfully',
        saveError: 'Failed to save settings',
        modelLoading: 'Loading models...',
        selectModel: 'Select a model',
        customModel: 'Custom model ID',
        customModelHelper: 'Enter a custom model ID if not listed above',
        modelFeatures: 'Model Features:',
        maxTokens: 'Max tokens:',
        contextWindow: 'Context window:',
        lastUpdated: 'Last updated:',
        rateLimit: 'Rate limit:'
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
        apiKeyRequiredForModels: 'Ingrese su clave API para ver los modelos disponibles',
        failedToLoadModels: 'Error al cargar los modelos. Verifique su clave API e intente nuevamente.',
        noModelsAvailable: 'No hay modelos disponibles',
        temperature: 'Temperatura',
        temperatureHelper: 'Valores más altos hacen que la salida sea más aleatoria, mientras que valores más bajos la hacen más enfocada y determinista (0-2).',
        saveSuccess: 'Configuración guardada correctamente',
        saveError: 'Error al guardar la configuración',
        modelLoading: 'Cargando modelos...',
        selectModel: 'Seleccionar un modelo',
        customModel: 'ID de modelo personalizado',
        customModelHelper: 'Ingrese un ID de modelo personalizado si no aparece en la lista',
        modelFeatures: 'Características del modelo:',
        maxTokens: 'Tokens máx:',
        contextWindow: 'Ventana de contexto:',
        lastUpdated: 'Última actualización:',
        rateLimit: 'Límite de tasa:'
      }
    }
  }
};

export default settingsTranslations;
