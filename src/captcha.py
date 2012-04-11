#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Last modified: Wang Tai (cn.wang.tai@gmail.com)

"""docstring
"""

__revision__ = '0.1'

import urllib2
import random
from data_tools import INIDataTools 
from data_tools import DBDataTools 
from data_tools import DataTools 

class Captcha(object):

    connect = None

    def __init__(self, connect):
        self.dataTools = INIDataTools()
        #self.dataTools = DBDataTools()
        self.connect = connect

    def getVerifyCode(self, account):
        #http://check.ptlogin2.qq.com/check?uin=2221559027&appid=1003903&r=0.8511549890972674
        params = 'uin=%s&appid=1003903&r=0.%d' % (account, random.randrange(9999999999999999))
        req = urllib2.Request('http://check.ptlogin2.qq.com/check?'+params, 
                None, 
                self.connect.headers)
        req.get_method = lambda: 'GET'
        operate = self.connect.open_url(req)

        rt=''.join(operate.readlines())
        #(0,!PTX)
        return rt.split("'")[1],rt.split("'")[3]

    def getImgVerifyCode(self, account):
        fn = self._getCaptchaImg(account)
        rt = ''
        import time
        for i in range(1, 20):
            print 'pls waiting...'
            time.sleep(5)
            #用fn查询db
            rt = self.dataTools.query(fn)
            if rt != None and rt != '':
                return rt
            time.sleep(25)
        return rt

    def _getCaptchaImg(self,account):
        params = 'aid=1003903&r=0.%d&uin=%s' % (random.randrange(9999999999999999) , account)
        req = urllib2.Request('http://captcha.qq.com/getimage?'+params,
                None,
                self.connect.headers)
        resp = self.connect.open_url(req).read()
        file_name = '%s_%s.jpeg' % (account, random.randrange(9999999999999999))
        f = file('./img/%s' % file_name, "wb")
        f.write(resp)
        f.close
        #把account, fn写db
        self.dataTools.insert(file_name, account)
        return file_name

class CaptchaAdmin(object):
    def writeImgVerifyCode(self, file_name, vc):
        #更新db
        dataTools = INIDataTools()
        dataTools.update(file_name, vc)

if __name__ == '__main__':
    from connect_http import ConnectHttp 
    cap = Captcha(ConnectHttp())
    cap._getCaptchaImg('2221559027')
