export class DataSerializer {

    async postData(postedData, phpFile) {
    
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

}