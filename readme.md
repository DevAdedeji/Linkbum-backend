# Linkbum

Linkbum is a platform where users can add all their links to one shareable link. Got the idea from linktr.ee

## FEATURES

- Authentication (Registration and Login)
- Add links, update a link, delete a link
- Update bio, account information, profile picture

## Live link

- https://linkbum.cyclic.app

## Endpoints

- Login: Login endpoint is /api/auth/login, Method is post and its exprecting the JSON DATA;

```
{"username":"devadedeji", "password":"myPassword"}
```

The response includes a token which will be used for authentication and authorization
