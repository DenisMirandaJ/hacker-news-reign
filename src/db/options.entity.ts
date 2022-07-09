import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NewsLoadTimes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true, default: 'NOW()' })
  timeStamp: Date;
}
