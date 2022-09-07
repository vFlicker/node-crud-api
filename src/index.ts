import { config } from './config';
import { UserController } from './controllers';
import { Application } from './core';
import { UserModel } from './models';

const port = config.PORT || 3000;
const hostname = config.HOST_NAME || 'localhost';

const app = new Application({ port, hostname });

const userController = new UserController(new UserModel());

app.router.post('/api/users', userController.create);
app.router.get('/api/users', userController.findAll);

app.run();
