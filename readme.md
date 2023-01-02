# Linkbum

Linkbum is a platform where users can add all their links to one shareable link. Got the idea from linktr.ee

## FEATURES

- Authentication (Registration and Login)
- Add links, update a link, delete a link
- Update bio, account information, profile picture

## Live link

- https://linkbum.cyclic.app

## Endpoints

- Register: Endpoint is /api/auth/register, Method is post and it's expecting the JSON data;

```
{"username":"devadedeji", "email":"sample@gmail.com", "password":"myPassword", "gender":"male"}
```

Note: All fields are required.
Gender can either be male, female or others, after regstering, users should be directed to te login page.

- Login: Login endpoint is /api/auth/login, Method is post and its expecting the JSON data;

```
{"username":"devadedeji", "password":"myPassword"}
```

Note: All fields are required.
The response includes a token which will be used for authentication and authorization

- Get user details: Endpoint is /api/user/:username

* Get logged in user details: Endpoint is /api/user/me/details, send the token as authorization in the request header

* Update user details: Endpoint is /api/user/me, send JSON data;

```
{"username":"devadedeji", "email":"sample@gmail.com", "gender":"male", "bio": "Hi, I'm a software engineer"}
```

- Add a new link: Endpoint is /api/link/post, expecting the json data with token as authorization in the request header;

```
{"title":"My Link", "link":"https://mylink.com"}
```

- Updating a link: Endpoint is /api/link/post/:id, Method is PUT, and id is the id of the link, expecting the json data with token as authorization in the request header;

```
{"title":"My Link", "link":"https://mylink.com"}
```

- Updating a link: Endpoint is /api/link/post/:id, Method is DELETE, and id is the id of the link to be deleted
