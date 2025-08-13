import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { CategoriaService } from "../service/categoria.service";
import { Categoria } from "../entities/categoria.entity";

@Controller("/categorias")
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  findById(@Param("id", ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get("/categoria/:categoria")
  @HttpCode(HttpStatus.OK)
  findBySetor(@Param("categoria") categoria: string): Promise<Categoria[]> {
    return this.categoriaService.findByCategoria(categoria);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(Categoria);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(Categoria);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.categoriaService.delete(id);
  }
}
