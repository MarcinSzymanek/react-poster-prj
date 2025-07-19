const api_url = 'http://localhost:8080/'
const post_url = api_url + 'posts'

const getRequest = {
    method: 'GET',
}

export async function submitPost(postData) {
    const failResult = { result: false, data: null }
    if (postData === null) return failResult
    if (
        postData.author === null ||
        postData.author === '' ||
        postData.content === null ||
        postData.content === ''
    )
        return failResult

    const body = JSON.stringify(postData)
    const url_string = api_url + 'posts'
    const req = {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let success = false
    await fetch(url_string, req)
        .then((resp) => {
            console.log('fetch resp: %s: %s', resp.status)
            if (resp.status == 201) success = true
            success = false
            return resp.json()
        })
        .then((data) => console.log(data.post))

    return success
}

export async function getPosts() {
    const url_string = api_url + 'posts'

    let success = false

    let postList = await fetch(url_string, getRequest).then((resp) => {
        console.log('fetch resp: %s', resp.status)
        if (resp.status == 200) success = true
        else success = false
        return resp.json()
    })

    console.log(postList)
    return { result: success, data: postList }
}

export async function getPost(id) {
    const url_string = post_url + '/' + id

    let success = false

    let post = await fetch(url_string, getRequest).then((resp) => {
        console.log('fetch single: %s', resp.status)
        if (resp.status == 200) success = true
        return resp.json()
    })

    console.log(post)
    return { result: success, data: post }
}
