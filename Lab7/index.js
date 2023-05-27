import { DataSerializer } from "./DataSerializer.js";
import { CreateElement } from "./CreateElement.js";

class AllFunctions {

    constructor() {
        // GLOBAL VARIABLES
        this.data           = null;
        this.dataSerializer = new DataSerializer();

        // METHODS
        this.displayAllData();
    }

    async getAllData() {
        const phpFile = "ViewData.php";
        return await this.dataSerializer.postData(null, phpFile);
    }

    async displayAllData() {
        const data  = await this.getAllData(),
              table = document.getElementById('display-table'); 

        for(let i = 0; i < data.length; i++) {
            // const objectLength = Object.keys(data[0]).length;
            const tr = new CreateElement("tr", null, null).createElement();
            for(let key in data[i]) {
                if(data[i].hasOwnProperty(key)) {
                    let th    = new CreateElement("th", null, null)
                                .createElement(),
                        value = data[i][key];

                    // DISPLAY IMAGE
                    if(key == 'imagePath') {
                        let image = new CreateElement("img", null, null)
                                    .createElement();
                        const BASE_FILE_PATH = 'http://localhost/CMSC126/Lab7/images/';
                        console.log(BASE_FILE_PATH.concat(value));
                        image.src = BASE_FILE_PATH.concat(value);
                        th.appendChild(image);
                    }
                    // DISPLAY TEXT
                    else {
                        th.textContent = value;
                    }
                    tr.appendChild(th);
                }
                table.appendChild(tr);
            }
        }

    }
}

new AllFunctions();
