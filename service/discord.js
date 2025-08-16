const User = require("../Models/user");
const bcrypt = require("bcrypt"); 
const crypto = require("crypto");

class DiscordUserService{
    //Create or get a Discord User
    //@param {string} = This gives the Discord User Id
    //returns {Promise<Objects>} - User object (Fixed: Obejcts -> Objects)

    static async CreateOrGetDiscordUser(discordUserId){
        const email= `discord_${discordUserId}@bot.local`;
        console.log('Looking for user with email:', email);
        let user = await User.findOne({email});
     
        if (user) {
        
        if (user.authProvide !== undefined) {
            console.log('Cleaning up corrupted authProvide field...');
            await User.updateOne(
                { _id: user._id }, 
                { $unset: { authProvide: 1 } }
            );
            console.log('Cleaned up corrupted field');
            
            user = await User.findOne({email});
        }
        
        console.log('Found existing user:', user._id);
        return user;
    }


    if (!user)
    {
        const randomPassword = crypto.randomBytes(32).toString('hex');

        const hashedPassword = await bcrypt.hash(randomPassword, 10); 

        user = await User.create({
            name: `Discord User ${discordUserId.slice(-4)}`,
            email: email,
            password: hashedPassword, 
            role: `NORMAL`,
            authProvider: 'discord' 
        })
        console.log(`Created A Discord User ${email}`)
    }
       return user; 
    }
    
    static async getDiscordUser(discordUserId) 
    {
        return await User.findOne({email : `discord_${discordUserId}@bot.local`})
    }

    static generateDiscordEmail(discordUserId){
        return `discord_${discordUserId}@bot.local` 
    }
}

module.exports = DiscordUserService;