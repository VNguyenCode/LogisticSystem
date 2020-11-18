import express from 'express';
import router from './router/index'

/**
 * Create Express server at specific port. 
 */
const app = express();
const PORT = 8080;

/**
 * Express configuration 
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Routing to router
 */
app.use('/v1', router)

/**
 * Error Handler.  
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown error",
    status: 400,
    message: { err: "an error occured" },
  };

  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status || 500).send(errorObj.message);
});

/**
 * Start Express server at specified port.
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

export default app;