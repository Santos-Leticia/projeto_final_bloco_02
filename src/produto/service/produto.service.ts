import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";
import { Produtos } from "../entities/produto.entity";
import { CategoriaService } from "../../categoria/service/categoria.service";

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produtos)
    private produtosRepository: Repository<Produtos>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produtos[]> {
    return await this.produtosRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produtos> {
    const produtoId = await this.produtosRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produtoId)
      throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
    return produtoId;
  }

  async findAllByNome(nome: string): Promise<Produtos[]> {
    return await this.produtosRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async findAllByMarca(nome: string): Promise<Produtos[]> {
    return await this.produtosRepository.find({
      where: {
        marca: ILike(`%${nome}%`),
      },
    });
  }
  async create(produtos: Produtos): Promise<Produtos> {
    if (produtos.categoria) {
      const categoria = await this.categoriaService.findById(
        produtos.categoria.id,
      );
      if (!categoria)
        throw new HttpException(
          "Produto não encontrado!",
          HttpStatus.NOT_FOUND,
        );

      return await this.produtosRepository.save(produtos);
    }

    return await this.produtosRepository.save(produtos);
  }

  async update(produtos: Produtos): Promise<Produtos> {
    const buscarProdutos = await this.findById(produtos.id);
    if (!buscarProdutos || !produtos.id)
      throw new HttpException("Item não encontrado!", HttpStatus.NOT_FOUND);

    if (produtos.categoria) {
      const categoria = await this.categoriaService.findById(
        produtos.categoria.id,
      );

      if (!categoria)
        throw new HttpException(
          "Categoria não encontrado!",
          HttpStatus.NOT_FOUND,
        );

      return await this.produtosRepository.save(produtos);
    }
    return await this.produtosRepository.save(produtos);
  }

  async delete(id: number): Promise<DeleteResult> {
    const buscarProdutos = await this.findById(id);

    if (!buscarProdutos)
      throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);

    return await this.produtosRepository.delete(id);
  }
}
