// create a package.json file using npm init -y
// install packages express mongoose cors etc

// 1) create a server.js file and make a server  using expess module
// 2) create db.js file and setup mongoose there and import it to server.js
// 3)create a collection file inside models folder and make structures for collection
// 4) make functions related to these collection
// 5) to call these function you have to create routes related to these functions
// 6) import route file on server.js




// JWT steps --> 
// 1) install package npm i jsonwebtoken
// 2) import Jwt 
// 3)in login function make a token for user --> using jwt.sign method it takes two argument a object of your unique data and a secret , send token as response

// frontend user will  save this token and when ever in backend api we need userId, frontend user will send this token in api in headers ,with the help of token you can get users userId by decoding the token,

// 4) create a middleware function that decoded or varify token using jwt.verify method
// 5)modify req with req.user = decoded
// 5)use this middleware function in between the routes where you want to get userId