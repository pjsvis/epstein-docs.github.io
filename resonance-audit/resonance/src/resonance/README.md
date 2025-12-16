# Resonance Engine

The **Resonance Engine** is the core semantic layer of Polyvis, responsible for vector embedding, storage, and retrieval.

## Components

### Vector Daemon
The **Vector Daemon** (`daemon.ts`) is a lightweight HTTP service that keeps the embedding model (FastEmbed) loaded in memory. This avoids the high cost of model loading during CLI operations.

- **Source:** `src/resonance/daemon.ts`
- **Port:** 3010 (Default)
- **Lifecycle:** Managed via `bun run daemon [start|stop|status]`

### Configuration
Configuration is handled in `polyvis.settings.json` (formerly `resonance.settings.json`).

### Services
- **Embedder:** Handles text-to-vector conversion.
- **Database:** `bun:sqlite` interface for `resonance.db`.
