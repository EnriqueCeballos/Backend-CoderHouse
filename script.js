class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    // RETOMA EL NOMBRE COMPLETO DEL USUARIO

    console.log(`Mi nombre es ${this.nombre + " " + this.apellido}`);
  }

  addMascota() {
    agregarMascota.mascota = "gato";
    console.log(agregarMascota);
  }
  countMascotas() {
    return console.log(this.mascotas.length);
  }
  addBook() {
    agregarLibro.libro = "Harry Potter 1";
    return console.log(agregarLibro);
  }

  getBooks() {
    console.log(`Mis libros son: ${this.libros}`);
  }
}

const datos1 = new Usuario("Enrique", "Ceballos", "Arsen Lupin", "Perro");
const agregarMascota = new Usuario();
const agregarLibro = new Usuario();

datos1.getFullName();
datos1.getBooks();
datos1.countMascotas();
datos1.addBook();

agregarMascota.addMascota();
