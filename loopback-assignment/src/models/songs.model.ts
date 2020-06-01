import {Entity, model, property} from '@loopback/repository';

@model()
export class Songs extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  decription?: string;

  @property({
    type: 'string',
    name:"video_id"
  })
  videoId?: string;


  constructor(data?: Partial<Songs>) {
    super(data);
  }
}

export interface SongsRelations {
  // describe navigational properties here
}

export type SongsWithRelations = Songs & SongsRelations;
