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

    } else {
      console.log('No configuration was found! Creating one...');

      const newConfig = this.guildConfigRepository.create({
        guildId: guild.id,
        guildName: guild.name,
        createdAt: new Date().toISOString(),
      });

      //const oldConfig = await this.guildConfigRepository.save(newConfig);
      return this.guildConfigRepository.save(newConfig);
    }
  }
} 