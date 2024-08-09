import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  constructor(@Inject('OPTIONS') private readonly options: DbModuleOptions) {}
  async read() {
    const filePath = this.options.path;
    try {
      await access(filePath);
    } catch (e) {
      return [];
    }
    const str = await readFile(filePath, {
      encoding: 'utf-8',
    });
    if (!str) {
      return [];
    }
    return JSON.parse(str);
  }
  async write(obj: Record<string, any>) {
    console.log('write', obj, this.options.path, JSON.stringify(obj || []));
    await writeFile(this.options.path, JSON.stringify(obj || []), {
      encoding: 'utf-8',
    });
  }
}
