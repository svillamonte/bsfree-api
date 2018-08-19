# BSFree API

API for filtering out irrelevant images from a social media feed.

[![Build status](https://muddlegrip.visualstudio.com/Muddlegrip/_apis/build/status/bsfree-api-CI)](https://muddlegrip.visualstudio.com/Muddlegrip/_build/latest?definitionId=2)

This API grabs the latests shouts from the [Taringa](https://www.taringa.net) API and keeps only those that match the given conditions.

## Architecture rundown

Built in Node.js using the following Azure stack:

- Functions
- Computer Vision, from Cognitive Services
- Table storage, Blobs and Queues

### Functions description

1. **retrieve-shouts** Calls the Taringa API to get an array of the latest shouts. Each JSON object gets cleaned and only the necessary fields kept, before enqueuing them to be processed by...
2. **normalise-shouts** Each new cleaned shout gets applied filters to make sure the image included can be processed and hasn't been processed before. Those that check out are queued to be dealt with by...
3. **analyse-images** Gets the input from Computer Vision for every normalised shout. Those that contain dogs (main condition to satisfy for this version) are whitelisted.
4. **register-shout** Whitelisted shouts' attached images are downloaded and saved to Blob storage, while a new entry in Table storage is added, to keep track of them.
