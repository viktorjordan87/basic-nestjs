export class CreateDogDto {
  name: string;
  age: number;
  breed: string;
}

export type IDog = CreateDogDto;
