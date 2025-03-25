# Architectural Decision Record (ADR): Use of Zod for Schema Validation

## Context

To ensure data validation, type safety, and maintainable schemas across the application, we decided to use **Zod** as the primary schema validation library. Zod provides a declarative, TypeScript-first approach to defining and validating data structures.

## Decision

**Date**: 24/03/2025

The application will use **Zod** for schema validation due to the following reasons:

- **TypeScript-First**: Zod integrates seamlessly with TypeScript, offering static type inference.
- **Declarative & Readable**: The API allows defining validation rules in a clear and intuitive way.
- **Performance**: Zod is optimized for runtime validation with minimal overhead.
- **Composability**: Supports composition of schemas, making it easy to structure complex data validation.
- **Error Handling**: Provides detailed and user-friendly error messages for better debugging.

## Implementation

### Installation

To install Zod, run the following command:

```sh
pnpm add zod
```

or

```sh
yarn add zod
```

### Usage

To define a schema and validate data:

```tsx
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

const userData = { name: 'John', email: 'john@example.com', age: 25 };

const parsedUser = userSchema.safeParse(userData);

if (!parsedUser.success) {
  console.error(parsedUser.error.format());
} else {
  console.log('Valid data:', parsedUser.data);
}
```

### Best Practices

- Define **schemas centrally** and reuse them across different parts of the application.
- Use **`safeParse`** instead of `parse` to prevent runtime exceptions and handle errors gracefully.
- Combine Zod with **React Hook Form** or other form libraries for real-time validation.
- Leverage **Zod's refinements** and transformations to customize validation logic.

## Status

**Accepted**

## Consequences

- All new data validation logic should use **Zod**.
- Developers must ensure that API requests, forms, and data structures conform to predefined **Zod schemas**.
- Future validation needs should consider **extending Zod schemas** before introducing new validation libraries.
