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