# Chatbot Flow Builder

A simple, extensible chatbot flow builder built with React and React Flow.  
Drag & drop message nodes, connect them with arrowed edges, edit node text, delete nodes/edges, and save/load flows to your browser’s local storage.

**Live Demo:** [Vercel Link](https://chatbot-flow-builder-sigma-lac.vercel.app/)

**Source Code:** [Github Link](https://github.com/Blazzzze/chatbot-flow-builder)

---

## Features

- **Text Node**  
  Drag & drop “Message” nodes onto the canvas.

- **Edges & Arrowheads**  
  Connect nodes with edges, each displaying a closed arrowhead at the target.

- **Settings Panel**  
  Click any node to open a side panel and edit its message text.

- **Delete**  
  Select one or more nodes or edges and remove them with the Delete button.

- **Save & Load Flows**  
  Save named snapshots of your flow into localStorage and reload them later from the Node Panel.

- **Extensible Architecture**  
  Easily register new node types in `nodeTypes` and expand the Nodes Panel.

---

## Tech Stack

- **React** (with TypeScript)  
- **React Flow** for graph rendering  
- **Vercel** for zero-config deployment  

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or later  
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/Blazzzze/chatbot-flow-builder.git
cd chatbot-flow-builder
npm install
