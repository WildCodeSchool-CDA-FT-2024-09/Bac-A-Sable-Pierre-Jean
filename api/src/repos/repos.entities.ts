import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Min, Max, IsBoolean, IsString } from "class-validator";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  @IsString()
  id: string;


  @Field()
  @Column({ length: 100 })
  @IsString()
  name: string;

  @Field()
  @Column({ length: 100 })
  @IsString()
  url: string;

  @Field()
  @Column()
  @IsBoolean()
  isFavorite: boolean;

  @Field(()=> Status)
  @ManyToOne(() => Status, (status) => status.id)
  @Min(1)
  @Max(2)
  status: Status;

  @Field(()=> [Lang])
  @ManyToMany(() => Lang)
  @JoinTable()
  langs: Lang[];
}
