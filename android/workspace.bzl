def android(name = "androidsdk"):
    native.android_sdk_repository(name = name, api_level = 31, build_tools_version = "30.0.2")
