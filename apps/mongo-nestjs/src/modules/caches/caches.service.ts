import { Inject, Injectable } from '@nestjs/common';
import { CreateCachDto } from './dto/create-cach.dto';
import { UpdateCachDto } from './dto/update-cach.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CachesService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  create(createCachDto: CreateCachDto) {
    return 'This action adds a new cach';
  }

  findAll() {
    return `This action returns all caches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cach`;
  }

  update(id: number, updateCachDto: UpdateCachDto) {
    return `This action updates a #${id} cach`;
  }

  remove(id: number) {
    return `This action removes a #${id} cach`;
  }

  setKey(key: string, value: any, ttl: number = 0) {
    return this.cacheManager.set(key, value, ttl);
  }

  getKey(key: string) {
    return this.cacheManager.get(key);
  }

  deleteKey(key: string) {
    return this.cacheManager.del(key);
  }
}
