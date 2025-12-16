// Proposed logic for scripts/pipeline/json-to-bento.ts
import { Glob } from "bun";
import { join } from "path";

async function transform() {
    const jsonGlob = new Glob("results/**/*.json");
    for await (const file of jsonGlob.scan()) {
        const data = await Bun.file(file).json();
        
        // 1. Create unique Locus ID from original filename/ID
        const locusId = data.id || file.split('/').pop()?.replace('.json', '') || 'unknown';
        
        // 2. Build Markdown with Frontmatter
        const markdown = `---
title: "${data.title || 'Untitled Document'}"
source_id: "${data.id}"
type: "court_filing"
date: "${data.date || 'unknown'}"
---

${data.text}
`;
        // 3. Save to our /resonance/docs bucket
        await Bun.write(`resonance/docs/${locusId}.md`, markdown);
    }
}