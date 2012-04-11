#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Last modified: Wang Tai (cn.wang.tai@gmail.com)

"""docstring
"""

__revision__ = '0.1'

import urllib2, urllib

import logging  

from connect_http import ConnectHttp
from captcha import Captcha

class QQLogin(object):

    '''login parameters'''
    params = {}

    connect = None

    def __init__(self, account, password):
        # post paramenters
        self.account = account
        self.password = password

        #request header
        self.connect = ConnectHttp()
        self.headers = self.connect.headers
        self.captcha = Captcha(self.connect)
        

    def login(self):
        self._initPage()

        loginStatus = self._login()
        if loginStatus[0] == '0' and loginStatus[1] == '0':
            self._login2()
        elif loginStatus[0] == '4' and loginStatus[1] == '3':
            # 验证码
            self._initPage()
            loginStatus = self._login()
        return self
 

    def _initPage(self):
        params = {'target':'self',
                'style':5,
                'miao_css':'m_webqq',
                'appid':1003903,
                'enable_qlogin':0,
                'no_verifyimg':1,
                's_url':'http://w.qq.com//loginproxy.html',
                'f_url':'loginerroralert',
                'strong_login':1,
                'login_state':10,
                't':'20120221001'}
        req = urllib2.Request('http://ui.ptlogin2.qq.com/cgi-bin/login?'+urllib.urlencode(params),None, self.headers)
        req.get_method = lambda: 'GET'
        operate = self.connect.open_url(req)
        inputs = InputLister()
        inputs.feed(''.join(operate.readlines()))
        logging.debug(inputs.items)
        self.params = inputs.items
        pass

    def _login(self):
        self.params.update({'u':self.account})
        #md5(md5_3(P.p.value) + K)
        if self.params.has_key('verifycode'):
            self.params.update( { 'p': qmd5.qqmd5(self.password, self.params['verifycode']) })
        else:
            vc = self.captcha.getVerifyCode(self.account)
            if vc[0] == '0':
                self.params.update({ 'verifycode':vc[1] }) 
                self.params.update({ 'p': qmd5.qqmd5(self.password, vc[1]) })
            elif vc[0] == '1':
                #当首次访问显示验证码地时候
                vcode = self.captcha.getImgVerifyCode(self.account)
                self.params.update({ 'verifycode':vcode }) 
                self.params.update({ 'p': qmd5.qqmd5(self.password, vcode) })
                pass
        import random
        qqActionLog = '%d-%d-%d' % (random.randint(2,9), random.randint(3,7), random.randint(2731,374463))
        self.params.update({'action': qqActionLog}) 
        self.params.update({'dumy':''}) 
        logging.debug(self.params)

        queryString = urllib.urlencode(self.params)
        logging.debug(queryString)

        req = urllib2.Request('http://ptlogin2.qq.com/login?'+queryString, None, self.headers);
        req.get_method = lambda: 'GET'
        operate = self.connect.open_url(req)
        exec_rt = ''.join(operate.readlines()).decode("utf-8").encode("utf-8")
        #ptuiCB('0','0','http://w.qq.com//loginproxy.html','0','登录成功！')
        logging.info(exec_rt)
        return eval('self._'+exec_rt.replace(';',''))

    def _ptuiCB(self, signal1, signal2, url, signal3, msg):
        return signal1,signal2,signal3

    def _login2(self):
        cookie = self.connect.getCookie('ptwebqq')
        logging.debug("ptwebqq: "+cookie)
        r='{"status":"online", "ptwebqq":"%s", "passwd_sig":"", "clientid":"17239126", "psessionid":null}' % cookie
        params = {'r':r,
                'clientid':17239126,
                }
        req = urllib2.Request('http://d.web2.qq.com/channel/login2',
                urllib.urlencode(params)+"&psessionid=null",
                self.headers)
        operate = self.connect.open_url(req)
        logging.debug(operate)
        resp = eval(''.join(operate))
        if resp['retcode'] == 0:
            self.connect.ticket.update(resp['result'])
            return 0
        else:
            return -1




from sgmllib import SGMLParser
class InputLister(SGMLParser):
    items = {}
    def start_input(self, attrs):
        name = value = ''
        for k, v in attrs:
            if k=='name': name = v
            if k=='value': value = v
        if name != '' and value != '':
            self.items.update({name:value})

class QqMd5JsCtx(object):
    js_ctx = None;
    def __init__(self):
        self.js_ctx = self._importQqMd5Js()

    def _importQqMd5Js(self):
        import spidermonkey
        js_ctx = spidermonkey.Runtime().new_context()
        script = open('./js/qq-login-md5.js').read()
        js_ctx.execute(script);
        return js_ctx

    def qqmd5(self, password, verifycode):
        md5Str='md5(md5_3("'+password+'") + "'+verifycode.upper()+'")'
        return self.js_ctx.execute(md5Str)

    def testmd5(self, password, verifycode):
        md5Str='md5("'+password+'" + "'+verifycode.upper()+'")'
        return self.js_ctx.execute(md5Str)

qmd5 = QqMd5JsCtx()


#function binl2hex(H) {
#        var E = hexcase ? "0123456789ABCDEF": "0123456789abcdef";
#        var G = "";
#        for (var F = 0; F < H.length * 4; F++) {
#                G += E.charAt((H[F >> 2] >> ((F % 4) * 8 + 4)) & 15) 
#                        + E.charAt((H[F >> 2] >> ((F % 4) * 8)) & 15)
#        }
#        return G
#}
if __name__ == '__main__':
    import spidermonkey
    js_ctx = spidermonkey.Runtime().new_context()
    script = open('./js/qq-login-md5.js').read()
    js_ctx.execute(script);
    from md5 import md5
    print js_ctx.execute('md5("wangtai")')
    print md5("wangtai").hexdigest().upper()
    print js_ctx.execute('core_md5("wangtai", "wangtai".length*chrsz)')
