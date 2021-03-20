import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Note } from './Note';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('text')
  email!: string;

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @OneToMany(() => Note, (note) => note.creator)
  notes: Note[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  // @Column('int')
  // @Field(() => String)
  // isAdmin: Boolean

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
