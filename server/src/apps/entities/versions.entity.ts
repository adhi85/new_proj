import { App } from './app.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from './pages.entity';

@Entity({ name: 'versions' })
export class Version extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'app_id' })
  appId: string;

  @Column({ default: false })
  released: boolean;

  @Column('simple-json', {
    nullable: true,
  })
  definition: object;

  // @Column('simple-json', {
  //     default: {}
  // })
  // globalSettings: object;

  @ManyToOne(() => App, (app) => app.versions, { onDelete: 'CASCADE' })
  @JoinTable()
  app: App;

  @OneToMany(() => Page, (page) => page.version, { cascade: ['remove'] })
  pages: Page[];
}
