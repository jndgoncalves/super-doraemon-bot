// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { Guild, GuildMember, TextChannel } from 'discord.js';
import BaseEvent from '../utils/structures/BaseEvent';
import DiscordClient from '../client/client';

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }

  async run(client: DiscordClient, member: GuildMember) {
    console.log('Welcome to the server,', member.user.tag);
    const config = client.configs.get(member.guild.id);
    console.log(config, 'config');
    if (!config) return;
    if (config.welcomeChannelId) {
      const channel = member.guild.channels.cache.get(config.welcomeChannelId) as TextChannel;
      if (!channel) console.log('No channel found');
      else channel.send(`Welcome to the server, ${member}`);
    } else {
      console.log('No welcome channel set');
    }
  }
}