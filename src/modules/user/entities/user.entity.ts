import { Node } from 'src/shared/node/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Node {
  @Column({ type: 'varchar', length: 40 })
  firstName: string;

  @Column({ type: 'varchar', length: 40 })
  lastName: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;
}
