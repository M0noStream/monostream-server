const {NodeSSH} = require('node-ssh')
const ssh2 = require('ssh2')

const ssh = new NodeSSH()
const host = 'ec2-54-234-89-181.compute-1.amazonaws.com'
var key = require('fs').readFileSync('./MonoKey.ppk').toString()
console.log('Started running')

// SSH connect
ssh.connect({
    host: host,
    username: 'ubuntu',
    privateKey: key,
    port: 22
}).then((connRes) => {
    ssh.execCommand('sudo systemctl status monostream;sudo systemctl status monostream').then((result) => {
        console.log('STDOUT: ' + result.stdout)
        console.log('STDERR: ' + result.stderr)
    })
});