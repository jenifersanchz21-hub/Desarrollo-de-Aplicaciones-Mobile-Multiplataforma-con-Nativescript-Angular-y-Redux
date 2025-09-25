// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    // Ruta base que se usará para resolver todos los patrones (eg. files, exclude)
    basePath: '',
    
    // Frameworks de testing a usar
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    
    // Plugins necesarios
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'), // ← JUnit Reporter
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    
    // Configuración del cliente
    client: {
      jasmine: {
        // Opciones de configuración de Jasmine
        random: false, // Ejecutar tests en orden fijo
        failFast: false, // Detener en el primer error
        timeoutInterval: 10000 // Timeout por test (10 segundos)
      },
      clearContext: false // Mantener la salida de Jasmine en el navegador
    },
    
    // Reporters (formatos de salida)
    reporters: ['progress', 'kjhtml', 'junit', 'coverage'],
    
    // Configuración de JUnit Reporter
    junitReporter: {
      outputDir: 'reports/junit', // Directorio de salida
      outputFile: 'TESTS.xml', // Nombre del archivo
      suite: 'NativeScript App Tests', // Nombre del suite
      useBrowserName: false, // No incluir nombre del navegador
      nameFormatter: undefined, // Formateador personalizado de nombres
      classNameFormatter: undefined, // Formateador personalizado de clases
      properties: {}, // Propiedades adicionales para el XML
      xmlVersion: 1 // Versión del XML
    },
    
    // Configuración de Coverage Reporter
    coverageReporter: {
      dir: 'reports/coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80
        }
      }
    },
    
    // Archivos a incluir en las pruebas
    files: [
      // Archivos necesarios para el entorno de testing
    ],
    
    // Archivos a excluir
    exclude: [
    ],
    
    // Preprocesadores
    preprocessors: {
      // '**/*.js': ['coverage']
    },
    
    // Nivel de log
    logLevel: config.LOG_INFO,
    
    // Habilitar/deshabilitar colores en la salida
    colors: true,
    
    // Puerto del servidor web
    port: 9876,
    
    // Auto-watch: re-ejecutar tests cuando los archivos cambian
    autoWatch: true,
    
    // Navegadores a usar
    browsers: ['Chrome'],
    
    // Configuración específica de Chrome
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    
    // Ejecución única (útil para CI/CD)
    singleRun: false,
    
    // Número de reintentos para pruebas fallidas
    retryLimit: 0,
    
    // Concurrencia: cuántos navegadores abrir simultáneamente
    concurrency: Infinity,
    
    // Timeout para la captura del navegador (en ms)
    captureTimeout: 60000,
    
    // Configuración de proxies (si es necesario)
    proxies: {
    },
    
    // URL raíz para los archivos cargados por Karma
    urlRoot: '/',
    
    // Configuración de middleware
    middleware: [],

    // Configuración de listenAddress
    listenAddress: 'localhost',
    
    // Hostname permitidos
    hostname: 'localhost',
    
    // Configuración de upstreamProxy (si es necesario)
    upstreamProxy: undefined,
    
    // Configuración de reportSlowerThan
    reportSlowerThan: 5000, // Reportar tests más lentos de 5 segundos
    
    // Configuración de browserNoActivityTimeout
    browserNoActivityTimeout: 30000, // 30 segundos de inactividad
    
    // Configuración de browserDisconnectTimeout
    browserDisconnectTimeout: 10000, // 10 segundos para desconexión
    
    // Configuración de browserDisconnectTolerance
    browserDisconnectTolerance: 1, // Número de desconexiones toleradas
    
    // Configuración de processKillTimeout
    processKillTimeout: 5000, // 5 segundos para matar procesos
  });
};