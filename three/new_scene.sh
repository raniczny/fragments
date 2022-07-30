#!/usr/bin/env sh

scene_root="scenes/$1/"
files="$scene_root/files/"
src="$scene_root/src/"
dist="$scene_root/dist/"

mkdir "$scene_root"
mkdir "$files" && cp ./shared/files/index.html "$files"
mkdir "$src"
mkdir "$dist"
