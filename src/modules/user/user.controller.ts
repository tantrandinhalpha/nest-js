import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/decorator/role.decorator';
import { TimeoutInterceptor } from 'src/common/interceptor/timeout.interceptor';

@Controller('user')
@UseGuards(RolesGuard)
// @UseInterceptors(new TimeoutInterceptor(5000)) // 5s
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(['admin'])
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @Query('name') name: string,
  ) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await new Promise((resolve) => {
      setTimeout(() => {
        console.log('Promise resolved');
        resolve(this.userService.findAll());
      }, 2000);
    });
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    // throw new BadRequestException('Something is not right');

    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
