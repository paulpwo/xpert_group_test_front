# Docker Setup for XpertGroupFront

## Quick Commands

### Compilar
```bash
docker build -t xpert-group-front .
```

### Ejecutar
```bash
docker run -p 8080:80 xpert-group-front
```

### Ejecutar en segundo plano
```bash
docker run -d -p 8080:80 --name xpert-group-front xpert-group-front
```

### Detener
```bash
docker stop xpert-group-front
```

La aplicación estará disponible en `http://localhost:8080` 