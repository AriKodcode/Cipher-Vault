# Cipher-Vault test

ari durlacher, hermon

#

It's an app that registers users and lets them enter messages, then it encrypts them and also receives the messages decrypted.

#

To run the software you only need to enter it into the terminal for the first time.

```
npm install
```

and then.

```
npm start
```

> [or link to render](https://cipher-vault-5at3.onrender.com)

to Register User
put in url

```
/api/auth/register
```

and then Put in the body

```
{ "username": "", "password": "" }
```

to Encrypt Message

put in url

```
/api/messages/encrypt
```

ant then in the headers

```
username
password
```

and in the body

```
{ "message": "", "cipherType": "reverse" }
```

to Decrypt Message

put in url

```
/api/messages/decrypt

```

ant then in the headers

```
username
password
```

and then in the body

```
{ "messageId": ? }
```

to get my profile

put in url

```
/api/users/me
```

ant then in the headers

```
username
password
```

## goodluck
