"""
Example library that imports another local library
"""

from example_utils.util import cool_function

def even_cooler_function(arg: str) -> bool:
    """a even cooler function"""
    return not cool_function(arg)
