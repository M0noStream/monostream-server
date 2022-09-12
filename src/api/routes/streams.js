import { Router } from 'express';
import createStream from '../../bl/streams/create-stream.js';
import getStreams from '../../bl/streams/get-streams.js';
import startStream from '../../bl/streams/start-stream.js';
import stopStream from '../../bl/streams/stop-stream.js';
import deleteStream from '../../bl/streams/delete-stream.js';

const streamsRouter = Router();

// Get all streams
streamsRouter.get('/', getStreams);
streamsRouter.get('/:id', getStreams);

// Add new stream
streamsRouter.post('/', createStream)

// Start stream
streamsRouter.put('/start/:id', startStream)

// Stop stream
streamsRouter.put('/stop/:id', stopStream)

// Delete stream
streamsRouter.delete('/:id', deleteStream)

export default streamsRouter;