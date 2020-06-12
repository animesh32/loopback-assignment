import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Songs} from '../models';
import {SongsRepository} from '../repositories';

export class SongsController {
  constructor(
    @repository(SongsRepository)
    public songsRepository : SongsRepository,
  ) {}

  @post('/songs', {
    responses: {
      '200': {
        description: 'Songs model instance',
        content: {'application/json': {schema: getModelSchemaRef(Songs)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Songs, {
            title: 'NewSongs',
            exclude: ['id'],
          }),
        },
      },
    })
    songs: Omit<Songs, 'id'>,
  ): Promise<Songs> {
    return this.songsRepository.create(songs);
  }

  @get('/songs/count', {
    responses: {
      '200': {
        description: 'Songs model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Songs) where?: Where<Songs>,
  ): Promise<Count> {
    return this.songsRepository.count(where);
  }

  @get('/songs', {
    responses: {
      '200': {
        description: 'Array of Songs model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Songs, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Songs) filter?: Filter<Songs>,
  ): Promise<Songs[]> {
    return this.songsRepository.find(filter);
  }

  @patch('/songs', {
    responses: {
      '200': {
        description: 'Songs PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Songs, {partial: true}),
        },
      },
    })
    songs: Songs,
    @param.where(Songs) where?: Where<Songs>,
  ): Promise<Count> {
    return this.songsRepository.updateAll(songs, where);
  }

  @get('/songs/{id}', {
    responses: {
      '200': {
        description: 'Songs model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Songs, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Songs, {exclude: 'where'}) filter?: FilterExcludingWhere<Songs>
  ): Promise<Songs> {
    return this.songsRepository.findById(id, filter);
  }

  @patch('/songs/{id}', {
    responses: {
      '204': {
        description: 'Songs PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Songs, {partial: true}),
        },
      },
    })
    songs: Songs,
  ): Promise<void> {
    await this.songsRepository.updateById(id, songs);
  }

  @put('/songs/{id}', {
    responses: {
      '204': {
        description: 'Songs PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() songs: Songs,
  ): Promise<void> {
    await this.songsRepository.replaceById(id, songs);
  }

  @del('/songs/{id}', {
    responses: {
      '204': {
        description: 'Songs DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.songsRepository.deleteById(id);
  }
}
