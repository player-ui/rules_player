load("//:conf.bzl", "my_data_dependency")

def _non_module_dependencies_impl(_ctx):
    my_data_dependency()

non_module_extension = module_extension(
    implementation = _non_module_dependencies_impl,
)
