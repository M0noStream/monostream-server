import {NodeSSH} from 'node-ssh'

import { readFileSync } from 'fs'

const ssh = new NodeSSH()
const host = 'ec2-44-202-52-101.compute-1.amazonaws.com'
var key = readFileSync('./MonoKey.ppk').toString()

// SSH connect
ssh.connect({
    host: host,
    username: 'ubuntu',
    privateKey: key,
    port: 22
}).then((connRes) => {
    ssh.execCommand('./scripts/start_stream.sh monostream').then((result) => {
        console.log('STDOUT: ' + result.stdout)
        console.log('STDERR: ' + result.stderr)
    })
});