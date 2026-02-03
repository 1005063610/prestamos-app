import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'ADMIN' | 'COLLECTOR';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'COLLECTOR' })
  role: UserRole;
}
