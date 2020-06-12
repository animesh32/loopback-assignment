import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
import { ValidatorService, MyUserService, JWTService } from './services';
import { ValidationBinding, HasherBindings, UserBindings, jwtConfigs } from './keys'
import { HashPassword } from './services/hash.password';
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import {JWTStrategy} from './authentication/jwt.strategy'
export class LoopbackAssnApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.setupBndings()
    // Set up the custom sequence
    this.sequence(MySequence);

    this.component(AuthenticationComponent)
    registerAuthenticationStrategy(this,JWTStrategy)

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  setupBndings(): void {
    this.bind(ValidationBinding.validations).toClass(ValidatorService);
    this.bind(HasherBindings.rounds).to(HasherBindings.roundsVal);
    this.bind(HasherBindings.hasherService).toClass(HashPassword);
    this.bind(UserBindings.userService).toClass(MyUserService);
    this.bind(jwtConfigs.jwtService).toClass(JWTService);

  }
}
