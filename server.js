require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
require("./config/db");
const userRoute = require('./routes/usersRoute');
const eventsRoutes=require("./routes/eventsRoute");
const reservationRoutes=require('./routes/reservationRoute');
const venuesRoutes=require('./routes/venuesRoute');
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/events", eventsRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/venues", venuesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});