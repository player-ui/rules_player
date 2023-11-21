
def remove_duplicates(data):
    filtered = []
    for d in data:
        if d in filtered:
            continue
        filtered.append(d)
    return filtered

def is_test_file(file, test_file_pattern):
    for p in test_file_pattern:
        if p in file:
            return True
    return False

def filter_false(arr):
    filtered = []
    for f in arr:
        if f:
            filtered.append(f)

    return filtered

def include_exts(files, file_patterns):
    return filter_false([f if is_test_file(f, file_patterns) else None for f in files])