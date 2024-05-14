from pydantic import BaseModel

class OptionType(BaseModel):
    '''
        ** Create model options in question
    '''
    yes_totally: bool
    yes_needs_readjustment: bool
    no: bool