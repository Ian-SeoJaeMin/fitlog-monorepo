import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '@src/common/consts/role.enum';
import { Timestamps } from '@src/common/entities/timestamps.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    phone: string;
    @Column({
        unique: true
    })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        enum: UserRole,
        default: UserRole.GUEST
    })
    role: UserRole;

    @Column(() => Timestamps, { prefix: false })
    @Exclude()
    timestamps: Timestamps;
}
