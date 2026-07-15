# Sistema de Gestión de Recursos Tecnológicos

Aplicación SPA desarrollada con **React** y **Next.js** para administrar los
recursos tecnológicos de un laboratorio (notebooks, routers, switches, access
points, impresoras 3D, sensores IoT, kits Arduino, cámaras, herramientas de
red, materiales e insumos), reemplazando el registro manual actual.

## Integrantes

- Bastian Vargas Vasquez

## Objetivo

Gestionar recursos tecnológicos mediante operaciones CRUD (crear, listar,
editar, eliminar) usando **Local Storage** como almacenamiento principal,
**Session Storage** para datos temporales de sesión (filtros/búsqueda) y
**Cookies** para una preferencia simple del usuario (modo claro/oscuro).

## Tecnologías utilizadas

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Local Storage, Session Storage y Cookies (API nativas del navegador)

## Instalación y ejecución

```bash
## Clona el repositorio de github a tu computador
git clone URL_DEL_REPOSITORIO

## Ingresa a la carpeta del proyecto
cd lab-resources

## Instala todas las dependencias del proyecto definidas en package.json
## Este comando descarga las librerias necesarias y crea las carpetas node_modules
npm install

## Inicializa el servidor del desarrollo para ejecutar la app localmente
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

Para una build de producción:

```bash
npm run build
npm run start
```

## Estructura de carpetas

```
src/
├── app/
│   ├── page.tsx        # Página principal: conecta hooks, estado y componentes
│   ├── layout.tsx       # Layout raíz de la aplicación
│   └── globals.css      # Estilos globales (Tailwind)
├── components/           # Componentes de interfaz, reutilizables y con una sola responsabilidad
├── hooks/                # Hooks personalizados para cada mecanismo de almacenamiento
├── types/                # Definición de tipos TypeScript (modelo Resource)
└── utils/                # Validaciones de formulario y utilidades (generación de ID, fechas)
```

## Componentes principales

| Componente | Responsabilidad |
|---|---|
| `Header` | Título de la app y acceso al `ThemeToggle`. |
| `ThemeToggle` | Alterna modo claro/oscuro y dispara el guardado en cookie. |
| `ResourceForm` | Registra y edita recursos; ejecuta las validaciones del formulario. |
| `ResourceList` | Renderiza la grilla de `ResourceCard` según el listado filtrado. |
| `ResourceCard` | Muestra un recurso individual, sus acciones (editar/eliminar) y la "Sugerencia IA". |
| `SearchBar` | Input de búsqueda por nombre, sincronizado con Session Storage. |
| `FilterCategory` | Selector de categoría para filtrar el listado, sincronizado con Session Storage. |
| `ConfirmDeleteModal` | Modal de confirmación antes de eliminar un recurso. |

## Hooks utilizados

- **`useState`**: estado local de formularios, modales y edición en curso.
- **`useEffect`**: sincroniza el estado de los hooks personalizados con el
  almacenamiento del navegador cada vez que cambian.
- **`useMemo`**: calcula categorías disponibles y el listado filtrado sin
  recalcular en cada render.
- **`useLocalStorage(key, initialValue)`** *(personalizado)*: persiste y
  recupera cualquier valor serializable en Local Storage. Usado para la lista
  de recursos (`lab_resources`).
- **`useSessionStorage(key, initialValue)`** *(personalizado)*: igual que el
  anterior, pero usando Session Storage. Usado para los filtros temporales de
  sesión (`lab_resource_filter`).
- **`useCookie(name, initialValue)`** *(personalizado)*: lee y escribe una
  cookie simple (`lab_theme`) para la preferencia visual del usuario.

Todos los hooks personalizados están marcados con `"use client"` porque
acceden a APIs del navegador (`window`, `document`), que no existen durante
el renderizado en el servidor.

## Persistencia de datos

| Mecanismo | Clave | Contenido |
|---|---|---|
| Local Storage | `lab_resources` | Arreglo completo de recursos tecnológicos (la fuente de verdad del CRUD). |
| Session Storage | `lab_resource_filter` | Texto de búsqueda actual y categoría seleccionada para filtrar. Se pierde al cerrar la pestaña. |
| Cookie | `lab_theme` | Preferencia de tema (`light` / `dark`). No contiene datos sensibles. |

No se almacena en ningún mecanismo del navegador contraseñas, tokens ni
información personal sensible, conforme a las condiciones de la evaluación.

## Validaciones

El formulario (`ResourceForm` + `utils/validations.ts`) valida:

- **Nombre**: obligatorio, mínimo 3 caracteres.
- **Categoría**: obligatoria.
- **Cantidad**: obligatoria, numérica, entera y mayor a 0.
- **Estado**: obligatorio (Disponible / En uso / En mantención).
- **Ubicación**: obligatoria.
- **Responsable** y **Descripción**: opcionales.

Los errores se muestran debajo de cada campo y el formulario no se envía
mientras existan errores de validación.

## Uso de inteligencia artificial

Se utilizó **Claude (Anthropic)** como apoyo durante el desarrollo para:

- Generar la estructura inicial de componentes, hooks y tipos.
- Redactar las validaciones del formulario.
- Implementar la función simulada "Sugerencia IA" dentro de `ResourceCard`
  (reglas locales según la categoría del recurso; no consume ninguna API
  externa de IA).
- Verificar que el proyecto compilara y funcionara correctamente antes de la
  entrega.

El equipo debe revisar, comprender y poder explicar cada parte del código
entregado.

## Capturas de pantalla

_Agregar aquí capturas del CRUD funcionando (listado, formulario, modo
oscuro, eliminación, etc.)._

## Conclusión

_(Agregar aquí la reflexión técnica del equipo sobre lo aprendido: manejo de
Local Storage/Session Storage/Cookies, hooks personalizados, organización en
componentes, etc.)_
