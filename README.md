# tec_request
## Install
```
npm i --save tec_request
```
## Usage / Example
```
const tecrequest = require("tec_request");

app.get("/", async (req, res)=>{
    const url = "https://tools.learningcontainer.com/sample-json.json";

    const options = {
        json: true
    };

    let response = await tecrequest.get(url, options);
    
    console.log(response.data);
});
```
### Methods
```
get(url, options)
```
### Options
```
json --- true or false
```
### Response
```
response
|_ data
|_ status
|_ headers
```
### Update History
2021/05/19 - add get method with option JSON