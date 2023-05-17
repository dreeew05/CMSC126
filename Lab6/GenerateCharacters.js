import { CreateElement } from "./CreateElement.js";

export class GenerateCharacters {
    constructor(nation, characters) {
        // PASSED VALUE
        this.nation     = nation;
        this.characters = characters;

        // METHODS
        this.generateIcons();
        this.generateFeature(this.getCharacters()[0]);
    }

    getNation() {
        return this.nation;
    }

    getCharacters() {
        return this.characters;
    }

    generateIcons() {
        // const iconHolder = document.getElementById("characters");
        const body        = document.body,
              holderID    = "characters",
              holderExist = document.getElementById(holderID);

        if(holderExist) {
            holderExist.remove();
        }

        const iconHolder = new CreateElement("div", "characters", null)
                           .createElement();
        body.appendChild(iconHolder);

        let holderCounter = 0;

        for(let i = 0; i < this.getCharacters().length; i++) {
            let character = this.getCharacters()[i],
                name      = character.name,
                icon      = character.icon,
                button    = new CreateElement("button", null, "character-button")
                            .createElement(),
                div       = new CreateElement("div", null, "character-button-div")
                            .createElement(),
                span      = new CreateElement("span", null, "character-button-text")
                            .createElement(),
                image     = new CreateElement("img", null, "character-icon")
                            .createElement(),
                holder    = document.getElementById("characters-holder-"
                            .concat(holderCounter));

            if(i % 10 == 0) {
                if(i != 0) {
                    holderCounter++;
                }
                holder = new CreateElement("div", "characters-holder-"
                         .concat(holderCounter), "characters-holder")
                         .createElement();
                iconHolder.appendChild(holder);
            }
            
            // SET ATTRIBUTE
            image.setAttribute("src", icon);
            span.textContent = name;
            // APPEND CHILD
            holder.appendChild(button);
            button.appendChild(div);
            div.appendChild(image);
            div.appendChild(span);

            button.onclick = () => {
                this.generateFeature(character);
            }
        }
    }
    
    async fetchImage(imageSRC, featureBackupSRC) {
        let response = await fetch(imageSRC);

        if(response.status === 404) {
            response = await fetch(featureBackupSRC);
        }

        return response.url;
    }

    async generateFeature(characterJSON) {
        let key         = characterJSON.key,
            name        = characterJSON.name,
            vision      = characterJSON.vision,
            skills      = characterJSON.skills,
            title       = characterJSON.title,
            rarity      = characterJSON.rarity,
            bgImage     = null;

        const mondstadtBG = "/assets/mondstadt_bg.jpg",
              liyueBG     = "/assets/liyue_bg.jpg",
              inazumaBG   = "/assets/inazuma_bg.jpg",
              sumeruBG    = "/assets/sumeru_bg.jpg",
              outlanderBG = "/assets/outlander_bg.jpg",
              unknownBG   = "/assets/dragonspine_bg.jpg";

        switch(this.getNation()) {
            case "Mondstadt":
                bgImage = mondstadtBG;
                break;
            case "Liyue":
                bgImage = liyueBG;
                break;
            case "Inazuma":
                bgImage = inazumaBG;
                break;
            case "Sumeru":
                bgImage = sumeruBG;
                break;
            case "Outlander":
                bgImage = outlanderBG;
                break;
            case "Unknown":
                bgImage = unknownBG;
                break;
            default:
                break;
        }

        const image      = document.getElementById('character-portrait'),
              background = document.getElementById('background'),
              nameDiv    = document.getElementById('character-name'),
              visionDiv  = document.getElementById('character-vision');
        
        // CHECK IF IMAGE EXISTS
        // GO TO BACKUP IF IT DOES NOT
        const BASE_LINK = "https://api.genshin.dev/characters/",
              portrait  = BASE_LINK.concat(key)
                          .concat("/portrait"),
              card      = BASE_LINK.concat(key)
                          .concat("/card");

        let featureImage = await this.fetchImage(portrait, card);

        // SET ATTRIBUTE
        image.setAttribute("src", featureImage);
        background.setAttribute("src", bgImage);
        nameDiv.textContent = name;
        visionDiv.setAttribute("src", vision);

        // DISPLAY SKILLS
        this.displayCharacterSkill(key, skills, BASE_LINK);
    }

    displayCharacterSkill(key, skills, BASE_LINK) {
        const parentDiv    = document.getElementById('character-details'),
              holderID     = 'character-skills',
              holderExists = document.getElementById(holderID);

        if(holderExists) {
            holderExists.remove();
        }

        const skillsHolder = new CreateElement("div", holderID, null)
                           .createElement();
        parentDiv.appendChild(skillsHolder);

        // let skillsObject = {};
        for(let i = 0; i < skills.length; i++) {

            let skillLink = null;

            switch(i) {
                case 0:
                    skillLink = BASE_LINK.concat(key)
                                .concat("/talent-na");
                    break;
                case 1:
                    skillLink = BASE_LINK.concat(key)
                                .concat("/talent-skill");
                    break;
                case 2: 
                    skillLink = BASE_LINK.concat(key)
                                .concat("/talent-burst");
                    break;
                case 3:
                    skillLink = BASE_LINK.concat(key)
                                .concat("/talent-passive-misc");
                    break;
                default:
                    break;
            }

            // skillsObject["talent-".concat(i)] = {
            //     skillName : skills[i].name,
            //     skillsImage : skillLink
            // }

            let skillDiv   = new CreateElement("div", null, "skill-div")
                             .createElement(),
                skillImage = new CreateElement("img", null, "skill-img")
                             .createElement(),
                skillName  = new CreateElement("div", null, "skill-name")
                             .createElement();
            
            // SET ATTRIBUTE
            skillImage.setAttribute("src", skillLink);
            skillName.textContent = skills[i].name;

            // APPEND CHILD
            skillsHolder.appendChild(skillDiv);
            skillDiv.appendChild(skillImage);
            skillDiv.appendChild(skillName);
            
        }

    }

}