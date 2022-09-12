import { NodeSSH } from 'node-ssh'
import { readFileSync } from 'fs'

const connectionConfig = {
    host: 'ec2-54-88-224-226.compute-1.amazonaws.com',
    username: 'ubuntu',
    privateKey: readFileSync('./MonoKey.ppk').toString(),
    port: 22
}

var ssh = new NodeSSH()


export async function startStream(streamId) {
    if (!ssh.isConnected()) {
        await ssh.connect(connectionConfig);
    }

    return ssh.execCommand(`scripts/start_stream.sh ${ streamId }`)
}

export async function stopStream(streamId) {
    if (!ssh.isConnected()) {
        await ssh.connect(connectionConfig);
    }

    return ssh.execCommand(`scripts/stop_stream.sh ${ streamId }`)
}

export async function createStream(stream) {
    if (!ssh.isConnected()) {
        await ssh.connect(connectionConfig);
    }
    
    let streamId = stream.id;
    let configProps = getConfigProps(stream);

    return ssh.execCommand(`scripts/create_stream.sh ${ streamId } ${ configProps.join(' ') }`)
}

export async function deleteStream(streamId) {}

function getConfigProps(stream) {
    return ['Kafka', 100, true]
}