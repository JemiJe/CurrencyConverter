Currency converter app<br>

- dynamically converting values in one currency to another on input and currency code changing
- in header is showing current UAH rates to USD and EUR
- markup is mobile responsive
- for api is used https://app.exchangerate-api.com/
- to add/remove currency configure `global-vars.ts` > `codes`

```typescript
export const codes: Array<string> = ["UAH", "EUR", "USD", "GBP", "JPY"];
```
