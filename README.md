# CompassCAD Next (Project Sova, WIP)

This will be the next generation desktop app for CompassCAD, rewritten in React, while trying to port core experiences from the old (except extensions, sorry about that!) desktop app you know and love, while presenting with a new UI layout while keeping the UI2 design you love. From now on, CompassCAD Project Sova will begin to ship from version v2.2.0.

**EXCLUSIVE: This version of CompassCAD will be the first version accessible for Mac users! Windows and Linux still get our support.**

## Project Structure
- `resources`: Some supplement images to fill in as icons (soon)
- `src/main`: The Electron backend that handles everything that the frontend wants to fullfill
- `src/preload`: Just some preload that exposes the Electron thingy to the React instance. Nothing special.
- `src/renderer`: The React frontend that handles almost everything.