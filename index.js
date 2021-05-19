const http = require("http");
const https = require("https");

const get = async function(url, options){
    return new Promise(function(resolve, reject){
        options ?? (options = {
            json: false
        });

        try{
            let sendURL;
            if(url.split("://")[0] == 'http' || url.split("://")[0] == 'https'){
                options.schema = url.split("://")[0];
                sendURL = new URL(url);
            }
            else{
                sendURL = new URL(`${options.schema}://${url}`);
            }

            let request;

            if(options.schema == 'http'){
                request = http.request(sendURL, response=>{
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
            }
            else{
                request = https.request(sendURL, response=>{
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
            }

            request.on('error', error => {
                console.error(error);
                reject(error);
            });
            
            request.end();
        }
        catch(error){
            console.error(error);
            reject(error);
        }
    });
};

module.exports = {
    get: get
}