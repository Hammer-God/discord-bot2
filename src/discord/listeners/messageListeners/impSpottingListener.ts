import { Message } from 'discord.js';

import config from '../../../config';
import { ChannelListener } from '../types';
import { setMessageExpiration } from '../utils';

const IMP_MESSAGE_REGEX = /^(.*) imp(ling)* on w([0-9]{3})(.*)?$/;

/**
 * Set messages to expire after X minutes.
 */
const MESSAGE_LIFESPAN = config.imp_spotting_time * 60 * 1000;

/**
 * Set error message to expire after 1 minute.
 */
const ERROR_LIFESPAN = 60 * 1000;

/**
 * This listener is for the #imp-spotting channel.
 * The goal is to force users to adhere to a specifc message format
 *  and delete messages after a period of time.
 */
const impSpottingListener: ChannelListener = {
  channels: [
    /**
     * OSRS Leagues bot
     */
    '933191356996780122',

    /**
     * Bot Testing Server
     */
    '933184281457614868',
  ],
  onChannelMessage: async (message: Message) => {
    if (message.author.bot) {
      setMessageExpiration(message, ERROR_LIFESPAN);
      return;
    }

    if (message.content.toLocaleLowerCase().match(IMP_MESSAGE_REGEX)) {
      setMessageExpiration(message, MESSAGE_LIFESPAN);
    } else {
      const response = await message.reply(
        'Please use the format: "X imp on w### description". Example: Lucky imp on w420 somewhere in Morytania.',
      );
      setMessageExpiration(message, 100);
      setMessageExpiration(response, ERROR_LIFESPAN);
    }
  },
};

export default impSpottingListener;
