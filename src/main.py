#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Last modified: Wang Tai (cn.wang.tai@gmail.com)

"""docstring
"""

__revision__ = '0.1'


import logging  
logging.basicConfig(filename='./qq-submarine.log', 
        #level=logging.DEBUG, 
        level=logging.INFO, 
        format='%(asctime)s %(levelname)s %(message)s')  

from login import QQLogin
from contacts import QQContacts

if __name__ == '__main__':
    qq = QQLogin('2329548841', 'testqq')
    contact = QQContacts(qq.login())
    print contact.getContacts()
