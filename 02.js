async function login() {
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  const token = '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';
  const owner = 'hajrateali';
  const repo = 'DataStore';
  const path = 'data.json';

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // Step 1: Pehle file ko read karo (get SHA)
  const getRes = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    }
  });

  let content = [];
  let sha = null;

  if (getRes.ok) {
    const data = await getRes.json();
    content = JSON.parse(atob(data.content));
    sha = data.sha;
  }

  // Step 2: New data add karo
  content.push({ email, password });

  // Step 3: Update JSON file
  const updateRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: 'Add login data',
      content: btoa(JSON.stringify(content, null, 2)),
      sha: sha
    })
  });

  if (updateRes.ok) {
    alert("Login data saved!");
  } else {
    alert("Error saving data.");
  }
}