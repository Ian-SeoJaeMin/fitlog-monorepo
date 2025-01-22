import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Timestamps {
    @CreateDateColumn()
    @Exclude()
    createdAt: Date;

    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;
}
