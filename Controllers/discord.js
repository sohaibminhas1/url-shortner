const DiscordUrlService = require('../service/discordurl');

class DiscordController{
    static async shortenUrl(req,res) 
    {
        console.log('Request body:', req.body);
    console.log('discordUserId:', req.body.discordUserId);
    console.log('typeof discordUserId:', typeof req.body.discordUserId);
        try{
            const{url,custom,discordUserId} = req.body;

            const result = await DiscordUrlService.createShortUrl({ 
                url,
                custom,
                discordUserId,
                req
            });
            res.json(result);
        }catch(error)

        {
    
        console.log('Discord shorten error:', error)
         if (error.message === 'URL is required' || 
            error.message === 'Discord user ID is required' ||
            error.message === 'Custom short code already exists') {
            return res.status(400).json({ error: error.message });
            }
            res.status(500).json({error : 'Internal Server Error' });
        }

    }

    static async getUserUrls(req,res) 
    {
        try{
            const {discordUserId} = req.params;
            const limit = parseInt(req.query.limit) || 10;
        
            const urls = await DiscordUrlService.getUserUrls(discordUserId, limit); 
            res.json(urls)
        } catch(error)
        {
            console.log('Discord user URLS error:', error);
            res.status(500).json({error : 'Internal Server Error'});
        }
    }

    static async deleteUrl(req,res)
    {
        try{
            const {shortId} = req.params;
            const {discordUserId} = req.body;

            const result= await DiscordUrlService.deleteUrl(shortId, discordUserId)
            res.json(result);
        }catch(error)
        {
            console.log('Discord delete URL error', error) 

            if(error.message ==='User not found' ||error.message ==='URL not found or you do not have permission to delete it') 
            {
                return res.status(404).json({error : error.message});
            }

            res.status(500).json({error : 'Internal Server Error'})
        }
    }
}


module.exports = DiscordController;