"%CURRENT_UNITY_EXE%" -projectPath %1 -accept-apiupdate -batchMode -quit -executeMethod CyanCI.BuildCommand.BuildWin32 -CyanCIBuildPath %2
@echo off
REM This script is a part of contraband.software's CyanCI package