// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const mqtt = require('mqtt') ;
const client = mqtt.connect('mqtt://test.mosquitto.org');
// const client = mqtt.connect('mqtts://adefian:aio_apsn25Csqzdh7WyxiZdMXtpsjkVt@io.adafruit.com', 1883);
const axios = require('axios');


client.on('connect', () => {    
    client.subscribe('adefian/feeds/datasensor',{qos:1}); 
})
client.on('message',function(topic, message){    
  console.log('this message :',message.toString());        
  //send the post request to laravel app
  var sendDATA= message.toString();

// var http=require('http');
// var https = require('https') ;
// var querystring = require('querystring');   

// const options = { 
//   host: 'http://ta.poliwangi.ac.id',  
//   port :80,
//   // host: '127.0.0.1',   
//   path: '/~ti17136/code-reward/data',  
//   // strictSSL: false,
//   method: 'POST',
//   headers: { 
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(sendDATA)
//   }
// }; 
// const req = http.request(options, (res) => {  
//     console.log(`STATUS: ${res.statusCode}`);  
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');  
//     res.on('data', (chunk) => {    
//       console.log(`BODY: ${chunk}`);  
//     });  
//     res.on('end', () => {    
//     console.log('No more data in response.');  
//     });
// }); 
// req.on('error', (e) => {  
// console.error(`problem with request: ${e.message}`);
// }); 
// req.write(sendDATA);
// req.end();    
// });

  // axios.defaults ={
  //   baseURL: "https://ta.poliwangi.ac.id/~ti17136/",
  //   headers: { 
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Content-Length': Buffer.byteLength(sendDATA)
  //   }
  // }
  const header = { 
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(sendDATA)
  }
  axios.post('https://ta.poliwangi.ac.id/~ti17136/api/ambildata', sendDATA, header)
  .then(res => {
    console.log(res.statusCode)
    console.log(res.data)
  })
  .catch(err => 
    console.log(err.message)
  )

  // axios.get('http://ta.poliwangi.ac.id/~ti17136/')
  // .then(res => console.log(res.data))
  // .catch(err => console.log(err.message))
})
