load("//bazel:conf.bzl", _skylib = "skylib")
load("//apple:conf.bzl", _apple = "apple")
load("//javascript:conf.bzl", _javascript = "javascript")
load("//kotlin:conf.bzl", _kotlin = "kotlin")
load("//distribution:conf.bzl", _distribution = "distribution")

skylib = _skylib
apple = _apple
distribution = _distribution
javascript = _javascript
kotlin = _kotlin
