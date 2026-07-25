# Harsha's

An e-commerce storefront for everyday essentials — groceries, kitchen, beauty,
fashion and sports gear — with every product priced under ₹20,000.

**Live:** https://harshu.vercel.app

## Features

- **Catalog** — browse all products, filter by category, sort by price and rating
- **Search** — search by product name, falling back to category matches
- **Product detail** — image gallery, ratings, reviews and related products
- **Cart** — add, remove and change quantities, with a running total; no sign-in needed
- **Wishlist** — save products for later (requires sign-in)
- **Account** — profile and default delivery address
- **Dark mode** — persisted across sessions
- **Responsive** — mobile, tablet and desktop layouts

## Tech stack

| Layer     | Choice                                    |
| --------- | ----------------------------------------- |
| UI        | React 18, Tailwind CSS                    |
| Language  | TypeScript                                |
| Build     | Vite 5                                    |
| State     | Redux Toolkit                             |
| Routing   | React Router 6                            |
| Data      | REST catalog API ([DummyJSON](https://dummyjson.com)) |
| Hosting   | Vercel                                    |

## Pricing

The catalog API quotes prices in USD, so [`src/utils/currency.ts`](src/utils/currency.ts)
owns all pricing rules in one place: the conversion rate, the ₹20,000 ceiling,
and `en-IN` currency formatting. Products above the ceiling are filtered out at
each fetch point, and categories left empty by that filter are hidden from the
category list rather than linking to blank pages.

## Getting started

```bash
npm install
npm run dev     # http://localhost:5173
```

Other scripts:

```bash
npm run build   # production build to dist/
npm run preview # serve the production build locally
npm run lint    # eslint
```

## Demo account

Browsing and the cart need no account. The wishlist and account pages do:

| Username | Password  |
| -------- | --------- |
| `harshu` | `mangesh` |

Authentication is checked client-side against these demo credentials — there is
no auth server behind this build. A production version would post to a backend
and store a signed token.

## Credits

UI template based on [simple-react-ecommerce](https://github.com/alim1496/simple-react-ecommerce)
by M A Alim, used under the MIT License. Rebranded, converted to INR pricing
with a price ceiling, and reworked cart/auth/account flows on top.

## License

[MIT](LICENSE).
