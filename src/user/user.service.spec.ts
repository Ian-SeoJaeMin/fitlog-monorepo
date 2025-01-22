import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneByOrFail: jest.fn()
};

describe('UserService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository
                }
            ]
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('findOne', () => {
        it('should return a user by id', async () => {
            const id = 1;
            const user = { id: 1, email: 'test@fitlog.ai' };

            jest.spyOn(mockUserRepository, 'findOne').mockResolvedValue(user);
            jest.spyOn(userService, 'isExistUserById').mockResolvedValue(user as User);

            const result = await userService.findOne(id);
            expect(result).toEqual(user);
            expect(userService.isExistUserById).toHaveBeenCalledWith(id);
        });
    });
});
