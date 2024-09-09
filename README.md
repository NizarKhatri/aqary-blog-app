1. Clone the repository using url `https://github.com/NizarKhatri/aqary-blog-app.git` 
2. Checkout main branch.
3. Create a `.env` file. Add `BASE_URL=https://jsonplaceholder.typicode.com` in .env file.
4. Run the command `npm install` to install the project dependencies.
5. Run the command `npm run dev` to start the project locally on port `3000`.
6. Open Google Chrome in an Incognito window to avoid using cached data.
7. Navigate to `http://localhost:3000` in the browser. You should see a list of posts fetched from the JSONPlaceholder POSTS API.
8. A table will be shown contains `Post Title` and `Post Body`. 
9. Click on a `Post Title` to view the post details page.
10. On Post Details Page. You should see `Post Title`, `Post Body` and below them `Post Comments` coming from JSONPlaceholder `POST` and `COMMENT` API.
11. To run the unit tests, use the command `npm run test`.
