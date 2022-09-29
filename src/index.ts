import { config } from './config';
import { UserController } from './controllers';
import { Application } from './framework';
import { createProcesses } from './utils';

const port = config.PORT || 3000;
const hostname = config.HOST_NAME || 'localhost';
const isMulti = config.MULTI;

const app = new Application({ port, hostname });

const userController = new UserController();

app.router.post('/api/users', userController.create);
app.router.get('/api/users', userController.findAll);
app.router.get('/api/users/:id', userController.findOneById);
app.router.put('/api/users/:id', userController.update);
app.router.delete('/api/users/:id', userController.remove);

if (isMulti) {
  /*
    TODO: Horizontal scaling for the app doesn't work because
    we have an in memory database that doesn't sharing between app instances
  */
  createProcesses(app);
} else {
  app.run();
}
