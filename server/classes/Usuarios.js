class Usuarios {
    constructor() {
        this.personas = [];
    }
    addPerson(id, nombre){
        let persona = {
            id,
            nombre
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