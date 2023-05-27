import { DataSerializer } from "./DataSerializer.js";
import { CreateElement } from "./CreateElement.js";

class AllFunctions {

    constructor() {
        // GLOBAL VARIABLES
        this.data           = null;
        this.dataSerializer = new DataSerializer();

        // METHODS
        this.displayAllData();
        this.displaySelectData();
    }

    async getAllData() {
        const phpFile = "ViewData.php",
              reqData = {
                    request : {
                        'case' : 'one',
                        'id' : null
                    }
              }
        return await this.dataSerializer.postData(reqData, phpFile);
    }

    async displayAllData() {
        const data      = await this.getAllData(),
              table     = document.getElementById('display-table'),
              rowClass  = 'all-data-tr',
              rowExists = document.querySelectorAll('.'.concat(rowClass));
        
        // DELETE ROWS
        console.log(rowExists.length);
        if(rowExists.length > 0) {
            // console.log(rowExists.length);
            rowExists.forEach(row => {
                row.parentNode.removeChild(row);
            }) 
        }

        for(let i = 0; i < data.length; i++) {
            const tr = new CreateElement("tr", null, rowClass)
                       .createElement();
            for(let key in data[i]) {
                if(data[i].hasOwnProperty(key)) {
                    let td    = new CreateElement("td", null, null)
                                .createElement(),
                        value = data[i][key];

                    // DISPLAY IMAGE
                    if(key == 'imagePath') {
                        this.displayImage(value, td);
                    }
                    // DISPLAY TEXT
                    else {
                        td.textContent = value;
                    }
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
        }
    }

    displayImage(value, td) {
        let image = new CreateElement("img", null, null)
                    .createElement();
        const BASE_FILE_PATH = 'http://localhost/CMSC126/Lab7/images/';
        image.src = BASE_FILE_PATH.concat(value);
        td.appendChild(image);
    }

    async selectData(searchID) {
        const phpFile = "ViewData.php",
              reqData = {
                    request : {
                        'case' : 'all',
                        'id' : searchID
                    }
              };
        return await this.dataSerializer.postData(reqData, phpFile);
    }

    displaySelectData() {
        const selectDataBtn = document.getElementById('button-select'),
              selectDataId  = document.getElementById('input-select');

        selectDataBtn.onclick = async() => {
            const rowName   = 'select-data-row',  
                  rowExists = document.getElementById(rowName);

            if(rowExists) {
                rowExists.remove();
            }

            const data  = await this.selectData(selectDataId.value),
                  table = document.getElementById('select-table'), 
                  tr    = new CreateElement("tr", rowName, 
                          null).createElement();

            let td = null;

            // console.log(data);

            if(data != null) {

                const keyLength = Object.keys(data[0]).length + 1,
                      keys      = Object.keys(data[0]);

                for(let i = 0; i < keyLength; i++) {
                    td = new CreateElement("td", null, null).createElement(); 
                    if(i == keyLength - 1) {
                        const div       = new CreateElement("div", "action-div", 
                                          null).createElement(),
                              updateBtn = new CreateElement("button", "update-btn",
                                          "btn btn-success").createElement(),
                              deleteBtn = new CreateElement("button", "delete-btn",
                                          "btn btn-danger").createElement();

                        updateBtn.textContent = "Update";
                        deleteBtn.textContent = "Delete";

                        div.appendChild(updateBtn);
                        div.appendChild(deleteBtn);
                        td.appendChild(div);

                        // BUTTON ACTION
                        const id = data[0]['id'];

                        updateBtn.onclick = () => {
                            this.updateData();
                        }
                        deleteBtn.onclick = async() => {
                            await this.deleteData(id);
                        }
                    }
                    else {
                        let value = data[0][keys[i]];
                        if(keys[i] == 'imagePath') {
                            this.displayImage(value, td);
                        }
                        else {
                            td.textContent = value;
                        }
                    }
                    tr.appendChild(td);
                }

            }
            else {
                td = new CreateElement("td", null, null).createElement();
                td.setAttribute("colspan", 8);
                td.setAttribute("style", "text-align:center");
                td.textContent = "No Data Found";
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }

    updateData() {
        window.alert("Hello");
    }

    async deleteData(id) {
        const phpFile = "DeleteData.php",
              reqData = {
                    query : id
              },
              response = await this.dataSerializer.postData(reqData, phpFile);

        if(response['operation'] == 'success') {
            this.displayAllData();
        }
    }
}

new AllFunctions();
