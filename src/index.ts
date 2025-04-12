/* eslint-disable @typescript-eslint/indent */
import httpServer from './server';
import { exit } from 'process';
import network from './config/network';
import connectToDB from './db/init';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
httpServer.listen(network.PORT, async () => {
  try {
    await connectToDB();
    console.log(`API server listening on port: ${network.PORT}`);
  } catch (error) {
    console.log('Cannot run server! ', error);
    exit();
  }
});
