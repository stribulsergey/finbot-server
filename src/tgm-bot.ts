import { TG_TOKEN } from '@config/config';
import { Bot } from 'grammy';

const TgmBot = new Bot(TG_TOKEN);
export default TgmBot;
