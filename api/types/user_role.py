from enum import Enum


class UserRole(str, Enum):
    '''
        ** Type user scope \n
            Default type = 'user' **
    '''
    user = 'user'
    admin = 'admin'