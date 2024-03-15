def android(
    name = "androidsdk",
    api_level = None,
    build_tools_version = None
):
    native.android_sdk_repository(name = name, api_level = api_level, build_tools_version = build_tools_version)