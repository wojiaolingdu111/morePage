const wn = window.navigator;
const ua = wn.userAgent;

const isAndroid = /(Android);?[\s/]+([\d.]+)?/i.test(ua);
const isIpad = /(iPad).*OS\s([\d_]+)/i.test(ua);
const isIpod = /(iPod)(.*OS\s([\d_]+))?/i.test(ua);
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/i.test(ua);
const isWechat = /micromessenger/i.test(ua);
const isAlipay = /alipayclient/i.test(ua);
const isWindows = /Win/i.test(wn.platform);
const isMac = /Mac/i.test(wn.platform);

export {isIphone,isWechat,isAlipay,isAndroid,isIpad,isIpod,isWindows,isMac}
