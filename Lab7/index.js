import { DataSerializer } from "./DataSerializer.js";
import { CreateElement } from "./CreateElement.js";

class AllFunctions {

    constructor() {
        // GLOBAL VARIABLES
        this.data           = null;
        this.dataSerializer = new DataSerializer();

        // METHODS
        this.insertData();
        this.displayAllData();
        this.displaySelectData();
    }

    insertData() {
        const insertForm = document.getElementById('register-details'),
              submitBtn  = document.getElementById('submit-insert');

        submitBtn.onclick = async() => {
            const phpFile  = 'PostForm.php',
                  formData = new FormData(insertForm);

            formData.append('action', 'insert');

            const response = await this.dataSerializer.postForm(
                        formData, phpFile
            );

            if(response['operation'] == 'success') {
                this.displayAllData();
            }
        }
    }

    async getAllData() {
        const phpFile = "ViewData.php",
              reqData = {
                    request : {
                        'case' : 'one',
                        'id' : null
                    }
              }
        return await this.dataSerializer.retrieveData(reqData, phpFile);
    }

    async displayAllData() {
        const data      = await this.getAllData(),
              table     = document.getElementById('display-table'),
              rowClass  = 'all-data-tr',
              rowExists = document.querySelectorAll('.'.concat(rowClass));
        
        // DELETE ROWS
        if(rowExists.length > 0) {
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
        return await this.dataSerializer.retrieveData(reqData, phpFile);
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
                            this.updateData(data[0]);
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

    updateData(data) {
        const formUpdate     = document.getElementById('form-update'),
              nameField      = document.getElementById('name-update'),
              ageField       = document.getElementById('age-update'),
              emailField     = document.getElementById('email-update'),
              addressField   = document.getElementById('address-update'),
              imageFileField = document.getElementById('imageFile-update'),
              submitBtn      = document.getElementById('submit-update'),

              radioOne  = document.getElementById('radioOne'),
              radioTwo  = document.getElementById('radioTwo');

        // VALUES


        // ENABLE FIELDS
        nameField.disabled      = false;
        ageField.disabled       = false;
        emailField.disabled     = false;
        addressField.disabled   = false;
        submitBtn.disabled      = false;

        // SET FORMER VALUES TO FIELDS
        nameField.value      = data.name;
        ageField.value       = data.age;
        emailField.value     = data.email;
        addressField.value   = data.address;

        // ENABLE OR DISABLE FILE INPUT
        radioOne.onclick = () => {
            imageFileField.value = '';
            imageFileField.disabled = true;
        }
        radioTwo.onclick = () => {
            imageFileField.disabled = false;
        }

        submitBtn.onclick = async() => {

            const phpFile = "PostForm.php",
                  formData = new FormData(formUpdate);

            formData.append('action', 'update');
            formData.append('id', data.id);

            const response = await this.dataSerializer.postForm(
                formData, phpFile
            );

            console.log(response);

            if(response['operation'] == 'success') {
                this.displayAllData();
            }
        }
    }

    async deleteData(id) {
        const phpFile = "DeleteData.php",
              reqData = {
                    query : id
              },
              response = await this.dataSerializer.retrieveData(
                    reqData, phpFile
              );

        if(response['operation'] == 'success') {
            this.displayAllData();
        }
    }
}

new AllFunctions();
