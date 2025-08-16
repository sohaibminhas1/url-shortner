const {nanoid} = require('nanoid');
const URL = require('../Models/url');
const DiscordUserService = require('./discord');

class DiscordUrlService {
    /**
     * Create a shortened URL for Discord user
     * @param {Object} params - Parameters object
     * @param {string} params.url - Original URL
     * @param {string} params.custom - Custom short ID (optional)
     * @param {string} params.discordUserId - Discord user ID
     * @param {Object} params.req - Express request object for host info
     * @returns {Promise<Object>} Created URL object
     */
    static async createShortUrl({url,custom,discordUserId,req})
    {
        if(!url){
            throw new Error('URL is required');
        }
        if(!discordUserId)
        {
            throw new Error('Discord user ID is required'); // Fixed: userid -> user ID
        }
    
    
        const discordUser = await DiscordUserService.CreateOrGetDiscordUser(discordUserId);

        console.log('Discord User ID:', discordUserId);
        console.log('Found/Created User:', discordUser);
        
        const shortId = custom || nanoid(8);


        if(custom){
            const existing = await URL.findOne({shortId : custom});
            if(existing){
                throw new Error('Custom short code already exists'); // Fixed: The -> Custom
            }
        }

        const urlEntry = await URL.create({
            shortId: shortId,
            redirectURL: url,
            visitHistory: [],
            createdBy: discordUser._id,
            discordUserId: discordUserId
        });

        return {
            shortId: urlEntry.shortId,
            shortUrl: `${req.protocol}://${req.get('host')}/url/${urlEntry.shortId}`,
            redirectUrl: urlEntry.redirectURL,
            totalClicks: 0,
            createdAt: urlEntry.createdAt,
             discordUserId: urlEntry.discordUserId 
        }

    }


        static async getUserUrls(discordUserId,limit = 10){
            const discordUser = await DiscordUserService.CreateOrGetDiscordUser(discordUserId);
            if(!discordUser){
                return [];
            }
        
        
            const urls = await URL.find({createdBy: discordUser._id})
            .sort({createdAt: -1})
            .limit(limit);
        
        
            return urls.map(url =>({
                shortId: url.shortId,
                redirectURL : url.redirectURL,
                totalClicks : url.visitHistory.length,
                createdAt: url.createdAt,
                discordUserId: url.discordUserId
            }))
        }

        static async deleteUrl(shortId, discordUserId){
            const discordUser = await DiscordUserService.getDiscordUser(discordUserId);
            if(!discordUser)
            {
                throw new Error('User not found') 
            }
            const urlEntry = await URL.findOne({shortId, createdBy: discordUser._id});
            if(!urlEntry){
                throw new Error('URL not found or you do not have permission to delete it') 
            }

            await URL.deleteOne({_id: urlEntry._id});

            return {
                message:'URL was successfully deleted', 
                originalURL: urlEntry.redirectURL,
                totalClicks: urlEntry.visitHistory.length
            }
        }

}

module.exports = DiscordUrlService;