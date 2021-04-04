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
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Note, (note) => note.creator)
  notes: Note[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;


  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
