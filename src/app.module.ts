import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from "./categoria/categoria.module";
import { Categoria } from "./categoria/entities/categoria.entity";
import { ProdutosModule } from "./produto/produto.module";
import { Produtos } from "./produto/entities/produto.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "rootroot",
      database: "db_loja_de_roupas",
      entities: [Categoria, Produtos],
      synchronize: true,
      logging: true,
    }),
    CategoriaModule,
    ProdutosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
