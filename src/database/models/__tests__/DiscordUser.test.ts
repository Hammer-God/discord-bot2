import DiscordUser from '../DiscordUser';

describe('DiscordUser', () => {
  test('seed should populate', async () => {
    const discordUser = await DiscordUser.findByPk('1234');
    expect(discordUser.twisted_name).toBe('test');
  });
});
