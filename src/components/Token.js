function saveSessionTokenInCookie(sessionToken){
    let d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "token=" + sessionToken + ";" + expires;
}

function getSessionTokenFromCookie(){
    console.log(document.cookie);
    if (!document.cookie){
        return null;
    }
    let cookie = document.cookie.split(';').filter((item) => item.includes('token='));
    return cookie[0].substring("token=".length);
}

export { saveSessionTokenInCookie, getSessionTokenFromCookie}