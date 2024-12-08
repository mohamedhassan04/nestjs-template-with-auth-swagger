import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AllModules } from 'src';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ...AllModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
