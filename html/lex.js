class Lex {
    constructor(botName, botAlias, poolId) { 
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: poolId,
        });
        this._lexruntime = new AWS.LexRuntime();

        this._botName = botName;
        this._botAlias = botAlias;
    }

    async postContent(blob, userId) {
        const config = {
            botName: this._botName,
            botAlias: this._botAlias,
            contentType: 'audio/x-l16; sample-rate=16000',
            userId: userId,
            accept: 'audio/mpeg',
            inputStream: blob
        }
        return new Promise( (resolve,reject) => {
            this._lexruntime.postContent(config, (err, data) =>  {
                if (err) {
                    reject(err);
                } else {resolve(data);
                }
            });
        });
    }
}