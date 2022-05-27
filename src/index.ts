require('dotenv').config();
import 'reflect-metadata';
import { registerCommands, registerEvents } from './utils/registry';
import config from '../slappey.json';
import DiscordClient from './client/client';
import { Collection, Intents } from 'discord.js';
import { createConnection, getRepository } from 'typeorm';
import { GuildConfiguration } from './typeorm/entities/GuildConfiguration';
const client = new DiscordClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

(async () => {
  await createConnection({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: 3306,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
    //only true in development, updates entities on every request
    synchronize: true,
    entities: [GuildConfiguration],
  });

  /* client.prefix = config.prefix || client.prefix; */

  //saving all configs in memory to not have to query the database every time
  const configRepo = getRepository(GuildConfiguration);
  const guildConfig = await configRepo.find();
  const configs = new Collection<string, GuildConfiguration>();

  guildConfig.forEach((config) => {
    configs.set(config.guildId, config);
  });

  client.configs = configs;
  console.log(client.configs);

  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.BOT_TOKEN);
})();