---
title: "Git"
description: "Git is the most advanced distributed version control system in the world."
date: "2018-07-23T10:45:46"
tags: ["Git"]
legacy: true
hexoUrl: "/2018/07/23/Git/"
---

## What is Git?
* Git is the most advanced distributed version control system in the world.

## What is the difference between SVN (Subversion) and Git?
* SVN is a centralized version control system: the repository is kept in one place, on a central server. So before you start working, you have to download the latest version from the central server, and when you finish, you have to push your work back to it. That is very inconvenient. A centralized version control system also only works when you are connected to the network.
##### Just like this picture

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/subversion.png?raw=true)

* Git is a distributed version control system. Its advantage is that there is no central repository: every laptop holds a complete repository, so you can work without a network connection.
##### Just like this picture

![](https://github.com/kentanvictor/STUDY/blob/Image/old_image/git.png?raw=true)

## Some useful commands:
* mkdir: XX (create an empty directory)/*XX is the directory name*/
* pwd: (show the path of the current directory)
* git: init (turn the current directory into a Git repository; this creates a hidden folder)
* git add XX (add file XX to the staging area)
* git commit -m "XX" (commit with a message)/*XX is the message*/
* git status (show the repository status)
* git log (show the history)
* git diff XX (show what has changed in file XX)
* git rm XX (delete file XX)
* cat XX (show the file contents)
* git checkout -b A (create branch A and switch to it)
* git checkout master (go back to the master branch)
* git clone HTTPS (clone from a remote repository)
* git branch name (create a branch)
* git branch -d A (delete branch A)
* git push origin master (push the master branch to the remote repository)
# How to use Git Bash
## Create
When you want to upload a project to GitHub, first create a new project on your GitHub account
New repository
Then there is a Clone or download button at the bottom right
Click it and you will see Clone with HTTPS
Use Git or checkout with SVN using the web URL.
Copy the address
In the folder of the project you want to upload
right-click and choose Git Bash Here
First type git clone + address
A folder with the project name will appear
It contains the hidden .git folder and ReadMe.md
Cut everything in that folder into the root directory of the project you want to upload
Then type in Git Bash
git add .
Then commit locally
git commit -m "//type your message here, e.g. First commit."
Finally, sync the commit to the remote repository, that is, GitHub:
git push origin master
## Update
When you need to update a project you have already uploaded
go to the updated project
right-click and choose Git Bash Here
then type in the command line
git pull + address
After pulling the updates, type in the command line
git add .
and repeat the same steps as before
Commit locally
git commit -m "//type your message here, e.g. First commit."
Finally, sync the commit to the remote repository, that is, GitHub:
git push origin master
