
MediaPlayer.utils.TokenAuthentication = function () {
    "use strict";
    var tokenAuthentication = {type:MediaPlayer.utils.TokenAuthentication.TYPE_QUERY};
    return {
        debug:undefined,
        getTokenAuthentication:function () {

            return tokenAuthentication;

        },
        setTokenAuthentication:function (object) {

            tokenAuthentication = object;

        },
        checkRequestHeaderForToken:function(request) {

            if (tokenAuthentication.name !== undefined &&
                request.getResponseHeader(tokenAuthentication.name) !== null) {

                tokenAuthentication.token = request.getResponseHeader(tokenAuthentication.name);
                this.debug.log(tokenAuthentication.name+" received: " + tokenAuthentication.token);

           }
        },
        addTokenAsQueryArg:function(url) {

            if(tokenAuthentication.name !== undefined && tokenAuthentication.token !== undefined) {
                if (tokenAuthentication.type === MediaPlayer.utils.TokenAuthentication.TYPE_QUERY) {

                    var modifier = url.indexOf('?') === -1 ? '?' : '&';
                    url += modifier + tokenAuthentication.name +"=" + tokenAuthentication.token;
                    this.debug.log(tokenAuthentication.name+" is being appended on the request url with a value of : " + tokenAuthentication.token);

                }
            }

            return url;
        },
        setTokenInRequestHeader:function(request) {

            if (tokenAuthentication.type === MediaPlayer.utils.TokenAuthentication.TYPE_HEADER) {

                request.setRequestHeader(tokenAuthentication.name, tokenAuthentication.token);
                this.debug.log(tokenAuthentication.name+" is being set in the request header with a value of : " + tokenAuthentication.token);

            }

            return request;
        }
    };
};

MediaPlayer.utils.TokenAuthentication.TYPE_QUERY = "query";
MediaPlayer.utils.TokenAuthentication.TYPE_HEADER = "header";

