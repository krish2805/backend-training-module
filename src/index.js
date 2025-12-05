

require("./crone-job/index"); 

require("dotenv").config();
const createApp = require("./utils/app");
const createRoutes = require("./routes/user.index");
const createPermissionRoute = require("./routes/permission.index");
const createUserPermissionRoutes = require("./routes/userper.index");
const db = require("./db/index");

const userRoute = createRoutes();
const permissionRoute = createPermissionRoute();
const userPermissionRoute = createUserPermissionRoutes();





const app = createApp({
  userRoute, 
  permissionRoute,
  userPermissionRoute,
  db,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
