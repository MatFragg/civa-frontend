# 🚌 Sistema de Gestión de Flota de Buses CIVA - Frontend

Una aplicación web moderna desarrollada con React, TypeScript y Vite para la gestión de flotas de buses de CIVA Transportation. Este proyecto forma parte de la evaluación técnica y demuestra la implementación de arquitecturas limpias y patrones de diseño avanzados.

## 📋 Tabla de Contenidos

- [Características Principales](#características-principales)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Patrones de Diseño](#patrones-de-diseño)
- [Tecnologías y Bibliotecas](#tecnologías-y-bibliotecas)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Documentación TSDoc](#documentación-tsdoc)

## ✨ Características Principales

- **Gestión de Flota**: Visualización completa de buses con información detallada
- **Paginación Avanzada**: Sistema de paginación con elipsis y navegación inteligente
- **Estados de Carga**: Manejo elegante de estados de carga y error
- **Estadísticas en Tiempo Real**: Tarjetas de estadísticas con métricas de flota
- **Diseño Responsivo**: Adaptable a dispositivos móviles y desktop
- **Arquitectura Limpia**: Implementación de Domain-Driven Design (DDD)
- **Type Safety**: Completamente tipado con TypeScript

## 🏗️ Arquitectura del Proyecto

### Arquitectura Limpia N-Tier

El proyecto implementa una arquitectura limpia organizada en capas (N-tier) que garantiza la separación de responsabilidades y facilita el mantenimiento del código:

```
src/
├── domain/           # Entidades de negocio y modelos
│   ├── model/       # Interfaces y tipos de dominio
│   └── hooks/       # Hooks personalizados de React
├── application/     # Lógica de aplicación y servicios
│   └── service/     # Servicios de negocio
├── infrastructure/ # Adaptadores y acceso a datos externos
│   └── api/        # Clientes HTTP y transformadores de datos
├── ui/             # Capa de presentación (componentes UI)
│   ├── components/ # Componentes React reutilizables
│   └── pages/      # Páginas principales de la aplicación
├── public/         # Componentes públicos y layout general
│   └── components/ # Header, Footer, Logo
└── shared/         # Utilidades y servicios compartidos
    └── services/   # Servicios transversales
```

### Separación de Responsabilidades por Capas

- **Domain**: Contiene las entidades de negocio, modelos de datos y hooks personalizados
- **Application**: Encapsula la lógica de aplicación y orquesta los casos de uso
- **Infrastructure**: Maneja la comunicación con APIs externas y transformación de datos
- **Interfaces**: Capa de presentación con componentes React y páginas específicas del negocio
- **Public**: Componentes de layout general y elementos públicos (Header, Footer, Logo)
- **Shared**: Servicios y utilidades compartidas entre todas las capas

## 🎨 Patrones de Diseño

### 1. **Repository Pattern**
Implementado en `BusApi` para abstraer el acceso a datos:
```typescript
export class BusApi {
  async getAllBuses(): Promise<BusResource[]>
  async getPaginatedBuses(page: number, size: number): Promise<PaginatedBusResponse>
  async getBusById(id: number): Promise<BusResource>
}
```

### 2. **Assembler Pattern**
`BusAssembler` transforma datos entre capas:
```typescript
export class BusAssembler {
  static toEntityFromResource(resource: BusResource): Bus
  static toPaginatedResult(response: PaginatedBusResponse)
}
```

### 3. **Service Layer Pattern**
`busService` encapsula la lógica de negocio:
```typescript
export const busService = {
  async getAll(): Promise<Bus[]>
  async getPaginated(page: number, size: number): Promise<PaginatedBusResult>
  async getById(id: number): Promise<Bus>
}
```

### 4. **Custom Hooks Pattern**
`useBuses` encapsula lógica de estado y efectos:
```typescript
export const useBuses = (page: number = 0) => {
  // Lógica de estado y efectos secundarios
  return { buses, loading, error, refetch, pagination }
}
```

### 5. **Atomic Design**
Componentes organizados por complejidad:
- **Atoms**: `StatCard`, `Icons`
- **Molecules**: `StatsCards`, `ErrorPanel`, `BusPageHeader`
- **Organisms**: `BusTable`, `Pagination`
- **Pages**: `BusPage`

### 6. **HTTP Client Pattern**
Cliente HTTP genérico con manejo de errores:
```typescript
export const httpClient = {
  get: <T>(url: string, init?: RequestInit) => request<T>(url, { ...init, method: "GET" }),
  post: <T, B = unknown>(url: string, body?: B, init?: RequestInit) => request<T>(url, { ...init, method: "POST", jsonBody: body }),
  // ... otros métodos
}
```

## 🛠️ Tecnologías y Bibliotecas

### Core Technologies
- **React 19.1.1**: Biblioteca de interfaz de usuario
- **TypeScript 5.8.3**: Superset tipado de JavaScript
- **Vite 7.1.6**: Build tool y servidor de desarrollo

### Styling & UI
- **Tailwind CSS 4.0.0**: Framework de CSS utilitario

### Development Tools
- **ESLint 9.35.0**: Linter para análisis estático de código
- **TypeScript ESLint 8.43.0**: Reglas de ESLint específicas para TypeScript
- **React Hooks ESLint Plugin**: Reglas para hooks de React

### Build & Bundling
- **@vitejs/plugin-react 5.0.2**: Plugin de Vite para React
- **@tailwindcss/vite 4.1.13**: Plugin de Vite para Tailwind CSS

## 📁 Estructura de Carpetas

```
src/
├── application/
│   └── service/
│       └── bus-service.ts          # Servicios de aplicación
├── domain/
│   ├── hooks/
│   │   └── useBuses.ts             # Hook personalizado para buses
│   └── model/
│       ├── bus.ts                  # Entidad Bus
│       └── busBrand.ts             # Entidad BusBrand
├── infrastructure/
│   └── api/
│       ├── assembler/
│       │   └── bus-assembler.ts    # Transformador de datos
│       ├── responses/
│       │   └── buses-responses.ts  # Interfaces de respuesta
│       └── bus-api.ts              # Cliente API
├── interfaces/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Icons.tsx           # Iconos SVG
│   │   │   └── StatCard.tsx        # Tarjeta de estadística
│   │   ├── molecules/
│   │   │   ├── BusPageHeader.tsx   # Encabezado de página
│   │   │   ├── ErrorPanel.tsx      # Panel de error
│   │   │   └── StatsCards.tsx      # Colección de tarjetas
│   │   └── organisms/
│   │       ├── BusTable.tsx        # Tabla de buses
│   │       └── Pagination.tsx      # Componente de paginación
│   └── pages/
│       └── BusPage.tsx             # Página principal
├── public/
│   └── components/
│       ├── Footer.tsx              # Pie de página
│       ├── Header.tsx              # Encabezado
│       └── Logo.tsx                # Componente de logo
└── shared/
    └── services/
        └── fetchHttpClient.ts      # Cliente HTTP genérico
    ├── components/
    │   ├── atoms/
    │   │   ├── Icons.tsx           # Iconos SVG
    │   │   └── StatCard.tsx        # Tarjeta de estadística
    │   ├── molecules/
    │   │   ├── BusPageHeader.tsx   # Encabezado de página
    │   │   ├── ErrorPanel.tsx      # Panel de error
    │   │   └── StatsCards.tsx      # Colección de tarjetas
    │   └── organisms/
    │       ├── BusTable.tsx        # Tabla de buses
    │       └── Pagination.tsx      # Componente de paginación
    └── pages/
        └── BusPage.tsx             # Página principal
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio del frontend
cd frontend-client/bus-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

### Variables de Entorno
```env
VITE_API_BASE_URL=http://localhost:8091
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con HMR

# Construcción
npm run build        # Construye la aplicación para producción

# Linting
npm run lint         # Ejecuta ESLint para análisis de código

# Vista previa
npm run preview      # Previsualiza la construcción de producción
```

## 📚 Documentación TSDoc

Todo el código está completamente documentado con TSDoc incluyendo:

- **Interfaces y tipos**: Documentación completa de todas las propiedades
- **Funciones y métodos**: Parámetros, valores de retorno y excepciones
- **Componentes React**: Props, funcionalidad y uso
- **Hooks personalizados**: Estados, efectos y valores retornados
- **Servicios**: Métodos, errores y casos de uso

### Ejemplo de Documentación:
```typescript
/**
 * Custom React hook for managing bus data with pagination support.
 * Provides loading states, error handling, and automatic data fetching.
 * 
 * @param page - The initial page number to load (0-based, defaults to 0)
 * @returns Object containing buses data, loading state, error state, refetch function, and pagination metadata
 */
export const useBuses = (page: number = 0) => {
  // Implementación...
}
```

## 🏆 Características Técnicas Destacadas

- **Type Safety Completo**: Sin uso de `any`, interfaces bien definidas
- **Error Handling**: Manejo robusto de errores en todas las capas
- **Loading States**: Estados de carga elegantes y consistentes
- **Responsive Design**: Adaptable desde móviles hasta desktop
- **Clean Architecture**: Separación clara de responsabilidades
- **Performance**: Optimizaciones de rendering y carga de datos
- **Accessibility**: Componentes con soporte para lectores de pantalla
- **Testing Ready**: Estructura preparada para pruebas unitarias

---

## 👨‍💻 Desarrollado por

**Ethan Aliaga**  
📧 ethan.aliaga@gmail.com  
📱 +51 980 805 285  
📍 Lima, Perú

---

*Proyecto desarrollado como parte de la evaluación técnica para CIVA Transportation - 2025*
