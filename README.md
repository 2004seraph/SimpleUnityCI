# Self-Hosted Unity CI

A simple, fast, and ugly CI solution for Unity. For Github repos.
 
# For Server

## Prerequisites

 - NodeJS.
 
 - Git.

 - You must install your project's Unity version somewhere on your server.

 - You must clone your project's repo somewhere on your server.

## Setup

Edit the `settings.ini` file, here you will enter the path to your local repo clone, as well as where you want the builds to be placed (this could be your FTP server). These settings can be edited whilst the server is running, since they are fetched from the file every time they are needed.

Run INSTALL.ps1 and locate your desired Unity editor EXE version (it will be set as an envar), then run START.bat to run the application.

It will continuously poll the GitHub commits RSS feed for the desired repository and then run a build when a commit is titled `[Build]`.

## Info

The server will keep a log of all of it's actions in a file called `CyanCIServer.log`, this is located within the `Server` directory.

# For Client

## Setup

There are no prerequisites or setup for clients, except you must install the unity package located within this repo (`software.contraband.cyanci`, and you must install it by copying the directory to your project's `Packages/` folder) before the CI can work, this contains the build functionality invoked by the server.

## Usage

Whenever you need the project to be built, title a commit with `[Build]` (it is case-insensitive).
