export class Nation {
    constructor(nation, background) {
        // PASSED VARIABLES
        this.nation     = nation;
        this.background = background;

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

    getBackground() {
        return this.background;
    }
}