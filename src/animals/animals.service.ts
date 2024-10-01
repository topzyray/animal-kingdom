import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal } from './schema/animals.schema';
import { Model } from 'mongoose';
import { QueryAnimalDto } from './dto/query-animal.dto';
import { SearchAnimalDto } from './dto/search-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}

  async create(
    createAnimalDto: CreateAnimalDto,
    userId: string,
  ): Promise<Animal> {
    const newAnimal = await this.animalModel.create({
      ...createAnimalDto,
      user: userId,
    });
    if (!newAnimal) {
      throw new InternalServerErrorException('Failed to create Animal');
    }
    return newAnimal;
  }

  async findAll(queryAnimalDto: QueryAnimalDto): Promise<string | Animal[]> {
    const { page = 1, limit = 10 } = queryAnimalDto;
    const allAnimal = await this.animalModel
      .find()
      .populate({
        path: 'user',
        select: '-password -createdAt -updatedAt',
        model: 'User',
      })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    if (!allAnimal) {
      throw new NotFoundException('Failed to fetch all animals');
    }
    if (allAnimal.length === 0) {
      return 'No animals resource is empty!';
    }
    return allAnimal;
  }

  async searchAnimal(searchAnimalDto: SearchAnimalDto) {
    if (
      !searchAnimalDto.name &&
      !searchAnimalDto.family &&
      !searchAnimalDto.color
    ) {
      throw new NotFoundException(
        'No search criteria provided. Please provide a search criteria such as name, family or color with value',
      );
    }
    const animalss = await this.animalModel
      .find({ ...searchAnimalDto })
      .populate({
        path: 'user',
        select: '-password -createdAt -updatedAt',
        model: 'User',
      });
    if (animalss.length === 0) {
      throw new NotFoundException(
        'No animalss found with provided search criteria',
      );
    }
    return animalss;
  }

  async findOne(id: string): Promise<Animal> {
    const animals = await this.animalModel
      .findById(id)
      .populate({
        path: 'user',
        select: '-password -createdAt -updatedAt',
        model: 'User',
      })
      .exec();
    if (!animals) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }
    return animals;
  }

  async update(
    id: string,
    updateAnimalDto: UpdateAnimalDto,
    userId: string,
  ): Promise<Animal> {
    const animals = await this.animalModel.findById(id);

    if (userId !== animals.user.toString()) {
      throw new ForbiddenException(
        'You not authorized to update this resource!',
      );
    }

    const updatedAnimal = await this.animalModel.findByIdAndUpdate(
      id,
      updateAnimalDto,
      {
        new: true,
      },
    );

    if (!updatedAnimal) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }
    return updatedAnimal;
  }

  async remove(id: string, userId: string) {
    const animals = await this.animalModel.findById(id);

    if (userId !== animals.user.toString()) {
      throw new ForbiddenException(
        'You not authorized to delete this resource!',
      );
    }

    const deletedAnimal = await this.animalModel.findByIdAndDelete(id);
    if (!deletedAnimal) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }
    return `Animal with id ${id} deleted successfully!`;
  }

  // For admin only

  // async createMany(createAnimalDto: CreateAnimalDto[]): Promise<Animal[]> {
  //   const newAnimals = await this.animalModel.insertMany(createAnimalDto);
  //   if (!newAnimals) {
  //     throw new NotImplementedException('Failed to create Animal');
  //   }
  //   return newAnimals;
  // }

  // async removeAll() {
  //   const deletedAnimals = await this.animalModel.deleteMany();
  //   if (deletedAnimals.deletedCount === 0) {
  //     throw new NotImplementedException(`Failed to delete all Animal resource!`);
  //   }
  //   return `All Animal resource deleted successfully!`;
  // }
}
