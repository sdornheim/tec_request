const https = require("https");

const get = async function(url, options){
    return new Promise(function(resolve, reject){
        options ?? (options = {
            json: false
        });

        const request = https.request(new URL(url), response=>{
            let data = '';    
            response.setEncoding('utf8');

            response.on('data', async (chunk) => {
                data = data + chunk.toString();
            });

            response.on('end', () => {
                let body;
                (options.json) ? body = JSON.parse(data) : body = data; 

                resolve({
                    data: body,
                    status: response.statusCode,
                    headers: response.headers
                });
            });
        });
    
        request.on('error', error => {
            console.error(error);
            reject(error);
        });
        
        request.end();
    });
};

module.exports = {
    get: get
}