# Type system

## Install
```bash
npm i --save @web-dev-memo/type-system
```

## Usage

```ts
import TypeSystem from "@web-dev-memo/type-sytem";

const typeSystem = new TypeSystem(
    {
        name: "String",
        is: (value: unknown) => typeof value === "string"
    },
    {
        name: "Marcus",
        is: (value: string) => value.toLowerCase() === "marcus",
        subFor: ["String"]
    }
);

console.log(typeSystem.typeof("some test")); // "String"
console.log(typeSystem.typeof("some test")); // "Marcus"
```

### Type definition
Type has next interface

```ts
export interface IType {
    name: string;
    is: (value: unknown, path?: string[]) => boolean;
    subFor?: string[]
}
```

| Name   | Required | Definition                  |
|--------|----------|-----------------------------|
| name   | true     | Name of type                |
| is     | true     | Function for checking type  |
| subFor | false    | Array of parent type name   |

### subFor
This property is required to determine the relationship to the parent type. Thus this type will be checked only if the parent type passes the check.

