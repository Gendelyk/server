import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';

import {
  createNewSchema,
  dropSchema,
} from '../../../common/__tests__/integration/utils/schema.js';
import { MockedCryptoService } from '../../../crypto/__tests__/__mocks__/crypto.service.mock.js';
import { CryptoModule } from '../../../crypto/crypto.module.js';
import { CryptoService } from '../../../crypto/crypto.service.js';
import { DbModule } from '../../../db/db.module.js';
import { UserModule } from '../../user.module.js';
import { UserService } from '../../user.service.js';
import { createMockUser } from '../__mocks__/user.mock.js';

describe('User service', () => {
  let schemaName: string;
  let module: TestingModule;
  let userService: UserService;

  beforeEach(async () => {
    // TODO can abstract away creating testing module
    const { schema } = await createNewSchema();

    schemaName = schema;

    try {
      module = await Test.createTestingModule({
        imports: [
          DbModule.forTest(schemaName),
          UserModule,
          UserModule,
          CryptoModule,
          EventEmitterModule.forRoot(),
        ],
      })
        .overrideProvider(CryptoService)
        .useClass(MockedCryptoService)
        .compile();

      await module.init();

      userService = module.get<UserService>(UserService);
    } catch (error) {
      console.error(error);
      // * if initialization goes wrong - remove created schema
      await dropSchema(schemaName);
    }
  });
  afterEach(async () => {
    await dropSchema(schemaName);

    await module.close();
  });

  it('Creates new user', async () => {
    const newUser = await userService.createUser(createMockUser());

    expect(newUser).toBeDefined();
  });
});
