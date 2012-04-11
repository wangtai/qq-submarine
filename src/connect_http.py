#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Last modified: Wang Tai (cn.wang.tai@gmail.com)

"""docstring
    请求http内容，支持cookie
"""

__revision__ = '0.1'


import sys, re, cookielib, urllib2, urllib
import logging

#USE_COOKIE_FILE=True
USE_COOKIE_FILE=False

UserAgents=["Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.22 (KHTML, like Gecko) Chrome/19.0.1049.3 Safari/535.22",
        "IE6.0:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
        "IE7.0:Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
        "IE8.0:Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1)",
        "IE9.0:Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)",
        "Firefox3.5:Mozilla/5.0 (compatible; rv:1.9.1) Gecko/20090702 Firefox/3.5",
        "Firefox3.6:Mozilla/5.0 (compatible; rv:1.9.2) Gecko/20100101 Firefox/3.6",
        "Firefox4.0:Mozilla/5.0 (compatible; rv:2.0) Gecko/20110101 Firefox/4.0",
        "Firefox6.0:Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0.2) Gecko/20100101 Firefox/6.0.2",
        "Chrome11.0:Mozilla/5.0 (compatible) AppleWebKit/534.21 (KHTML, like Gecko) Chrome/11.0.682.0 Safari/534.21",
        "Opera11.0:Opera/9.80 (compatible; U) Presto/2.7.39 Version/11.00",
        "Maxthon3.0:Mozilla/5.0 (compatible; U) AppleWebKit/533.1 (KHTML, like Gecko) Maxthon/3.0.8.2 Safari/533.1",
        "Android:Mozilla/5.0 (Linux; U; Android 2.2) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 ",
        "iPhone:Mozilla/5.0 (iPhone; U; CPU OS 4_2_1 like Mac OS X) AppleWebKit/532.9 (KHTML, like Gecko) Version/5.0.3 Mobile/8B5097d Safari/6531.22.7",
        "iPad:Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/4.0.2 Mobile/8C148 Safari/6533.18.5",
        "Safari5.0:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_7) AppleWebKit/534.16+ (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4" ]

'''cookie file name'''
_cookieFileName = "cookie"


_referer = 'http://ui.ptlogin2.qq.com/cgi-bin/login?target=self&style=5&mibao_css=m_webqq&appid=1003903&enable_qlogin=0&no_verifyimg=1&s_url=http%3A%2F%2Fw.qq.com%2Floginproxy.html&f_url=loginerroralert&strong_login=1&login_state=10&t=20120221001'

class ConnectHttp(object):

    _cookieJar = cookielib.CookieJar() if not USE_COOKIE_FILE else cookielib.MozillaCookieJar(_cookieFileName)
    
    '''login ticket
    vfwebqq, psessionid, cip, uin'''
    ticket = {}

    headers = {}
    
    
    def __init__(self):
        import random
        self.headers.update({'User-Agent': random.choice(UserAgents), 'Referer': _referer})
        '''url opener'''
        self._opener = self._buildOpener() 


    def _buildOpener(self):
        if USE_COOKIE_FILE:
            try:
                self._cookieJar.load(ignore_discard=True, ignore_expires=True)
            except Exception:
                self._cookieJar.save(_cookieFileName, ignore_discard=True, ignore_expires=True);
        debugHandler = urllib2.HTTPHandler(debuglevel = 1) 
        cookieHandler = urllib2.HTTPCookieProcessor(self._cookieJar)
        import proxy
        opener1 = urllib2.build_opener( 
                cookieHandler, 
                #proxy.getProxy(),
                #debugHandler
                )
        urllib2.install_opener(opener1)
        return opener1;
    
    
    def saveCookie(self):
        if USE_COOKIE_FILE:
            self._cookieJar.save(_cookieFileName, ignore_discard=True, ignore_expires=True);
        pass
    
    def loadCookie(self):
        if USE_COOKIE_FILE:
            self._cookieJar.load(ignore_discard=True, ignore_expires=True)
        pass
    
    def getCookie(self, name):
        cookies =  [v for v in self._cookieJar if v.name==name]
        cookie = cookies[0].value if len(cookies) >= 1 else ""
        return cookie
    
    
    def open_url(self, req):
        '''
        params = {'target':'self',}
        req = urllib2.Request('http://test/?'+urllib.urlencode(params),None, ConnectHttp.headers)
        req.get_method = lambda: 'GET'
        '''
        self.loadCookie()
    
        logging.info('request_url:'+req.get_full_url())
        [logging.debug('data:'+data) for data in str(req.get_data()).split('&')]
        logging.debug('method:'+req.get_method())
        [logging.debug('cookie:'+str((v.name, v.value))) for v in self._cookieJar ]
        operate = self._opener.open(req)
        #logging.debug('response:'+''.join(operate))
    
        self.saveCookie()
        return operate

if __name__ =='__main__':
    ConnectHttp()
