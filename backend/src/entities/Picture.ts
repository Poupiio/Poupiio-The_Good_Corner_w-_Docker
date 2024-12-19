import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";
import { MaxLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Picture extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @MaxLength(3000)
  url: string;

  @ManyToOne(() => Ad, (ad) => ad.pictures, { onDelete: "CASCADE" })
  ad: Ad;
}
