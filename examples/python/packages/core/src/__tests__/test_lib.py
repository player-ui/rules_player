"""Tests for lib.py"""

from ..lib import even_cooler_function


class TestEvenCoolerFunction:
    """Test cool_function"""

    def test_cool_function_positive(self):
        """returns true when arg is not cool"""
        assert not even_cooler_function("cool")

    def test_cool_function_negative(self):
        """returns true when arg is cool"""
        assert even_cooler_function("not cool")
