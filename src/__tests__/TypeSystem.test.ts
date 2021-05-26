import TypeSystem from '../TypeSystem';

describe('type-system', () => {
    it('type system was created', () => {
        expect.assertions(1);

        expect(() => new TypeSystem()).not.toThrow();
    });

    it('type is checked', () => {
        expect.assertions(1);

        const typeSystem = new TypeSystem({
            name: 'A',
            is: () => true,
        });

        expect(typeSystem.typeof('some value')).toBe('A');
    });

    it('created a subtype', () => {
        expect.assertions(1);

        const typeSystem = new TypeSystem(
            {
                name: 'String',
                is: (value: unknown) => typeof value === 'string',
            },
            {
                name: 'ABBA',
                is: (value: string) => value.toLowerCase() === 'abba',
                subFor: ['String'],
            }
        );

        expect(typeSystem.typeof('AbBa')).toBe('ABBA');
    });

    it('created deep subtype', () => {
        expect.assertions(1);

        const typeSystem = new TypeSystem(
            {
                name: 'String',
                is: (value: unknown) => typeof value === 'string',
            },
            {
                name: 'M',
                is: (value: string) => /marcus/gi.test(value),
                subFor: ['String'],
            },
            {
                name: 'MA',
                is: (value: string) =>
                    value.toLowerCase() === 'marcus aurelius',
                subFor: ['M'],
            }
        );

        expect(typeSystem.typeof('MarCus Aurelius')).toBe('MA');
    });

    it("subtypes for an undefined types isn't checked", () => {
        expect.assertions(1);

        const typeSystem = new TypeSystem({
            name: 'ABBA',
            is: (value: string) => value.toLowerCase() === 'abba',
            subFor: ['String'],
        });

        expect(typeSystem.typeof('AbBa')).toBeUndefined();
    });

    it('cyclic types exit from recursion', () => {
        expect.assertions(1);

        const typeSystem = new TypeSystem(
            {
                name: 'String',
                is: (value: unknown) => typeof value === 'string',
            },
            {
                name: 'M',
                is: (value: string) => /marcus/gi.test(value),
                subFor: ['MA', 'String'],
            },
            {
                name: 'MA',
                is: (value: string) =>
                    value.toLowerCase() === 'marcus aurelius',
                subFor: ['M'],
            }
        );

        expect(typeSystem.typeof('MarCus Aurelius')).toBe('MA');
    });

    it('is returned undefined when type system is empty', () => {
        expect.assertions(1);

        const typeSystem = new TypeSystem();

        expect(typeSystem.typeof(1)).toBeUndefined();
    });

    it('is returned undefined when type is not found', () => {
        expect.assertions(1);

        const typeSystem = new TypeSystem({
            name: 'A',
            is: (value: unknown) => value === 1,
        });

        expect(typeSystem.typeof(2)).toBeUndefined();
    });
});
