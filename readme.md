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

Note: All fields are required
Gender can either be male, female or others, after regstering, users should be directed to te login page.

- Login: Login endpoint is /api/auth/login, Method is post and its exprcting the JSON data;

```
{"username":"devadedeji", "password":"myPassword"}
```

Note: All fields are required
The response includes a token which will be used for authentication and authorization
