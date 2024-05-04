//express
const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion: 2020},
    {id: 2 , nombre: 'Exodo', autor: 'Moises', anioPublicacion: 2024},
    {id: 3 , nombre: 'Levitico', autor: 'Moises', anioPublicacion: 1990},
    {id: 4 , nombre: 'Mateo', autor: 'Mateo', anioPublicacion: 1980},
    {id: 5 , nombre: 'Marcos', autor: 'Marcos', anioPublicacion: 1995},
    {id: 6 , nombre: 'Juan', autor: 'Juan', anioPublicacion: 1978},
    {id: 7 , nombre: 'Salmos', autor: 'David', anioPublicacion: 1985},
];
//manejo de JSON
app.use(express.json());

// prueba de servidor corriendo
/*app.listen(PORT, () => {
    console.log("servidor corriendo en el puerto: " + PORT);
});*/

//endpoint 1 obtener todos los libros
app.use(express.json());

app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});

// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});

// endpoint 3 Agrear un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})

// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});

// endpoint 5 Eliminar Libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'se ha eliminado el libro'});
    console.log(lBiblico);
});

//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year =  parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados en ese anio'});
    }
});

// Practica 2 *************

// endpoint 7 Bienvenida
app.get('/bienvenida', (req, res) => {
    const nombre = "Ruben Flores Lima";
    const profesion = "Analisa de Sistemas";
    res.json('Mi Nombre es: ' + nombre + ' y mi profesion es: ' + profesion);
});

// endpoint 8 Obertener libros por autor
app.get('/libros/porautor/:autor', (req, res) => {
    const autor =  req.params.autor;
    const librosporautor = librosBiblicos.filter( libro => libro.autor === autor);
    //res.json(librosporautor);
    if (librosporautor.length > 0) {
        res.json(librosporautor);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros del autor: ' + autor});
    }
});

// endpoint 9 Cantidad de libros
app.get('/totallibros', (req, res) => {
    const totalLibros = librosBiblicos.length;
    res.send(`El total de libros es: ${totalLibros}`);
});

// endpoint 10 Obertener libros por nombre
app.get('/libros/pornombre/:nombre', (req, res) => {
    const nombre =  req.params.nombre;
    const libropornombre = librosBiblicos.filter( libro => libro.nombre === nombre);
    //res.json(librosporautor);
    if (libropornombre.length > 0) {
        res.json(libropornombre);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros con el nombre: ' + nombre});
    }
});

// endpoint 11 Ordenar los libros por nombre
app.get('/libros/sort/nombre', (req, res) => {
    const librosOrdenados = librosBiblicos.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
    res.json(librosOrdenados);
});




app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});
