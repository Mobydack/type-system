import { forEach, difference } from "lodash/fp";
import { IType, ITypePresentation } from "./types";

class TypeSystem {
    public static readonly ROOT = "ROOT";

    private readonly root = {
        name: TypeSystem.ROOT,
        is: () => false,
        sub: new Set<IType>()
    };
    private readonly types = new Map<IType["name"], IType>();

    constructor(...types: ITypePresentation[]) {
        forEach<ITypePresentation>(
            type => this.link(type.name, ...TypeSystem.getSubFor(type)),
            forEach(type => this.defineType(type), types)
        );
    }

    public typeof(value: unknown): IType["name"] | undefined {
        return this.typeofRecursive(value, this.root, [TypeSystem.ROOT]);
    }

    private defineType(typePresentation: ITypePresentation): void {
        const { name, is } = typePresentation;
        const definedType = this.types.get(name) || {
            name,
            is,
            sub: new Set<IType>()
        };

        definedType.name = name;
        definedType.is = is;

        this.types.set(name, definedType);
    }

    private link(name: IType["name"], ...types: IType["name"][]): void {
        const typePresentation = this.types.get(name)!;

        forEach(type => {
            if (type === TypeSystem.ROOT) {
                this.root.sub.add(typePresentation);

                return;
            }

            const parentType = this.types.get(type);

            if (parentType) {
                parentType.sub.add(typePresentation);
            }
        }, types);
    }

    private static getSubFor({ subFor }: ITypePresentation): string[] {
        if (subFor?.length) {
            return subFor;
        }

        return [TypeSystem.ROOT];
    }

    private typeofRecursive(
        value: unknown,
        type: IType,
        path: IType["name"][]
    ): IType["name"] | undefined {
        const isCurrentType = type.is(value, path);

        if (!isCurrentType && type.name !== TypeSystem.ROOT) {
            return;
        }

        const sub = [...type.sub.values()];

        for (const subTypeName of difference(
            sub.map(({ name }) => name),
            path
        )) {
            const resultType = this.typeofRecursive(
                value,
                this.types.get(subTypeName)!,
                [...path, subTypeName]
            );

            if (resultType) {
                return resultType;
            }
        }

        return type.name === TypeSystem.ROOT ? undefined : type.name;
    }
}

export default TypeSystem;
