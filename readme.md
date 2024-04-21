### Deno-Deno

Explicitly import deno interfaces to handle versioning and compatibility, while also making Deno a pollyfill when not available.

```ts
// import the Deno 1.42.1 interface, the trailing ".4" is the version of the polyfill on browsers and nodejs
import Deno from "https://deno.land/x/deno_deno@1.42.1.4/main.js"
import { readFileSync } from "https://deno.land/x/deno_deno@1.42.1.4/main.js"

Deno.exit(0)
```