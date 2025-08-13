import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produtos } from "./entities/produto.entity";
import { ProdutoService } from "./service/produto.service";
import { ProdutosController } from "./controller/produto.controller";
import { CategoriaModule } from "../categoria/categoria.module";

@Module({
  imports: [TypeOrmModule.forFeature([Produtos]), CategoriaModule],
  providers: [ProdutoService],
  controllers: [ProdutosController],
  exports: [TypeOrmModule],
})
export class ProdutosModule {}
