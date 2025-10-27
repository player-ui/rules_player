"""Tests for utils.py"""

from ..util import cool_function


class TestCoolFunction:
    """Test cool_function"""

    def test_cool_function_positive(self):
        """returns true when arg is cool"""
        assert cool_function("cool")

    def test_cool_function_negative(self):
        """returns true when arg is not cool"""
        assert not cool_function("not cool")
