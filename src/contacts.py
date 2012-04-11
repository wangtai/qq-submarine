#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Last modified: Wang Tai (cn.wang.tai@gmail.com)

"""docstring
"""

import urllib, urllib2
import logging

__revision__ = '0.1'

class QQContacts(object):

    connect = None

    def __init__(self, qqLogin):
        self.connect = qqLogin.connect;

    
    def getContacts(self):
        params='r={"h":"hello","vfwebqq":"%s"}' % self.connect.ticket['vfwebqq']
        req = urllib2.Request('http://s.web2.qq.com/api/get_user_friends2',
                params,
                self.connect.headers);
        resp =  self.connect.open_url(req)
        info=eval(''.join(resp))
        if info['retcode'] != 0:
            pass
        friends_uin = [f['uin'] for f in info['result']['friends']]
        acts = [self._getAccount(uin) for uin in friends_uin if friends_uin.index(uin) < 10]
        logging.info('qq_contact_ids:'+str(acts))
        return acts
        

    def _getAccount(self, uin):
        import time
        params='tuin=%d&verifysession=&type=1&code=&vfwebqq=%s&t=%d' % (uin, self.connect.ticket['vfwebqq'], int(time.time()*1000))
        req = urllib2.Request('http://s.web2.qq.com/api/get_friend_uin2?'+params,
                None,
                self.connect.headers);
        resp = self.connect.open_url(req)
        rt = eval(''.join(resp))
        if rt['retcode'] == 0:
            return rt['result']['account']
        else:
            return -1

