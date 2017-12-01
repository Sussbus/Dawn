var fs = require('fs')
const isValidInput = (input) =>  input.length > 0;

function addCommand(name, items) {
    if (!fs.existsSync(__dirname + '/js/commands.json')) {
        fs.writeFile(__dirname + '/js/commands.json', '', 'utf-8', function(err) {
            if (err) throw err
            console.log('file addded!')
        }); 
    }
    //Reads commands.json file
    fs.readFile(__dirname + '/js/commands.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = data ? JSON.parse(data) : {commands:[]}

        arrayOfObjects.commands.push({
            name: name,
            items: items
        });
        //Writing new JSON object into commands.json file
        fs.writeFile(__dirname + '/js/commands.json', JSON.stringify(arrayOfObjects, null, 4), 'utf-8', function(err) {
            if (err) throw err            
            const electron = require('electron').remote;
            const BrowserWindow = electron.BrowserWindow;

            console.log('Command added!')
            
            const allWindows = BrowserWindow.getAllWindows()

            allWindows.forEach((bw) => {
                if (bw === BrowserWindow.getFocusedWindow()) return;
                bw.webContents.reloadIgnoringCache()
              })
        }); 
    });
}


function saveCommand() {
    vex.dialog.buttons.YES.text = 'Save';
    vex.dialog.prompt({
        message: 'What is your command\'s name?',
        placeholder: 'Command name',
        className: 'vex-theme-default',
        callback:  (value) => {
            if (!value) return 
            const isValidInput = (input) =>  input.length > 0;            
            var items = taggle_input.getTags().values;
            var name = String(value);

            if (!isValidInput(items)) {
                alert('Please enter commands!');
                return
            }

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
            });
        }
    });
}

deleteCommand = (name) => {
    if (confirm('Do you want to delete this command?')){
        //Reads commands.json file
        fs.readFile(__dirname + '/js/commands.json', 'utf-8', function(err, data) {
            if (err) throw err
            var arrayOfObjects = data ? JSON.parse(data) : {commands:[]}

            arrayOfObjects.commands = arrayOfObjects.commands.filter(cmd => cmd.name !== name);

            //Writing new JSON object into commands.json file
            fs.writeFile(__dirname + '/js/commands.json', JSON.stringify(arrayOfObjects, null, 4), 'utf-8', function(err) {
                if (err) throw err
                const electron = require('electron').remote;
                const BrowserWindow = electron.BrowserWindow;

                console.log('Command deleted!')
                                
                const allWindows = BrowserWindow.getAllWindows()
    
                allWindows.forEach((bw) => {
                    if (bw === BrowserWindow.getFocusedWindow()) 
                        bw.webContents.reloadIgnoringCache();
                  });
            }); 
        });
    }
}