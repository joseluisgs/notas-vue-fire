import Service from './Service';

// Recurso a consumir
const Storage = Service.storage.ref(); // Creamos una refrenecia al nuestro sistema de almacenamiento

// Operaciones
export default {
  // sube un fichero
  async post(file) {
    // Creamos el nombre del fichero
    let fileName = file.name.replace(/\s/g, ''); // Si tienes espacios en blanco se los quitamos
    const fileExt = fileName.split('.').pop(); // Nos quedamos con su extension
    fileName = `${Date.now()}.${fileExt}`; // this.getStorageName(file);
    // subimos el fichero
    await Storage.child(fileName).put(file);
    // Tomamos los metadatos y la url
    // Serían los metadato del fichero segun Google Firebase
    // Ponemos los metadatos que queremos para no volcar los de google
    const metadata = await Storage.child(fileName).getMetadata();
    const url = await Storage.child(fileName).getDownloadURL();
    const fichero = {
      id: metadata.name,
      name: metadata.name,
      url,
      contentType: metadata.contentType,
      size: metadata.size,
      md5Hash: metadata.md5Hash,
      timeCreated: metadata.timeCreated,
      updated: metadata.updated,
    };
    return fichero;
  },
  // Elimina un fichero asociado
  delete(id) {
    return Storage.child(id).delete();
  },
};
