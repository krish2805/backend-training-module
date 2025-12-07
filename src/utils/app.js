
const express = require("express");
const session = require("express-session");

module.exports = ({
    userRoute,
    permissionRoute,
    userPermissionRoute,
    itemRoute,
    db,
}) => {
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

    // Mount routes
    app.use("/", userRoute);
    app.use("/", permissionRoute);
    app.use("/", userPermissionRoute);
    app.use("/", itemRoute);

    // DB Test connection
    db.authenticate().catch((err) =>
        console.error("DB Connection Failed", err)
    );

    return app;
};
