var blocked      = ["192.168.0.17", "google.com", ""];
var proxyServer  = "SOCKS5 192.168.0.16:3128";
function FindProxyForURL(url, host) {
    var shost = host.split(".").reverse();
    shost = shost[1] + "." + shost[0];
    for(var i = 0; i < blocked.length; i++) {
        if( shost == blocked[i] ) return proxyServer;
    }
    return "DIRECT";
}