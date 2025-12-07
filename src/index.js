require("./crone-job/index");
require("dotenv").config();

const createApp = require("./utils/app");
const createRoutes = require("./routes/user/user.index");
const createPermissionRoute = require("./routes/permissions/permission.index");
const createUserPermissionRoutes = require("./routes/user-permissions/userper.index");
const createItemRoutes = require("./routes/items/item.index");

const db = require("./db/index");
const initCronJobs = require("./crone-job");

const userRoute = createRoutes();
const permissionRoute = createPermissionRoute();
const userPermissionRoute = createUserPermissionRoutes();
const itemRoute = createItemRoutes();

initCronJobs({ db });

const app = createApp({
  userRoute,
  permissionRoute,
  userPermissionRoute,
  itemRoute,
  db,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
