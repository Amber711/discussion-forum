import docker
from docker.errors import *
import os
import uuid
import shutil

#To communicate with the Docker daemon, instantiate a client.
client = docker.from_env()
IMAGE_NAME='amberwei/cs503_coj_demo'
#the current folder
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
TEMP_BUILD_DIR = "%s/tmp/" % CURRENT_DIR

SOURCE_FILE_NAMES = {
    "java": "Example.java",
    "python": "example.py"
}

#file name after build
BINARY_NAMES = {
    "java": "Example",
    'python': 'example.py'
}

BUILD_COMMANDS = {
    "java" : 'javac',
    'python': 'python'
}

EXECUTE_COMMANDS = {
    "java": "java",
    "python": "python"
}

client = docker.from_env()

def load_image():
    try:
        #when image is not found locally, docker will try to pull it from dockerhub
        client.images.get(IMAGE_NAME)
    except ImageNotFound:
        print "Image not found locally. loading from Dockerhub..."
        client.images.pull(IMAGE_NAME)
        # error occurs when docker trying to pull image from dockerhub,likely because of networking, etc.
    except APIError:
        print "Image not found locally. Error occurs when pulling image from Docker hub"
        return
    print "Images [%s] loaded" % IMAGE_NAME


def build_and_run(code, lang):
    print "build_and_run in utils got called"
    result = {'build': None, 'run': None, 'error': None}

    #use uuid to generate a unique folder name
    source_file_parent_dir_name = uuid.uuid4()


    #the dir address for the code folder on ubuntu: /tmp/uuid4() result value
    source_file_host_dir = "%s/%s" % (TEMP_BUILD_DIR, source_file_parent_dir_name)


    #folder address on docker
    source_file_guest_dir = "/test/%s" % (source_file_parent_dir_name)

   #create a folder on ubuntu.
    make_dir(source_file_host_dir)

    #write the code file provided from flask into the folder we created on ubuntu
    with open('%s/%s' % (source_file_host_dir, SOURCE_FILE_NAMES[lang]), 'w') as source_file:
         source_file.write(code)
    #build
    try:
        client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir)
        print "source built."
        result['build'] = 'OK'
    except ContainerError as e:
        print "Build failed."
        result['build'] = e.stderr
        #if errors occur during building, delete the folder
        shutil.rmtree(source_file_host_dir)
        return result


    try:
        log = client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" % (EXECUTE_COMMANDS[lang], BINARY_NAMES[lang]),
            volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
            working_dir=source_file_guest_dir)
        print "--- code Executed."
        print log
        result['run'] = log

    except ContainerError as e:
        print "execution failed."
        result['run'] = e.stderr
        shutil.rmtree(source_file_host_dir)


    shutil.rmtree(source_file_host_dir)
    print "build and run result:", result
    return result

def make_dir(dir):

    try:
        os.mkdir(dir)
        print "Tmp build diretory [%s] created." % dir

    except OSError:
        print "Temp build directory exists"