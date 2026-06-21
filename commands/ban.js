const { SlashCommandBuilder, PermissionFlagsBits }= require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannt einen Benutzer vom Server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

        async execute(interaction) {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason') || 'Kein Grund angegeben';

            if (!user) {
                return interaction.reply({ content: 'Bitte gib einen Benutzer an, den du bannen möchtest.', ephemeral: true});
                
            }
        }
}