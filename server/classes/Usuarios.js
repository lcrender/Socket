class Usuarios {
    constructor() {
        this.personas = [];
    }
    addPerson(id, nombre, sala){
        let persona = {
            id,
            nombre,
            sala
        };
        this.personas.push(persona);
        return this.personas;
    }
    getPerson(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }
    getPersons() {
        return this.personas;
    }
    getPersonsInRoom (sala) {
        let personsInRoom = this.personas.filter(persona => persona.sala === sala)
        return personsInRoom
    }
    deletePerson(id) {
        let personaBorrada = this.getPerson(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }
}
module.exports = {
    Usuarios
}