import { json, type RequestHandler } from '@sveltejs/kit';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'quiz-data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function getSubmissions() {
  try {
    if (!existsSync(DATA_FILE)) {
      return [];
    }
    const data = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveSubmission(submission: any) {
  await ensureDataDir();
  const submissions = await getSubmissions();
  submissions.push(submission);
  await writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const submission = await request.json();

    // Validate submission
    if (!submission.biodata || !submission.answers || !submission.result) {
      return json({ error: 'Invalid submission data' }, { status: 400 });
    }

    // Save to JSON file
    await saveSubmission(submission);

    return json({
      success: true,
      message: 'Submission saved successfully',
      result: submission.result
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return json({ error: 'Failed to save submission' }, { status: 500 });
  }
};

export const GET: RequestHandler = async () => {
  try {
    const submissions = await getSubmissions();
    return json({
      success: true,
      submissions,
      total: submissions.length
    });
  } catch (error) {
    console.error('Error getting submissions:', error);
    return json({ error: 'Failed to get submissions' }, { status: 500 });
  }
};
