import { Router } from 'express';
import createNewStream from '../../bl/create-new-stream.js';
import getStreams from '../../bl/get-streams.js';
import startStream from '../../bl/start-stream.js';
import stopStream from '../../bl/stop-stream.js';
import deleteStream from '../../bl/delete-stream.js';

const streamsRouter = Router();

// Get all streams
streamsRouter.get('/', getStreams);

// Add new stream
streamsRouter.post('/', createNewStream)

// Start stream
streamsRouter.put('/start/:id', startStream)

// Stop stream
streamsRouter.put('/stop/:id', stopStream)

// Delete stream
streamsRouter.delete('/:id', deleteStream)

export default streamsRouter;