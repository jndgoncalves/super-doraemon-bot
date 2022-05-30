import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { GuildConfiguration } from '../../typeorm/entities/GuildConfiguration';
import { dataSource } from '../..';

export default class ChprefixCommand extends BaseCommand {
  constructor(
    private readonly guildConfigRepository = dataSource.getRepository(GuildConfiguration)
  ) {
    super('chprefix', 'mod', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {

    //if you run the command without providing a prefix, return
    if (!args.length) {
      message.channel.send('Please provide a prefix');
      return;
    }

    const [newPrefix] = args;
    try {
      const config = client.configs.get(message.guildId!);
      const updatedConfig = await this.guildConfigRepository.save({
        ...config,
        prefix: newPrefix,
      });
      client.configs.set(message.guildId!, updatedConfig);
      message.channel.send('Prefix updated!');
    } catch (error) {
      console.log(error);
      message.channel.send('Something went wrong!');
    }

  }
}