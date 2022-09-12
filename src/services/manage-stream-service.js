import { NodeSSH } from 'node-ssh'
import { readFileSync } from 'fs'

const connectionConfig = {
    host: 'ec2-3-234-3-245.compute-1.amazonaws.com',
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

export async function deleteStream(streamId) {
    if (!ssh.isConnected()) {
        await ssh.connect(connectionConfig);
    }

    return ssh.execCommand(`scripts/delete_stream.sh ${ streamId }`)
}

function getConfigProps(stream) {
    return [stream.isTransacted || true,
        stream.innerDepthQueue || 100,
        stream.source.typeName,
        stream.source.cluster,
        stream.source.consumerGroup || 'None',
        stream.source.autoCommit || true,
        stream.source.consumeTimeoutMS || 10000,
        stream.source.username || 'None',
        stream.source.password || 'None',
        stream.source.sourceName,
        stream.destination.typeName,
        stream.destination.cluster,
        stream.destination.vhost || '/',
        stream.destination.username || 'None',
        stream.destination.password || 'None',
        stream.destination.exchange || 'None',
        stream.destination.sourceName
    ]
}