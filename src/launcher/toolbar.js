var {remote, ipcRenderer, shell} = eval('require(\'electron\')'),
    {dialog, Menu, MenuItem, app} = remote.require('electron'),
    menu = new Menu(),
    html = require('nanohtml'),
    terminal = require('./terminal'),
    settings = require('./settings'),
    midilist = remote.getGlobal('midilist')

menu.append(new MenuItem({
    label: 'Start',
    click: ()=>{
        ipcRenderer.send('start')
        settings.disable()
        menu.items[0].visible = false
        menu.items[1].visible = true
    }
}))
menu.append(new MenuItem({
    label: 'New window',
    visible: false,
    click: ()=>{
        ipcRenderer.send('openClient')
    }
}))
menu.append(new MenuItem({
    type: 'separator'
}))
menu.append(new MenuItem({
    label: 'Load',
    click: ()=>{
        settings.load()
    }
}))
menu.append(new MenuItem({
    label: 'Save',
    click: ()=>{
        settings.save()
    }
}))
menu.append(new MenuItem({
    label: 'Save as...',
    click: ()=>{
        settings.saveAs()
    }
}))
menu.append(new MenuItem({
    type: 'separator'
}))
menu.append(new MenuItem({
    label: 'List MIDI Devices',
    click: ()=>{
        midilist()
    }
}))
menu.append(new MenuItem({type: 'submenu' , label: 'Console', submenu: [
    new MenuItem({
        label: 'Clear',
        click: ()=>{
            terminal.clear()
        }
    }),
    new MenuItem({
        label: 'Autoscroll',
        type: 'checkbox',
        checked: true,
        click: function(e){
            terminal.autoSroll = e.checked
        }
    })
]}))
menu.append(new MenuItem({
    type: 'separator'
}))
// menu.append(new MenuItem({
//     label: 'Restart',
//     click: ()=>{
//         app.relaunch()
//         app.exit(0)
//     }
// }))
menu.append(new MenuItem({
    role: 'Quit'
}))

class Toolbar {

    constructor() {

        this.container = DOM.get('osc-toolbar')[0]


        this.container.addEventListener('click', (e)=>{
            this.container.classList.add('on')
            menu.popup({window: remote.getCurrentWindow(), x: parseInt(PXSCALE), y: parseInt(40 * PXSCALE)})
        })

        menu.on('menu-will-close', ()=>{
            this.container.classList.remove('on')
        })

    }

}

module.exports = new Toolbar()
