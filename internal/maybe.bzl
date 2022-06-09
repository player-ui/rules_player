def maybe(rule, name, **kwargs):
    if not native.existing_rule(name):
        rule(name = name, **kwargs)
