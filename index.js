const https = require("https");

const get = async function(url, options){
    return new Promise(function(resolve, reject){
        const request = https.request(new URL(url), response=>{
            let data = '';
    
            response.setEncoding('utf8');

            response.on('data', async (chunk) => {
                data = data + chunk.toString();
            });

            response.on('end', () => {
                const body = JSON.parse(data);
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
        })
        
        request.end();
    });
}

module.exports = {
    get: get
}