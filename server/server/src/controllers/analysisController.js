const { spawn } = require('child_process');
const path = require('path');

const analyzeRatings = (req, res) => {
    const { ratings } = req.body;
    const scriptPath = path.resolve(__dirname, '../../../neural-network/src/predict.py');
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(ratings)]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                // Extract the JSON array from the result string
                const jsonArrayMatch = result.match(/\[.*\]/);
                if (jsonArrayMatch) {
                    const jsonArray = jsonArrayMatch[0];
                    res.json({ result: JSON.parse(jsonArray) });
                } else {
                    throw new Error('No JSON array found in the result');
                }
            } catch (e) {
                res.status(500).json({ error: 'Failed to parse result', details: e.message, rawResult: result });
            }
        } else {
            res.status(500).json({ error: 'Python script error', details: error });
        }
    });
};

module.exports = { analyzeRatings };