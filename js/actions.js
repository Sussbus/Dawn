var fs = require('fs');
const electron = require('electron').remote;
const path = require('path');
const app = electron.app;

const isValidInput = (input) =>  input.length > 0;
const commandsPath = path.join(app.getPath('userData'),'commands.json');

function addCommand(name, items) {
    if (!fs.existsSync(commandsPath)) {
        fs.writeFile(commandsPath, '', 'utf-8', function(err) {
            if (err) throw err
            console.log('file addded!')
        }); 
    }
    //Reads commands.json file
    fs.readFile(commandsPath, 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = data ? JSON.parse(data) : {commands:[]}

        arrayOfObjects.commands.push({
            name: name,
            items: items
        });
        //Writing new JSON object into commands.json file
        fs.writeFile(commandsPath, JSON.stringify(arrayOfObjects, null, 4), 'utf-8', function(err) {
            if (err) throw err            
            const electron = require('electron').remote;
            const BrowserWindow = electron.BrowserWindow;

            console.log('Command added!')
            
            const allWindows = BrowserWindow.getAllWindows()

            allWindows.forEach((bw) => {
                if (bw === BrowserWindow.getFocusedWindow()) return;
                bw.webContents.reloadIgnoringCache();
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
        fs.readFile(commandsPath, 'utf-8', function(err, data) {
            if (err) throw err
            var arrayOfObjects = data ? JSON.parse(data) : {commands:[]}

            arrayOfObjects.commands = arrayOfObjects.commands.filter(cmd => cmd.name !== name);

            //Writing new JSON object into commands.json file
            fs.writeFile(commandsPath, JSON.stringify(arrayOfObjects, null, 4), 'utf-8', function(err) {
                if (err) throw err
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