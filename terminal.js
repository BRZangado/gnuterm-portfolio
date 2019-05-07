var prompt = "root:~#"

var termout
var cmdline

var projects = {
}

function init() {
    termout = document.getElementById('term')
    cmdline = document.getElementById('cmdline')
    cmdline.focus()
    document.getElementById('prompt').innerHTML = prompt
    cmdline.autofocus = true

    println("\nType 'help' to list available commands\n")
    document.body.addEventListener("keydown", function(e) {
        if (!e) e = window.event;
        var key = e.key
        if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-=_+[]{}\\|;:'\",.<>/? ".includes(key)) {
            cmdline.innerHTML += key
        }
        if (key == 'Backspace') {
            cmdline.innerHTML = cmdline.innerHTML.substring(0, cmdline.innerHTML.length - 1)
        }
        if (key == 'Enter') {
            termout.innerHTML += prompt + "&nbsp;" + cmdline.innerHTML + '<br>'
            var args = cmdline.innerHTML.split(" ")
            switch (args[0]) {
                case "": break
                case "help":
                    help()
                    break
                case "ls":
                    ls()
                    break
                case "cd":
                    cd(args[1])
                    break
                case "colour":
                    colour(args[1])
                    break
                case "clear":
                    clear()
                    break
                default:
                    println("bash: " + args[0] + ": command not found.")
                    break
            }
            cmdline.innerHTML = ''
        }
        window.scrollTo(0, document.body.scrollHeight);
    })
}

function println(s) {
    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == " ") {
            termout.innerHTML += '&nbsp;'
            continue
        }
        if (s.charAt(i) == "\n") {
            termout.innerHTML += '<br>'
            continue
        }
        termout.innerHTML += s.charAt(i)
    }
    termout.innerHTML += '<br>'
}

function help() {
    println('Portfolio GNU bash')
    println(" cd [project]    Go to project")
    println(" ls              Lists projects")
    println(" clear           Clears the terminal")
    println(" help            Displays available commands")
}

function ls() {
    println('total ' + Object.keys(projects).length)
    for (var p in projects) {
        if (projects.hasOwnProperty(p)) {
            println(p)
        }
    }
}

function cd(p) {
    if (projects[p]) window.location.href = projects[p]
    else println("cd: The project \"" + p + "\" does not exist. Type 'ls' for a list of available projects.")
}

function clear() {
    termout.innerHTML = ''
}
