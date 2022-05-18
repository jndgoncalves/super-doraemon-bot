import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "guild_configurations" })
export class GuildConfiguration {
    @PrimaryGeneratedColumn()
    id: number; //tsconfig.json strictPropertyInitialization: false instead of "id!: number"

    @Column()
    prefix: string = '/';
}