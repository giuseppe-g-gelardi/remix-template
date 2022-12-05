// This is a simple context example
// 
// The TestProvider is used in the root.tsx file to wrap the entire app
// The useTestContext hook is used in any component to access the context

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type InitialContext = { hello: string }
const initialContext = { hello: 'world' }
export const TestContext = createContext<InitialContext>(initialContext);
export const useTestContext = () => useContext(TestContext);

export const TestProvider = ({ children }: { children: ReactNode }) =>
  <TestContext.Provider value={initialContext}>
    {children}
  </TestContext.Provider>
