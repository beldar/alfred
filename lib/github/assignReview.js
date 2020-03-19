module.exports = (link, username, token) => {
    const url = link.replace('github.com', 'api.github.com') + '/requested_reviewers'
    return fetch({
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${token}`,
        },
        body: JSON.stringify({
            reviewers: [username]
        }),
    })
}
