import { Nation } from "./Nation.js";
import { GenerateCharacters } from "./GenerateCharacters.js";
import { CreateElement } from "./CreateElement.js";

class ParseAPI {
    constructor() {
        //  CONSTANT VARIABLES
        const mondstadtBG = "/assets/mondstadt_bg.jpg",
              liyueBG     = "/assets/liyue_bg.jpg",
              inazumaBG   = "/assets/inazuma_bg.jpg",
              sumeruBG    = "/assets/sumeru_bg.jpg",
              outlanderBG = "/assets/outlander_bg.jpg",
              unknownBG   = "/assets/dragonspine_bg.jpg";

        // GLOBAL VARIABLES
        this.mondstadt = new Nation("Mondstadt", mondstadtBG);
        this.liyue     = new Nation("Liyue", liyueBG);
        this.inazuma   = new Nation("Inazuma", inazumaBG);
        this.sumeru    = new Nation("Sumeru", sumeruBG);
        this.outlander = new Nation("Outlander", outlanderBG);
        this.unknown   = new Nation("Unknown", unknownBG);
    }

    async fetchResponse(link) {
        let response     = await fetch(link),
            responseText = await response.text(),
            fileJSON     = JSON.parse(responseText);
        
        return fileJSON;
    }

    async getAllCharacters() {

        const link = "https://api.genshin.dev/characters";

        let characterResponse = await this.fetchResponse(link);

        for(let i = 0; i < characterResponse.length; i++) {
            await this.getCharacter(link, characterResponse[i]);
        }
    }

    async getCharacter(link, character) {
        link = link.concat("/".concat(character));
        let characterDetails = await this.fetchResponse(link);
        this.putCharacterToNation(link, character, characterDetails);
    }

    async putCharacterToNation(link, character, charJSON) {
        let imageIcon       = link.concat("/".concat("icon-big"));

        const elementIcon = "https://api.genshin.dev/elements/"
                            .concat(charJSON.vision.toLowerCase())
                            .concat("/icon");

        const characterObject = {
            key : character,
            name : charJSON.name,
            vision : elementIcon,
            title : charJSON.title,
            skills : charJSON.skillTalents,
            rarity : charJSON.rarity,
            icon : imageIcon
        }

        switch(charJSON.nation) {
            case "Mondstadt":
                this.mondstadt.addCharacterToNation(characterObject);
                break;
            case "Liyue":
                this.liyue.addCharacterToNation(characterObject);
                break;
            case "Inazuma":
                this.inazuma.addCharacterToNation(characterObject);
                break;
            case "Sumeru":
                this.sumeru.addCharacterToNation(characterObject);
                break;
            case "Outlander":
                characterObject.icon = link.concat("/"
                                       .concat("icon-big-aether"));
                this.outlander.addCharacterToNation(characterObject);
                break;
            case "Unknown":
                this.unknown.addCharacterToNation(characterObject);
                break;
            default:
                break;
        }
    }
}

class NationSwitcher {
    constructor() {
        // GLOBAL VARIABLES
        this.parseAPI = new ParseAPI();

        // METHODS
        this.createButtons();
    }

    createButtons() {
        const nations   = ["Mondstadt", "Liyue", "Inazuma", "Sumeru", 
                          "Outlander", "Unknown"],
              buttonDiv = document.getElementById('nation-buttons');
        
        for(let i = 0; i < nations.length; i++) {
            let button = new CreateElement("button", null, "nation-button")
                        .createElement();

            // SET ATTRIBUTE
            button.textContent = nations[i];

            // APPEND CHILD
            buttonDiv.appendChild(button);
            
            // ACTION WHEN BUTTON IS CLICKED
            button.onclick = () => {

                let nation = null;

                switch(button.textContent) {
                    case "Mondstadt":
                        nation = this.parseAPI.mondstadt;
                        break;
                    case "Liyue":
                        nation = this.parseAPI.liyue;
                        break;
                    case "Inazuma":
                        nation = this.parseAPI.inazuma;
                        break;
                    case "Sumeru":
                        nation = this.parseAPI.sumeru;
                        break;
                    case "Outlander":
                        nation = this.parseAPI.outlander;
                        break;
                    case "Unknown":
                        nation = this.parseAPI.unknown;
                        break;
                    default:
                        break;
                }
                this.generateCharacters(nation);
            }
        }
    }

    async generateCharacters(nation) {
        // DEFAULT
        const defaultNation = this.parseAPI.mondstadt;

        if(nation == null) {
            nation = defaultNation;
        }

        new GenerateCharacters(nation);
    }
}

const ns = new NationSwitcher();
await ns.parseAPI.getAllCharacters();
ns.generateCharacters(null);