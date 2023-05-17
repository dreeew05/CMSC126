export class Nation {
    constructor(nation) {
        // PASSED VARIABLES
        this.nation = nation;

        // GLOBAL VARIABLES
        this.characters = [];
    }

    getNation() {
        return this.nation;
    }

    getCharacters() {
        return this.characters;
    }

    addCharacterToNation(character) {
        this.getCharacters().push(character);
    }
}