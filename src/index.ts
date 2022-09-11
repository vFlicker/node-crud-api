import { config } from './config';
import { UserController } from './controllers';
import { Application } from './framework';

const port = config.PORT || 3000;
const hostname = config.HOST_NAME || 'localhost';

const app = new Application({ port, hostname });

const userController = new UserController();

app.router.post('/api/users', userController.create);
app.router.get('/api/users', userController.findAll);
app.router.get('/api/users/:id', userController.findOneById);
app.router.delete('/api/users/:id', userController.remove);

app.run();
