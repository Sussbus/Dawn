var fs = require('fs')

function addCommand(name, items) {
        //Reads commands.json file
        fs.readFile(__dirname + '/js/commands.json', 'utf-8', function(err, data) {
            if (err) throw err

            var arrayOfObjects = JSON.parse(data)
            arrayOfObjects.commands.push({
                name: name,
                items: items
        });
        //console.log(arrayOfObjects) <-- for debugging
        //Writing new JSON object into commands.json file
        fs.writeFile(__dirname + '/js/commands.json', JSON.stringify(arrayOfObjects, null, 4), 'utf-8', function(err) {
            if (err) throw err
            console.log('Command added!')
        }) 
    });
}

function saveCommand() {
    vex.dialog.buttons.YES.text = 'Save';
    vex.dialog.prompt({
        message: 'What is your command\'s name?',
        placeholder: 'Command name',
        className: 'vex-theme-default',
        callback: function (value) {
          var items = taggle_input.getTags().values;
          var name = String(value);
          //Adds command to commands.json
          addCommand(name, items);
          //Write's shell file for commands
          writeShellFile(items);
          //Clears inputs
          taggle_input.removeAll();
          //For debugging purposes (cleared also)
          document.getElementById('log').innerHTML = '';
          //Alerts user command saved
          vex.dialog.buttons.YES.text = 'Ok';
          vex.dialog.alert({
            message: 'Command saved',
            className: 'vex-theme-top',
          })

        }
    })
  }

  function writeShellFile(items) {
    var fs = require('fs')
    //Generates random file name (for now)
    let filename = Math.random().toString(36).substring(7);
    //Items taken from taggle
    let shell_items = items.join(' && ');
    //Contents of shell file created into ./shell folder
    let content = "#!/bin/bash" +
                  "\nclear" +
                  "\necho 'Executing Dawn Command...'" +
                  "\necho -ne '#####                     (33%)\\r'" +
                  "\nsleep 1" +
                  "\necho -ne '#############             (66%)\\r'" +
                  "\nsleep 1" +
                  "\necho -ne '#######################   (100%)\\r'" +
                  "\necho -ne '\\n'" +
                  "\ncd ~ && " + shell_items + "" +
                  "\nexec bash";
    fs.writeFile(__dirname + '/shell/' + filename + '.sh', content, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    fs.chmod(__dirname + "/shell/" + filename + ".sh", 0755, (err) => {
        if (err) throw err;
        console.log('File permissions updated');
    });
}
//Completely not ready to use --needs work
function openCommand() {
    require('child_process').spawn('sh', [__dirname + '/shell/work.sh'], {stdio: 'inherit'});
}