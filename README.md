# Node

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/ZenHuzaini/node-js-news-fetcher/)

Node Note Version is a simple backend app that provides a possibility for user to create a note.

# Features

Main Features:

- Create Note
- Read Note
- Update Note
- Delete Note
- Create and See versions of note
- Keep deleted note

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run watch //for development
```

For production environments...

- we need to create .env file with the following keywords

```sh
MONGO_CONNECTION=
PORT=
```

- MONGO_CONNECTION can use mongodb Atlas or mongodb local

#### Tests

Integration test

```sh
$ npm run integration-test
```

Unit test

```sh
$ npm run test
```

### APIs

| API          | DETAILS                                          |
| ------------ | ------------------------------------------------ |
| GET api/note | to get all note. Deleted Notes will not be shown |

- example request:

- example response :

```sh
{
    "status": "Operation has been successfully performed",
    "data": [
        {
            "_id": "5f831ab6d261d820ac6635f1",
            "content": "zen",
            "title": "huzaini",
            "createdAt": "2020-10-11T14:46:14.076Z",
            "updatedAt": "2020-10-11T14:46:14.076Z",
            "__v": 0
        }
    ]
}
```

---

| API                | DETAILS                        |
| ------------------ | ------------------------------ |
| GET api/note/:\_id | to return note based on the id |

- example request:

```sh
 localhost:4000/api/note/5f831ab6d261d820ac6635f1
```

- example response :

```sh
{
    "status": "Operation has been successfully performed",
    "data": [
        {
            "_id": "5f831ab6d261d820ac6635f1",
            "content": "lukasz",
            "title": "bujlo",
            "createdAt": "2020-10-11T14:46:14.076Z",
            "updatedAt": "2020-10-11T14:46:14.076Z",
            "__v": 0
        }
    ]
}
```

---

| API           | DETAILS        |
| ------------- | -------------- |
| POST api/note | to create note |

- example request:

```sh
  {
    "content": "zeen",
    "title": "huz"
}
```

- example response :

```sh
{
    "status": "Operation has been successfully performed",
    "data": {
        "deleted": false,
        "_id": "5f864770324d433310676a42",
        "content": "zeen",
        "title": "huz",
        "createdAt": "2020-10-14T00:33:52.516Z",
        "updatedAt": "2020-10-14T00:33:52.516Z",
        "__v": 0
    }
}
```

---

| API                | DETAILS        |
| ------------------ | -------------- |
| PUT api/note/:\_id | to update note |

- example request:

```sh
{
    "content":"change content",
    "title": "change title..."
}
```

- example response :

```sh
{
    "status": "Operation has been successfully performed",
    "data": {
        "deleted": false,
        "_id": "5f831ab6d261d820ac6635f1",
        "content": "zeen",
        "title": "huz",
        "createdAt": "2020-10-11T14:46:14.076Z",
        "updatedAt": "2020-10-11T14:46:14.076Z",
        "__v": 0
    }
}
```

---

| API                   | DETAILS        |
| --------------------- | -------------- |
| DELETE api/note/:\_id | to delete note |

- example request:

```sh
http://localhost:4000/api/note/5f831ab6d261d820ac6635f1
```

- example response :

```sh
{
    "status": "Operation has been successfully performed",
    "data": "the note has been removed!"
}
```

---

| API                  | DETAILS           |
| -------------------- | ----------------- |
| GET api/deletedNotes | get deleted notes |

- example request:

```sh
http://localhost:4000/api/deletedNotes
```

- example response :

```sh
{
    "status": "Operation has been successfully performed",
    "data": [
        {
            "_id": "5f831a8ed261d820ac6635ee",
            "content": "zebbbbbbbbbbbbbbbbbbbbbssssbbbbbbbbn malik",
            "title": "huz mabbbbblik...",
            "createdAt": "2020-10-11T14:45:34.474Z",
            "updatedAt": "2020-10-11T15:01:23.718Z",
            "__v": 0
        },
        ...
    ]
}
```

---

| API                  | DETAILS                        |
| -------------------- | ------------------------------ |
| GET api/noteVersions | get all notes with its version |

- example request:

```sh
http://localhost:4000/api/noteVersion
```

- example response :

```sh

```

---

| API                        | DETAILS               |
| -------------------------- | --------------------- |
| GET api/noteVersions/:\_id | to get 1 note version |

- example request:

```sh
http://localhost:4000/api/noteVersion/jwhefvhwefbkwu4567389
```

- example response :

```sh
{
    "status": "Operation has been successfully performed",
    "data": [
        {
            "_id": "5f831a8ed261d820ac6635ef",
            "noteRefference": "5f831a8ed261d820ac6635ee",
            "data": [
                {
                    "version": 0,
                    "_id": "5f831a8ed261d820ac6635f0",
                    "content": "zen huzaini",
                    "title": "yooh",
                    "modifiedDate": "2020-10-11T14:45:34.729Z"
                },
                {
                    "version": 1,
                    "_id": "5f831c2e8b44be2cb435b8e2",
                    "content": "zebbbbbbbbbbbbbrehebbbbbbbbbbbbbbbbn malik",
                    "title": "huz mabbbbblik...",
                    "modifiedDate": "2020-10-11T14:52:30.427Z"
                },
                {
                    "version": 2,
                    "_id": "5f831e438b44be2cb435b8e3",
                    "content": "srh malik",
                    "title": "huz mabbbbblik...",
                    "modifiedDate": "2020-10-11T15:01:23.757Z"
                }
            ],
            "__v": 0
        }
    ]
}
```

#### Deployment

This sevice has been deployed to heroku

```sh
https://node-js-note-versions.herokuapp.com/
```

feel free to use it

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dill]: https://github.com/joemccann/dillinger
[git-repo-url]: https://github.com/joemccann/dillinger.git
[john gruber]: http://daringfireball.net
[df1]: http://daringfireball.net/projects/markdown/
[markdown-it]: https://github.com/markdown-it/markdown-it
[ace editor]: http://ace.ajax.org
[node.js]: http://nodejs.org
[twitter bootstrap]: http://twitter.github.com/bootstrap/
[jquery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[gulp]: http://gulpjs.com
[pldb]: https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md
[plgh]: https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md
[plgd]: https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md
[plod]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[plme]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[plga]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
