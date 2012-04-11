#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Last modified: Wang Tai (cn.wang.tai@gmail.com)

"""docstring
"""

__revision__ = '0.1'


class DataTools(object):

    def __init__(self):
        pass

    def query(self, file_name):
        pass

    def insert(self, file_name, account):
        pass

    def update(self, file_name, vc):
        pass

class DBDataTools(object):

    def __init__(self):
        pass

    def query(self, file_name):
        pass

    def insert(self, file_name, account):
        pass

    def update(self, file_name, vc):
        pass

import ConfigParser
class INIDataTools(DataTools):

    def __init__(self):
        DataTools.__init__(self)
        self.config = ConfigParser.ConfigParser()

    def query(self, file_name):
        self.config.read('./db/captcha.ini')
        vc = self.config.get(file_name, 'verifycode')
        return vc
        pass

    def insert(self, file_name, account):
        self.config.read('./db/captcha.ini')
        self.config.add_section(file_name)
        self.config.set(file_name, 'account',account)
        self.config.set(file_name, 'verifycode','')
        self.config.write(open('./db/captcha.ini', 'wr+'))
        pass

    def update(self, file_name, vc):
        self.config.read('./db/captcha.ini')
        self.config.set(file_name, 'verifycode',vc)
        self.config.write(open('./db/captcha.ini', 'wr+'))
        pass

if __name__ == '__main__':
    dt = INIDataTools()
    dt.insert('2221559027_514111247770433.jpeg', 2221559027)
#    dt.update('2221559027_514111247770433.jpeg','nfvd')
#    print dt.query('2221559027_514111247770433.jpeg')
