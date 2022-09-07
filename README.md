![alt](https://github.com/M0noStream/monostream-client/blob/main/client/public/mono-stream-logo.ico)

# MonoStreamServer

## Description
The `MonoStreamServer` is a web api server which provides the api of [`MonoStream`](https://github.com/M0noStream).

## API Drilldown
Enables to manage the streams in the system:
- **View** your streams using `GET` */api/streams*.
- **Create** a new stream, using `POST` */api/streams* and a stream payload.
- **Start** a stream, using `PUT` */api/streams/:streamId*.
- **Stop** a stream, using `PUT` */api/streams/:streamId*.
- **Delete** a stream, using `DELETE` */api/streams/:streamId*.

## Tecgnologies Used
- `NodeJs`