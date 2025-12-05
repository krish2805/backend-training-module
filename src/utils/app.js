// utils/app.js
const express = require("express");
const session = require("express-session");




module.exports = ({ userRoute,permissionRoute,userPermissionRoute, db }) => {
    const app = express();

    app.use((req, res, next) => {
  console.log("IN APP:", req.method, req.url);
  next();
});


    app.use(
        session({
            secret: process.env.SESSION_SECRET || "supersecret",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
            },
        })
    );

    app.use(express.json());
    app.use("/", userRoute);
    app.use("/", permissionRoute); 
     app.use("/", userPermissionRoute);

    // app.get("/", (_, res) => {
    //     res.send("API is working..");
    // });

    db.authenticate() // uses the function from db/index.js
        .catch((err) => console.error("DB Connection Failed", err));

    return app;
};


//  "username": "Admin",
//   "password": "Admin123"
// }