# Minimal reproduction of parameters not being forwarded by redirects in Netlify

## Environment

- Node: 18.16.0
- netlify-cli: 15.1.0
- @netlify/functions: 1.6.0

`npm i && npm run dev`

## Expected Result:

---

When redirecting based on query parameters - the final "to"'s query should be returned in the function's event, not the initial query parameters. Behaviour is different between netlify dev and deployed site.

## Reproduction:

---

- /api-issue (Hard coded redirect to have `param1=hello` and does not have redirect look at query parameter `param1`)
- /api-issue-2 (Hard coded redirect to have `param1=hello` but have redirect look at query parameter `param1`)
- /api-workaround (Redirect to /api-issue-2 with 301 so param1 is read)

**Local (Netlify Dev - `npm run dev`)**

✅ **Baseline** - http://localhost:8888/.netlify/functions/params?param1=goodbye&param2=world

- Returns `{ param1: "goodbye", param2 : "world" }`

✅ http://localhost:8888/api-issue?param2=world

- Returns `{ param1: "hello", param2 : "world" }`

✅ http://localhost:8888/api-issue?param1=goodbye&param2=world

- Returns `{ param1: "hello", param2 : "world" }`

✅ http://localhost:8888/api-issue-2?param1=goodbye&param2=world

- Returns `{ param1: "hello", param2 : "world" }`

✅ http://localhost:8888/api-workaround?param2=world

- Redirects to /api-issue-2 to returns `{ param1: "hello", param2 : "world" }`

**Deployed ([Deploy 646293abec3e900008fb63dc](https://app.netlify.com/sites/idyllic-klepon-2e3f78/deploys/646293abec3e900008fb63dc))**

✅ **Baseline** - https://idyllic-klepon-2e3f78.netlify.app/.netlify/functions/params?param1=goodbye&param2=world

- Returns `{ param1: "goodbye", param2 : "world" }`

❌ https://idyllic-klepon-2e3f78.netlify.app/api-issue?param2=world

- Missing `param1`
- Returns `{ param2 : "world" }`

❌ https://idyllic-klepon-2e3f78.netlify.app/api-issue?param1=goodbye&param2=world

- Incorrect `param1` - should be `hello`
- Returns `{ param1: "goodbye", param2 : "world" }`

❌ https://idyllic-klepon-2e3f78.netlify.app/api-issue-2?param1=goodbye&param2=world

- Incorrect `param1` - should be `hello`
- Returns `{ param1: "goodbye", param2 : "world" }`

✅ https://idyllic-klepon-2e3f78.netlify.app/api-workaround?param2=world

- Redirects to /api-issue-2 to returns `{ param1: "hello", param2 : "world" }`
