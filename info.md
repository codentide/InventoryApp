# Información para realizar la evaluación 3 de desarrollo de software seguro

## Enunciado 
- La IUD necesita una aplicación web para registrar distintos 
equipos de cómputo (computadores, mouses, teclados, entre otros)

## Módulos 

### Usuario
- Usuario que ocupará los equipos

#### Información requerida
- Nombre
- Email (Único)     
- Constraseña
- Rol (Administrador, Docente)
    - Docente no podrá editar los registros, solamente visualizar los equipos en inventario y adquirirlos
- Estado (Activo, Inactivo)
- Fecha creación 
- Fecha actualización 

### Tipo de Equipo
- Tipo del equipo solicitado (cómputo, móvil) 

#### Información requerida
- Nombre
- Estado (Activo, Inactivo)
- Fecha creación 
- Fecha actualización 

### Estado de Equipo 
- Estado actual del equipo en cuestión (en uso, en bodega, despreciado, entre otros)

#### Información requerida
- Nombre
- Estado (Activo, Inactivo)
- Fecha creación 
- Fecha actualización 

### Marca
- Las distintas marcas a las cuales pueden pertenecer los equipos 

#### Información requerida
- Nombre
- Estado (Activo, Inactivo)
- Fecha creación 
- Fecha actualización 

### Inventario 
- 

#### Información requerida
- Serial (único)
- Modelo (único)
- Descripción
- Foto del equipo (url)
- Color
- Fecha de compra
- Precio 
- Usuario a cargo (Solo usuarios activos) 
- Marca (Solo marcas activas)
- Estado del equipo (Solo estados definidos en el módulo de estados)
- Tipo de equipo (Solo los tipos disponibles en el módulo de tipos de equipo)
- Fecha creación 
- Fecha actualización 