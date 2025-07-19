const fs = require('node:fs/promises');

async function resetPosts() {
    console.log("Resetting posts to default")
    const rawFileContent = await fs.readFile('../defaultPosts.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    console.log("Default data: ")
    console.log(data)
    return await fs.writeFile('../posts.json', JSON.stringify({ posts: data.posts || [] }));
}

resetPosts()