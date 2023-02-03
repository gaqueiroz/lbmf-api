import { ApiTags } from '@nestjs/swagger';
import {
  applyDecorators,
  Controller as NestJSController,
} from '@nestjs/common';

export function Controller(prefix?: string, title?: string): ClassDecorator {
  return applyDecorators(
    ...(title ? [ApiTags(title)] : []),
    ...(prefix ? [NestJSController(prefix)] : [])
  );
}
