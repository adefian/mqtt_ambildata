// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const mqtt = require('mqtt') ;
// const client = mqtt.connect('mqtt://');
var client = mqtt.connect('mqtts://adefian:aio_yxWf92U44DZxbOk4YhSxLWupJ0zS@io.adafruit.com', 1883);

client.on('connect', () => {    
    client.subscribe('test/data',{qos:1}); 
})
client.on('message',function(topic,message){    
console.log('this message :',message.toString());        
//send the post request to laravel app
var sendDATA=message.toString();
var http=require('http');
var https = require('https') ;
var querystring = require('querystring');   

const options = {  
      host: 'https://ta.poliwangi.ac.id/~ti17136/',  
      // host: '127.0.0.1',  
      port: 443,  
      path: 'test/data',  
      // strictSSL: false,
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(sendDATA)
      }
}; 
const req = https.request(options, (res) => {  
    console.log(`STATUS: ${res.statusCode}`);  
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');  
    res.on('data', (chunk) => {    
      console.log(`BODY: ${chunk}`);  
    });  
    res.on('end', () => {    
    console.log('No more data in response.');  
    });
}); 
req.on('error', (e) => {  
console.error(`problem with request: ${e.message}`);
}); 
req.write(sendDATA);
req.end();    
});
