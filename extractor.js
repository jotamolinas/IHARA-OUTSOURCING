import fs from 'fs';
import path from 'path';

const historyDir = './migrated_prompt_history';

const run = () => {
  try {
    const files = fs.readdirSync(historyDir).filter(f => f.endsWith('.json'));
    console.log(`Found ${files.length} history files.`);

    // Sort files chronologically by filename (timestamp is in name)
    files.sort();

    files.forEach(jsonFile => {
      const filePath = path.join(historyDir, jsonFile);
      const fileLabel = jsonFile.replace('prompt_', '').replace('.json', '');
      console.log(`Processing history log: ${fileLabel}`);

      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      data.forEach((step, stepIndex) => {
        if (step.payload && step.payload.entries) {
          step.payload.entries.forEach(entry => {
            const relativePath = entry.path;
            if (entry.diffs) {
              entry.diffs.forEach((diff, diffIndex) => {
                // If the target is empty, we have a full replacement (complete code)
                if (!diff.target || diff.target.trim() === '') {
                  const outDir = path.join('./extracted', fileLabel);
                  if (!fs.existsSync(outDir)) {
                     fs.mkdirSync(outDir, { recursive: true });
                  }
                  
                  // Maintain folders inside the output
                  const fullDestPath = path.join(outDir, relativePath);
                  const fullDestDir = path.dirname(fullDestPath);
                  if (!fs.existsSync(fullDestDir)) {
                     fs.mkdirSync(fullDestDir, { recursive: true });
                  }
                  
                  fs.writeFileSync(fullDestPath, diff.replacement);
                  console.log(`Saved exact: ${fullDestPath}`);
                }
              });
            }
          });
        }
      });
    });

    console.log("Extraction complete!");
  } catch (error) {
    console.error("Error running extractor:", error);
  }
};

run();
