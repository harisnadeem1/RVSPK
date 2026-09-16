import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const replaceDailyNewswire = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select a PDF file',
      });
    }

    const uploadDir = path.resolve(
      __dirname,
      '../private/pdfs/notifications'
    );

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    const filePath = path.join(
      uploadDir,
      'daily-newswire.pdf'
    );

    await fs.writeFile(
      filePath,
      req.file.buffer
    );

    return res.status(200).json({
      success: true,
      message: 'Daily Newswire PDF replaced successfully',
    });

  } catch (error) {
    console.error(
      'Replace Daily Newswire Error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to replace Daily Newswire PDF',
    });
  }
};