def scope_name(name, suffix):
    if name == native.package_name().split("/")[-1]:
        return suffix

    return "%s-%s" % (name, suffix)
    