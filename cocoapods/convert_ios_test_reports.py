#!/usr/bin/env python3
from sys import argv
from json import loads
from subprocess import run
from os import path, getcwd
from urllib.request import url2pathname
from urllib.parse import urlparse
from argparse import ArgumentParser

def getTestActionOutput(bep_file, trainer):
  with open(bep_file) as f:
    zips = []
    for line in f:
      zips += getOutputZips(line)

    results = getXcResultPaths(zips)
    convertToJunit(results, trainer)

def getOutputZips(bep_json_string):
  zips = []
  jsonObj = loads(bep_json_string)
  files = jsonObj.get('testResult', {}).get('testActionOutput', [])
  if len(files) > 0:
    outputZips = list(filter(lambda x: x['name'] == 'test.outputs__outputs.zip', files))
    for outputZip in outputZips:
      path = url2pathname(urlparse(outputZip['uri']).path)
      zips.append(path)
  return zips

def getXcResultPaths(zip_paths):
  result_paths = []
  for zip_path in zip_paths:
    folder = path.dirname(zip_path)
    if run(['unzip', '-o', zip_path, '-d', folder]).returncode != 0:
      print('error unzipping ' + zip_path)
    else:
      result_path = path.join(folder, 'test.xcresult')
      if path.exists(result_path):
        result_paths.append(result_path)
  return result_paths
      
def convertToJunit(xcresult_paths, command):
  for result in xcresult_paths:
    run([command, '--path', result])

if __name__ == '__main__':
  parser = ArgumentParser(description='Run `trainer` xcresult transformer on test outputs')
  parser.add_argument('build_event_json', type=str, help='The Build Event Protocol json file from the test run')
  parser.add_argument('trainer_executable', type=str, help='Path to the `trainer` executable')

  args = parser.parse_args()
  getTestActionOutput(args.build_event_json, args.trainer_executable)