import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype: metaType }: ArgumentMetadata) {
    if (!metaType || !this.toValidate(metaType)) {
      return value;
    }
    const object = plainToInstance(metaType, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: this.formatErrors(errors),
      });
    }
    return value;
  }

  private toValidate(metaType: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metaType);
  }

  private formatErrors(errors: any[]): any[] {
    return errors.map((err) => {
      const constraints = err.constraints ? Object.values(err.constraints) : [];

      if (err.children && err.children.length > 0) {
        constraints.push(...this.formatErrors(err.children).flat());
      }

      return {
        field: err.property,
        errors: constraints,
      };
    });
  }
}
