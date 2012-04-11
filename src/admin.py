#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Last modified: Wang Tai (cn.wang.tai@gmail.com)

"""docstring
"""

__revision__ = '0.1'

import sys
from data_tools import INIDataTools 

if __name__ == '__main__':
    dt = INIDataTools()
    dt.update(sys.argv[1],sys.argv[2])
    print 'writen: '+ dt.query(sys.argv[1])
