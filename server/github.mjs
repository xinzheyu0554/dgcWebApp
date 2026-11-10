// GitHub Contents API. Only ever called server-side by an authenticated administrator.
// Uploaded files remain inside public/documentation/newsletter/<year>/ in the Git repo.
const BASE = 'https://api.github.com/repos';

function settings() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token || !owner || !repo || !branch || !/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo) || !/^[A-Za-z0-9_./-]+$/.test(branch)) {
    throw new Error('GitHub integration is not configured correctly.');
  }
  return { token, owner, repo, branch };
}

function contentUrl(config, path) {
  // encode each segment, never let user input produce a different API route.
  const encoded = path.split('/').map(encodeURIComponent).join('/');
  return `${BASE}/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/contents/${encoded}`;
}

export async function githubContents(method, path, body) {
  const config = settings();
  const url = new URL(contentUrl(config, path));
  if (method === 'GET') url.searchParams.set('ref', config.branch);
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'doncaster-garden-club-netlify',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify({ ...body, branch: config.branch }) } : {}),
  });
  if (!response.ok) {
    if (response.status === 404 && method === 'GET') return null;
    const message = response.status === 401 || response.status === 403
      ? 'GitHub access denied. Check GITHUB_TOKEN permissions and repository access.'
      : response.status === 409 ? 'GitHub branch changed during the request. Please try again.'
      : response.status === 422 ? 'GitHub rejected the file or commit. Check the repository branch and file path.'
      : `GitHub operation failed (HTTP ${response.status}).`;
    const error = new Error(message);
    error.status = response.status >= 500 ? 502 : response.status;
    throw error;
  }
  return response.json();
}

export async function githubUploadPdf(repoPath, bytes, title) {
  const found = await githubContents('GET', repoPath);
  if (found) {
    const error = new Error('A PDF with this filename already exists in GitHub.');
    error.status = 409;
    throw error;
  }
  return githubContents('PUT', repoPath, {
    message: `content(newsletter): add ${title}`.slice(0, 180),
    content: Buffer.from(bytes).toString('base64'),
  });
}

export async function githubDeletePdf(repoPath, title) {
  const found = await githubContents('GET', repoPath);
  if (!found?.sha || found.type !== 'file') {
    const error = new Error('PDF is no longer in GitHub. Please check the repository before retrying.');
    error.status = 409;
    throw error;
  }
  return githubContents('DELETE', repoPath, {
    message: `content(newsletter): remove ${title}`.slice(0, 180),
    sha: found.sha,
  });
}

// Preserve the original URL when an administrator replaces an existing newsletter.
export async function githubReplacePdf(repoPath, bytes, title) {
  const found = await githubContents('GET', repoPath);
  if (!found?.sha || found.type !== 'file') {
    const error = new Error('Original PDF not found in GitHub.'); error.status = 409; throw error;
  }
  return githubContents('PUT', repoPath, {
    message: `content(newsletter): replace ${title}`.slice(0, 180),
    content: Buffer.from(bytes).toString('base64'),
    sha: found.sha,
  });
}
