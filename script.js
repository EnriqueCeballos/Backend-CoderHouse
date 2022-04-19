class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }

  getFullName() {
    // RETOMA EL NOMBRE COMPLETO DEL USUARIO
    return `Mi nombre es ${this.nombre + " " + this.apellido}`;
  }

  addMascota(Mascota) {
    this.mascotas.push(Mascota);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    let libro = {
      titulo: nombre,
      autor: autor,
    };
    this.libros.push(libro);
  }

  getBooksNames() {
    return this.libros.map((libro) => libro.titulo);
  }
}

const datos1 = new Usuario("Enrique", "Ceballos");

console.log(datos1);

console.log(datos1.getFullName());

datos1.addMascota("gato");
datos1.addMascota("perro");
console.log(datos1.countMascotas());

datos1.addBook("libro1", "autor1");
datos1.addBook("libro2", "autor2");
console.log(datos1.getBookNames());
