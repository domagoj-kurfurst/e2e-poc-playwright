## Playwright process

**Install Playwright**

```
yarn add -D @playwright/test
```

**Install the necessary browsers:**

```
yarn playwright install
```

**Create folder for tests and test file**
```
mkdir tests
touch tests/page.test.js
```

**Run the Next.js development server:**
```
yarn dev
```

**Run test**
```
yarn playwright test
```
or if you want to see on browser 

```
yarn playwright test --headed
```