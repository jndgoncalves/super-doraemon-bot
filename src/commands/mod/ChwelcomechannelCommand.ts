import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { dataSource } from '../..';
import { GuildConfiguration } from '../../typeorm/entities/GuildConfiguration';

export default class ChwelcomechannelCommand extends BaseCommand {
  constructor(
    private readonly guildConfigRepository = dataSource.getRepository(GuildConfiguration)
  ) {
    super('chwelcomechannel', 'mod', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {


    //if you run the command without providing a prefix, return
    if (!args.length) {
      message.channel.send('Please provide a Welcome Channel ID');
      return;
    }

    const [newWelcomeChannelId] = args;
    try {
      const config = client.configs.get(message.guildId!);
      const updatedConfig = await this.guildConfigRepository.save({
        ...config,
        welcomeChannelId: newWelcomeChannelId,
      });
      client.configs.set(message.guildId!, updatedConfig);
      message.channel.send('Welcome Channel updated!');
    } catch (error) {
      console.log(error);
      message.channel.send('Something went wrong!');
    }

  }
}