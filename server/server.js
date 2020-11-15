import express from 'express';
import router from './router/index.js';

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//required routers 
app.use('/v1', router)


app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown error",
    status: 400,
    message: { err: "an error occured" },
  };

  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status || 500).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

export default app;