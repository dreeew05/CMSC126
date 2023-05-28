export class DataSerializer {

    async retrieveData(postedData, phpFile) {
    
        return await this.serializeData(phpFile, postedData)
            .then(data => {
                // console.log(data);
                return data;
            })
            .catch(error => {
                return {
                    result : null
                }; 
            });
    }

    async serializeData(url, jsonData) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        // console.log(response.json());
        return response.json();
    }

    async postForm(data, phpFile) {
        const response = await fetch(
            phpFile, {
                method : 'POST', 
                body : data
            }
        );
        // console.log(response);
        return response.json();
    }

}