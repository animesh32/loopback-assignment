import {BindingKey} from '@loopback/core'
import { Users } from './models';

export namespace HasherBindings{
    export const rounds='rounds';
    export const roundsVal=10;
    export const hasherService='hash.service'
}

export namespace ValidationBinding{
    export const validations= 'validator.service';
}
export namespace UserBindings{
    export const userService='users.sevice'
}
export namespace jwtConfigs{
    export const jwtService='jwt.service'
    export const expiresIn='8h'
    export const secretKey='loopback'
}