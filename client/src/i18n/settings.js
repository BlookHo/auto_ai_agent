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
        modal: {
          title: 'Select AI Model',
          description: 'Choose your preferred AI model for vehicle diagnostics',
          searchPlaceholder: 'Search models...',
          noResults: 'No models found',
          select: 'Select',
          cancel: 'Cancel',
          modelDetails: 'Model Details',
          capabilities: 'Capabilities',
          contextWindow: 'Context Window',
          tokens: 'tokens',
          lastUpdated: 'Last Updated',
          provider: 'Provider',
          version: 'Version',
          capabilitiesList: {
            text: 'Text Generation',
            code: 'Code Generation',
            vision: 'Vision',
            tools: 'Tool Use',
            json: 'JSON Mode',
            functionCalling: 'Function Calling'
          },
          status: {
            available: 'Available',
            beta: 'Beta',
            experimental: 'Experimental',
            deprecated: 'Deprecated'
          },
          pricing: {
            title: 'Pricing',
            input: 'Input',
            output: 'Output',
            perMillionTokens: '/M tokens'
          },
          requirements: 'Requirements',
          apiKeyRequired: 'API key required',
          subscriptionRequired: 'Subscription required',
          freeTierAvailable: 'Free tier available',
          rateLimited: 'Rate limited',
          communityAccess: 'Community access',
          enterpriseOnly: 'Enterprise only'
        },
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
  ru: {
    settings: {
      title: 'Настройки',
      comingSoon: 'Скоро будет...',
      tabs: {
        llm: 'Настройки ИИ',
        profile: 'Профиль',
        notifications: 'Уведомления'
      },
      llm: {
        title: 'Настройки модели ИИ',
        description: 'Настройте предпочитаемую модель ИИ и параметры для диагностики автомобилей.',
        provider: 'Провайдер ИИ',
        model: 'Модель',
        apiKey: 'API ключ',
        apiKeyHelper: 'Ваш API ключ хранится безопасно и никогда не покидает ваш браузер.',
        apiKeyRequiredForModels: 'Пожалуйста, введите ваш API ключ, чтобы увидеть доступные модели',
        failedToLoadModels: 'Не удалось загрузить модели. Пожалуйста, проверьте ваш API ключ и попробуйте снова.',
        noModelsAvailable: 'Нет доступных моделей',
        temperature: 'Температура',
        temperatureHelper: 'Более высокие значения делают вывод более случайным, а более низкие — более сфокусированным и детерминированным (0-2).',
        saveSuccess: 'Настройки успешно сохранены',
        saveError: 'Не удалось сохранить настройки',
        modelLoading: 'Загрузка моделей...',
        selectModel: 'Выберите модель',
        customModel: 'Пользовательская модель',
        customModelHelper: 'Введите ID пользовательской модели, если её нет в списке выше',
        modelFeatures: 'Возможности модели:',
        maxTokens: 'Макс. токенов:',
        contextWindow: 'Окно контекста:',
        lastUpdated: 'Последнее обновление:',
        rateLimit: 'Лимит запросов:',
        modal: {
          title: 'Выбор модели ИИ',
          description: 'Выберите предпочитаемую модель ИИ для диагностики автомобилей',
          searchPlaceholder: 'Поиск моделей...',
          noResults: 'Модели не найдены',
          select: 'Выбрать',
          cancel: 'Отмена',
          modelDetails: 'Детали модели',
          capabilities: 'Возможности',
          contextWindow: 'Окно контекста',
          tokens: 'токенов',
          lastUpdated: 'Последнее обновление',
          provider: 'Провайдер',
          version: 'Версия',
          capabilitiesList: {
            text: 'Генерация текста',
            code: 'Генерация кода',
            vision: 'Обработка изображений',
            tools: 'Работа с инструментами',
            json: 'Режим JSON',
            functionCalling: 'Вызов функций'
          },
          status: {
            available: 'Доступно',
            beta: 'Бета',
            experimental: 'Экспериментально',
            deprecated: 'Устарело'
          },
          pricing: {
            title: 'Цены',
            input: 'Ввод',
            output: 'Вывод',
            perMillionTokens: '/М токенов'
          },
          requirements: 'Требования',
          apiKeyRequired: 'Требуется API ключ',
          subscriptionRequired: 'Требуется подписка',
          freeTierAvailable: 'Доступен бесплатный тариф',
          rateLimited: 'Ограничение запросов',
          communityAccess: 'Доступно сообществу',
          enterpriseOnly: 'Только для предприятий'
        }
      },
      profile: {
        title: 'Настройки профиля'
      },
      notifications: {
        title: 'Настройки уведомлений'
      }
    }
  },
  de: {
    settings: {
      title: 'Einstellungen',
      comingSoon: 'In Kürze verfügbar...',
      tabs: {
        llm: 'KI-Einstellungen',
        profile: 'Profil',
        notifications: 'Benachrichtigungen'
      },
      llm: {
        title: 'KI-Modell Einstellungen',
        description: 'Konfigurieren Sie Ihr bevorzugtes KI-Modell und die Einstellungen für die Fahrzeugdiagnose.',
        provider: 'KI-Anbieter',
        model: 'Modell',
        apiKey: 'API-Schlüssel',
        apiKeyHelper: 'Ihr API-Schlüssel wird sicher gespeichert und verlässt niemals Ihren Browser.',
        apiKeyRequiredForModels: 'Bitte geben Sie Ihren API-Schlüssel ein, um verfügbare Modelle zu sehen',
        failedToLoadModels: 'Laden der Modelle fehlgeschlagen. Bitte überprüfen Sie Ihren API-Schlüssel und versuchen Sie es erneut.',
        noModelsAvailable: 'Keine Modelle verfügbar',
        temperature: 'Temperatur',
        temperatureHelper: 'Höhere Werte machen die Ausgabe zufälliger, während niedrigere Werte sie fokussierter und deterministischer machen (0-2).',
        saveSuccess: 'Einstellungen erfolgreich gespeichert',
        saveError: 'Fehler beim Speichern der Einstellungen',
        modelLoading: 'Lade Modelle...',
        selectModel: 'Modell auswählen',
        customModel: 'Benutzerdefinierte Modell-ID',
        customModelHelper: 'Geben Sie eine benutzerdefinierte Modell-ID ein, falls nicht oben aufgeführt',
        modelFeatures: 'Modellfunktionen:',
        maxTokens: 'Max. Token:',
        contextWindow: 'Kontextfenster:',
        lastUpdated: 'Zuletzt aktualisiert:',
        rateLimit: 'Anfragelimit:',
        modal: {
          title: 'KI-Modell auswählen',
          description: 'Wählen Sie Ihr bevorzugtes KI-Modell für die Fahrzeugdiagnose',
          searchPlaceholder: 'Modelle durchsuchen...',
          noResults: 'Keine Modelle gefunden',
          select: 'Auswählen',
          cancel: 'Abbrechen',
          modelDetails: 'Modell-Details',
          capabilities: 'Funktionen',
          contextWindow: 'Kontextfenster',
          tokens: 'Token',
          lastUpdated: 'Zuletzt aktualisiert',
          provider: 'Anbieter',
          version: 'Version',
          capabilitiesList: {
            text: 'Textgenerierung',
            code: 'Codegenerierung',
            vision: 'Bildverarbeitung',
            tools: 'Werkzeugnutzung',
            json: 'JSON-Modus',
            functionCalling: 'Funktionsaufrufe'
          },
          status: {
            available: 'Verfügbar',
            beta: 'Beta',
            experimental: 'Experimentell',
            deprecated: 'Veraltet'
          },
          pricing: {
            title: 'Preise',
            input: 'Eingabe',
            output: 'Ausgabe',
            perMillionTokens: '/Mio. Token'
          },
          requirements: 'Anforderungen',
          apiKeyRequired: 'API-Schlüssel erforderlich',
          subscriptionRequired: 'Abonnement erforderlich',
          freeTierAvailable: 'Kostenloser Tarif verfügbar',
          rateLimited: 'Anfragebeschränkung',
          communityAccess: 'Community-Zugriff',
          enterpriseOnly: 'Nur für Unternehmen'
        }
      },
      profile: {
        title: 'Profileinstellungen'
      },
      notifications: {
        title: 'Benachrichtigungseinstellungen'
      }
    }
  },
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
