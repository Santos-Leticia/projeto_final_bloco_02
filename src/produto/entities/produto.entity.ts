/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_produtos" })
export class Produtos {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  marca: string;

  @IsNotEmpty()
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  preco: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  tamanho: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "categoria_id" })
  categoria: Categoria;
}
