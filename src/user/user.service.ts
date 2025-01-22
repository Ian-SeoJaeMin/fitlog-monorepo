import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, FindOptionsWhere, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    findAll() {
        return this.userRepository.find();
    }

    async findOne(id: number) {
        const user = await this.getUserById(id);
        return user;
    }

    async create(createUserDto: CreateUserDto) {
        const { email, phone, password } = createUserDto;
        const where = [{ email }, { phone }];
        // email, phone 중복 확인
        if (await this.isExistsUserBy(where)) throw new BadRequestException(`이미 사용중인 이메일 혹은 전화번호 입니다.`);

        // TODO: password 암호화

        return this.userRepository.save({
            ...createUserDto
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const { phone, email, password } = updateUserDto;

        const user = await this.getUserById(id);

        // TODO: 리팩토링 필요
        const where = [];
        if (phone) where.push({ phone, id: Not(id) });
        if (email) where.push({ email, id: Not(id) });
        if (await this.isExistsUserBy(where)) throw new BadRequestException(`이미 사용중인 이메일 혹은 전화번호 입니다.`);

        // TODO: password 암호화

        return this.userRepository.save({ ...user, ...updateUserDto });
    }

    async remove(id: number) {
        if (!(await this.isExistsUserBy([{ id }]))) throw new NotFoundException(`사용자를 찾을 수 없습니다.(id: ${id})`);
        await this.userRepository.delete({ id });
        return id;
    }

    getUserById(id: number) {
        return this.userRepository.findOneByOrFail({ id }).catch(e => {
            // TODO : Intercept 로 error 전략 만들기
            // link : https://github.com/typeorm/typeorm/issues/2960
            if (e.criteria.id === 2) throw new NotFoundException(`사용자를 찾을 수 없습니다.(id: ${id})`);
        });
    }

    async isExistsUserBy(where: FindOptionsWhere<User>[]) {
        if (where.length === 0) return false;
        return this.userRepository.existsBy(where);
    }
}
