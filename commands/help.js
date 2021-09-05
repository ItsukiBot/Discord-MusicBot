const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Menu bot",
  usage: "[perintah]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "menu"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `「 ${client.user.username} 」`,
              client.botconfig.IconURL
            )
            .setColor("RANDOM")
            .setFooter(
              `Untuk mendapatkan info command silahkan ketik ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }help [perintah]`
            ).setDescription(`${Commands.join("\n")}
  
  Versi Bot: v${require("../package.json").version}
  [✨ Server](${
    client.botconfig.SupportServer
  }) | [GitHub Owner](https://github.com/Adiixyz) | [Sc Bot Whatsapp](https://github.com/itsuki-chan/wa)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `❌ | tidak dapat menemukan perintah itu`);

      let embed = new MessageEmbed()
        .setAuthor(`Perintah ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Alias", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Usage",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix Untuk Perintah - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

SlashCommand: {
    options: [
      {
        name: "menu",
        description: "List menu bot",
        value: "menu",
        type: 3,
        required: false
      },
    ],
    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */

    run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );
  
      let Embed = new MessageEmbed()
            .setAuthor(
              `[ ${client.user.username} ]`,
              client.botconfig.IconURL
            )
            .setColor("RANDOM")
            .setFooter(
              `Untuk mendapatkan info command silahkan ketik ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }help [perintah]`
            ).setDescription(`${Commands.join("\n")}
  
  Versi Bot : v${require("../package.json").version}
  [✨ Server](${
    client.botconfig.SupportServer
  }) | [GitHub Owner](https://github.com/Adiixyz) | [Sc Bot Whatsapp](https://github.com/Itsuki-chan/wa)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find((x) => x.aliases && x.aliases.includes(args[0].value));
        if (!cmd)
          return client.sendTime(interaction, `❌ | tidak dapat menemukan perintah itu`);
  
        let embed = new MessageEmbed()
          .setAuthor(`Perintah ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Alias", cmd.aliases.join(", "), true)
          .addField(
            "Usage",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Permissions",
            "Member: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Prefix - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );
  
        interaction.send(embed);
      }
  },
}};
