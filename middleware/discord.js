const {body, param, query, validationResult} = require('express-validator');

class DiscordValidation {

    static shortenUrlValidation(){
        return[
            body('url')
            .notEmpty()
            .withMessage('URL is required!')
            .isURL()
            .withMessage('Must be a valid URL!'),
            
            body('discordUserId')
            .notEmpty()
            .withMessage('Discord Id of user is required!')
            .isString()
            .withMessage('Discord Id of user must be a string!'),
            body('custom')
            .optional()
            .isString()
            .withMessage('Custom Short Code must be a string!')
            .isLength({min : 3, max : 20})
            .withMessage('Custom short Code Must be a String!')
            .matches(/^[a-zA-Z0-9_-]+$/)
            .withMessage('Custom short code can only contain letters, numbers, hyphens and underscores!')
        ];
    }


    static getUserUrlsValidation()
    {
        return[
            param('discordUserId')
            .notEmpty()
            .withMessage('Discord Id of user is required!')
            .isString()
            .withMessage('Disocrd Id of user must be string!'),
            query('limit')
            .optional()
            .isInt({min : 3, max : 100})
            .withMessage('Limit must be between 1-100')
        
        ]
    }

    static deleteUrlValidation()
    {
        return[
            param('shortId')
            .notEmpty()
            .withMessage('ShortId is required')
            .isString()
            .withMessage('ShortId must be a string')
            
        ]
    }


    static handleValidationErrors(req,res,next)
    {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({
                error : 'Validation Failed',
                details: errors.array()
            })
        }
        next();
    }


}


module.exports = DiscordValidation;