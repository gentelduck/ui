import { PromptObject } from 'prompts'
import { highlighter } from '../../text-styling'

export const typescript_prompts: PromptObject<'typescript'>[] = [
  {
    type: 'confirm',
    name: 'typescript',
    message: `Would you like to install ${highlighter.info('TypeScript')} (recommended)`,
    initial: false,
    active: 'yes',
    inactive: 'no',
  },
]

export const typescript_dependencies = ['typescript']

export const ts_config = `{
  "compilerOptions": {
    "target": "es6", // Target ECMAScript version
    "module": "commonjs", // Module system used in Node.js
    "lib": ["dom", "es6", "dom.iterable", "scripthost"], // Standard library
    "jsx": "react-jsx", // JSX support for React
    "outDir": "./dist", // Output directory for compiled files
    "rootDir": "./src", // Root directory of source files
    "strict": true, // Enable strict type checking
    "moduleResolution": "node", // Module resolution strategy
    "esModuleInterop": true, // Allow default imports from CommonJS
    "skipLibCheck": true, // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true, // Enforce consistent file naming
    "resolveJsonModule": true, // Support importing JSON files
    "allowSyntheticDefaultImports": true, // Synthetic default imports for compatibility
    "baseUrl": ".", // Base directory for module resolution
    "paths": {
      "~/*": ["./src/*"] // Define path aliases
    }
  },
  "include": ["src"], // Include all source files in the src directory
  "exclude": ["node_modules", "dist", "tests"] // Exclude directories from compilation
}
`
