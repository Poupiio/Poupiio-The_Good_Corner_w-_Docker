import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Field()
   @Column({ unique: true })
   email: string;

   @Column()
   hashedPassword: string;

   @Field(() => [Ad])
   @OneToMany(() => Ad, ad => ad.user)
   ads: Ad[];
}