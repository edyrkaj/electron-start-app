const ipAddresses = document.getElementById('ip-addresses')
const mainData = window.electronAPI.getMainData();
const ips = window.electronAPI.getIpAddresses();

ipAddresses.appendChild(
    document.createTextNode(JSON.stringify(mainData))
);

ipAddresses.appendChild(
    document.createTextNode(JSON.stringify(ips))
);

// window.Electron.ipcRenderer.on('ip', (event, arg) => {
//     console.log(arg, 'arg');
//     console.log(event, 'event');
// });

