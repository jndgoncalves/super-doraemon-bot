import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "guild_configurations" })
export class GuildConfiguration {

    //strictPropertyInitialization: false on tsconfig.json  instead of "id!: number" to fix linter error
    @PrimaryGeneratedColumn()
    id: number;

    //Guilds should only have one configuration
    @Column({ unique: true, name: 'guild_id' })
    guildId: string;

    @Column({ default: '/' })
    prefix: string;

    @Column({ name: 'welcome_channel_id' })
    welcomeChannelId: string;
}