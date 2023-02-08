Add-Type -AssemblyName System.Windows.Forms

$FileBrowser = New-Object System.Windows.Forms.OpenFileDialog -Property @{ InitialDirectory = $Env:Programfiles }

$FileBrowser.Filter = "EXE (*.exe) | *.exe"

$null = $FileBrowser.ShowDialog()

[Environment]::SetEnvironmentVariable("CURRENT_UNITY_EXE", $FileBrowser.FileName, "User")