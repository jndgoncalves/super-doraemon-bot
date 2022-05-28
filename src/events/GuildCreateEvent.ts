// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';
import { getRepository } from 'typeorm';
import { GuildConfiguration } from '../typeorm/entities/GuildConfiguration';

export default class GuildCreateEvent extends BaseEvent {

  constructor(
    private readonly guildConfigRepository = getRepository(GuildConfiguration)
  ) {
    super('guildCreate');
  }

  async run(client: DiscordClient, guild: Guild) {

    console.log(`Hello, joined ${guild.name}`);

    const config = await this.guildConfigRepository.findOneBy({
      guildId: guild.id
    });

    if (config) {
      console.log('A configuration was found!');
      //add new config to client configs so that it is avaiable when the bot is added to a new guild
      client.configs.set(guild.id, config);
    } else {
      console.log('No configuration was found! Creating one...');

      const newConfig = this.guildConfigRepository.create({
        guildId: guild.id,
        guildName: guild.name,
        createdAt: new Date().toISOString(),
      });

      //await so that the config is in the database before is added to the client configs
      const savedConfig = await this.guildConfigRepository.save(newConfig);
      client.configs.set(guild.id, savedConfig);

      console.log(client.configs, 'configs guildcreate');
    }
  }
} 