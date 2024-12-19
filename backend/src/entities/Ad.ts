import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from 'type-graphql';
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Picture } from "./Picture";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
   @Field()
   @PrimaryGeneratedColumn()
   id: number;
   
   @Field()
   @Column()
   title: string;
   
   @Field()
   @Column({ nullable: true })
   description?: string;
   
   @Field()
   @Column()
   owner: string;
   
   @Field()
   @Column()
   price: number;
   
   @Field(() => [Picture], { nullable: true })
   @OneToMany(() => Picture, (picture) => picture.ad, {
      cascade: true,
      eager: true,
   })
   pictures: Picture[];
   
   @Field()
   @Column()
   location: string;
   
   @Field()
   @CreateDateColumn()
   createdAt: Date;

   // 1er paramètre : callback vide qui pointe vers la table associée
   // 2ème paramètre (optionnel) : préciser le champ auquel on fait référence dans l'autre table : définition de la clé étrangère
   // ManyToOne : many ads appartiennent à one category
   @Field(() => Category)
   @ManyToOne(
      () => Category, category => category.ads, { eager: true }
   )
   category: Category;

   @Field(() => [Tag], { nullable: true })
   @ManyToMany(
      () => Tag, tag => tag.ads, { eager: true, cascade: true }
   )
   @JoinTable()
   // @JoinTable obligatoire sur Ad ou Tag => définit la création de la table de jointure
   tags?: Tag[];
}