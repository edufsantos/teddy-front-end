# Architectural Decision Record (ADR): Use of Zustand for State Management

## Context

To manage application state efficiently while keeping the codebase simple and performant, we decided to use **Zustand** as the state management solution. Zustand is a minimalistic, scalable, and flexible alternative to other state management libraries like Redux or Context API.

## Decision

**Date**: 24/03/2025

The application will use **Zustand** as the primary state management library due to the following reasons:

- **Lightweight**: Zustand has a small bundle size and minimal boilerplate.
- **Simplicity**: The API is straightforward and does not require complex setup like reducers or actions.
- **Performance**: Zustand efficiently updates state without unnecessary re-renders.
- **Scalability**: Supports both small and large applications with ease.
- **React Hooks Compatibility**: Easily integrates with React functional components via hooks.

## Implementation

### Installation

To install Zustand, run the following command:

```sh
pnpm add zustand
```

or

```sh
yarn add zustand
```

### Usage

To create a store using Zustand, define a state and actions:

```tsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

function Counter() {
  const { count, increase, decrease } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
}
```

### Best Practices

- Use **selectors** when subscribing to avoid unnecessary re-renders:

```tsx
const count = useStore((state) => state.count);
```

- Keep stores **modular** and split state logic when necessary.
- Avoid using Zustand for **form state** or **transient UI state**, which can be managed locally.

## Status

**Accepted**

## Consequences

- All global and shared state should be implemented using **Zustand**.
- Developers must follow the established best practices for managing state.
- Any future decisions regarding state management should consider **Zustand** as the default option before exploring alternatives.
