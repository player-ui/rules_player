load("@rules_jvm_external//:defs.bzl", "artifact")

def parse_coordinates(maven):
    targets = []
    for coordinate in maven:
        targets.append(artifact(coordinate))
    return targets
