const fs = require('fs')
const ini = require('ini')
const shell = require('shelljs')
const Parser = require('rss-parser')
const util = require('util')

function readINISettings() {
    let config = ini.parse(fs.readFileSync(__dirname + '/../settings.ini', 'utf-8'))
    return { repoPath: config.repo.localpath, buildPath: config.server.buildpath }
}

function readRemoteRSS() {
    shell.cd(readINISettings().repoPath)

    let remote = shell.exec('git config --get remote.origin.url', { silent: true })
    if (remote.code !== 0) {
        console.log('Error: Git commit failed')
        shell.exit(1)
    } else {
        return remote.stdout.trim().replace(".git", "/commits/master.atom")
    }
}

function invokeBuild() {
    shell.cd(readINISettings().repoPath)
    console.log("Pulling Git repository")
    shell.exec("git pull")
    console.log("Building Unity Project")
    let buildCommand = shell.exec('"' + __dirname + '\\..\\Scripts\\UnityBuild.bat" "' + readINISettings().repoPath + '" "' + readINISettings().buildPath + '"')
    writeToLogFile(buildCommand.stdout)
    if (buildCommand.code !== 0) {
        console.log('Error: Build command failed')
        shell.exit(1)
    } else {
        console.log("Build Complete")
    }
}

function pollCommit(firstRun = false) {
    parser.parseURL(readRemoteRSS()).then((res) => {
        let item = res.items[0]

        if (item.title.trim().toUpperCase() == "[BUILD]" && item.isoDate != lastBuildCommitISODate) {
            lastBuildCommitISODate = item.isoDate
            if (!firstRun) {
                console.log("\n")
                console.log("NEW BUILD TRIGGERED BY COMMIT:")
                console.log(res.items[0])

                invokeBuild()
            }
        }
        
        setTimeout(() => {
            pollCommit(false)
        }, 5000)
    })
}

function writeToLogFile(text) {
    fs.appendFileSync(__dirname + '/CyanCIServer.log', text)
}

// Main

//duplicate console output to logfile
var logStdout = process.stdout
console.log = function () {
    writeToLogFile(util.format.apply(null, arguments) + '\n')
    logStdout.write(util.format.apply(null, arguments) + '\n')
}
console.error = console.log

console.log("\n\nSERVER STARTED: " + new Date().toISOString() + "\n")

var lastBuildCommitISODate = ""

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git')
    shell.exit(1)
}

const parser = new Parser()

pollCommit(true)