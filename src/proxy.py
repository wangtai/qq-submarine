#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Last modified: Wang Tai (cn.wang.tai@gmail.com)

"""docstring
"""

__revision__ = '0.1',


_PROXY_HOST = []
    
import urllib2, random
import logging
def getProxy():
    proxy = random.choice(_PROXY_HOST)
    logging.info('proxy:'+proxy)
    return urllib2.ProxyHandler({'http':proxy}) 

if __name__ == '__main__':
    import socket
    socket.setdefaulttimeout(5)
    for host in  _PROXY_HOST :
        try:
            url = 'http://'+host
            result = urllib2.Request(url)
            urllib2.urlopen(host)
            print host
        except Exception,e:
#            print host
#            print e
            pass 


