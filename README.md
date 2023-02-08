# UnityDesktopCI

A bare-bones self-hosted CI solution integrating GitHub and Unity.
 
# For Server

## Prerequisites

Install your project's Unity version somewhere on your server. Clone your project's repo somewhere on your server.

## Setup

Edit the `settings.ini` file, here you will enter the path to your local repo clone, as well as where you want the builds to be placed (this could be your FTP server).

Run INSTALL.ps1 and locate your desired Unity editor EXE version (it will be set as an envar), then run START.bat to run the application.

It will continuously poll the GitHub commits RSS feed for the desired repository and then run a build when a commit is titled `[Build]`.

# For Client

You must install the unity package located within this repo into your Unity project before the CI can work, this contains the build functionality invoked by the server.

Whenever you need the project to be built, title a commit with `[Build]` (it is case-insensitive).
