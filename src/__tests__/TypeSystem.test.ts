import TypeSystem from "../TypeSystem";

describe("type-system", () => {
    test("Type system was created", () => {
        expect(() => new TypeSystem()).not.toThrow();
    });

    test("Type is checked", () => {
        const typeSystem = new TypeSystem({
            name: "A",
            is: () => true
        });

        expect(typeSystem.typeof("some value")).toBe("A");
    });

    test("Created a subtype", () => {
        const typeSystem = new TypeSystem(
            {
                name: "String",
                is: (value: unknown) => typeof value === "string"
            },
            {
                name: "ABBA",
                is: (value: string) => value.toLowerCase() === "abba",
                subFor: ["String"]
            }
        );

        expect(typeSystem.typeof("AbBa")).toBe("ABBA");
    });

    test("Created deep subtype", () => {
        const typeSystem = new TypeSystem(
            {
                name: "String",
                is: (value: unknown) => typeof value === "string"
            },
            {
                name: "M",
                is: (value: string) => /marcus/gi.test(value),
                subFor: ["String"]
            },
            {
                name: "MA",
                is: (value: string) =>
                    value.toLowerCase() === "marcus aurelius",
                subFor: ["M"]
            }
        );

        expect(typeSystem.typeof("MarCus Aurelius")).toBe("MA");
    });

    test("Subtypes for an undefined types isn't checked", () => {
        const typeSystem = new TypeSystem({
            name: "ABBA",
            is: (value: string) => value.toLowerCase() === "abba",
            subFor: ["String"]
        });

        expect(typeSystem.typeof("AbBa")).toBeUndefined();
    });

    test("Cyclic types exit from recursion", () => {
        const typeSystem = new TypeSystem(
            {
                name: "String",
                is: (value: unknown) => typeof value === "string"
            },
            {
                name: "M",
                is: (value: string) => /marcus/gi.test(value),
                subFor: ["MA", "String"]
            },
            {
                name: "MA",
                is: (value: string) =>
                    value.toLowerCase() === "marcus aurelius",
                subFor: ["M"]
            }
        );

        expect(typeSystem.typeof("MarCus Aurelius")).toBe("MA");
    });

    test("Empty type returned undefined value", () => {
        const typeSystem = new TypeSystem();

        expect(typeSystem.typeof(1)).toBeUndefined();
    });

    test("Отсутствие типа возвращает undefined", () => {
        const typeSystem = new TypeSystem({
            name: "A",
            is: (value: unknown) => value === 1
        });

        expect(typeSystem.typeof(2)).toBeUndefined();
    });
});
