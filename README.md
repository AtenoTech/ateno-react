# Ateno React

Ateno React provides official UI components for the Ateno Spatial Design API.

Use the built-in `AtenoViewer` component to embed an interactive 3D viewer in your app. It supports `.glb` and `.gltf` models, with loading feedback and touch-friendly controls out of the box.

## Features

- Render `.glb` and `.gltf` models
- Optional iOS USDZ support for AR (`usdzUrl`)
- Built-in loading progress UI
- Floating zoom controls for easy navigation
- Customizable viewer background color

## Installation

```bash
npm install @atenotech/react
```

## Quick Start

Use `AtenoViewer` to render a model from a remote URL.

```jsx
import React from 'react';
import { AtenoViewer } from '@atenotech/react';

export default function RoomDesignScreen() {
  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <AtenoViewer
        modelUrl="https://api.ateno.co/models/scene.glb"
        usdzUrl="https://api.ateno.co/models/scene.usdz"
        backgroundColor="#ffffff"
      />
    </div>
  );
}
```

## API

`AtenoViewer` props:

- `modelUrl` (string, required): Public URL to a `.glb` or `.gltf` model.
- `usdzUrl` (string, optional): iOS AR fallback model URL.
- `backgroundColor` (string, optional): Viewer background color. Default is `#ffffff`.
- `className` (string, optional): CSS class name for the root container.

## Notes

- Ensure the parent container has an explicit height, or the viewer may appear collapsed.
- Host model files with CORS enabled so they can be loaded in the browser.
