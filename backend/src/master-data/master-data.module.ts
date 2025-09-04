import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterDataService } from './master-data.service';
import { MasterDataController } from './master-data.controller';
import { MasterData } from '../entities/master-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterData]),
  ],
  providers: [MasterDataService],
  controllers: [MasterDataController],
  exports: [MasterDataService],
})
export class MasterDataModule {}
