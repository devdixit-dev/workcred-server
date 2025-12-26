import fs from 'fs';
import path from 'path';

const makeLogFile = async (filename: string, entry: string) => {
  try{
    const logsDir = path.join(process.cwd(), 'logs');
    console.log(logsDir)

    if(!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const logFile = path.join(logsDir, filename);

    fs.appendFileSync(logFile, entry, 'utf-8');
    console.log(`${filename} logged with data`);
  }
  catch(error) {
    console.error(`Error creating log file: ${error}`);
    return null;
  }
}

export default makeLogFile;