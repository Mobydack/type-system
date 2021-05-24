type TypeName = string;
type TypeIs = (value: any, path?: TypeName[]) => boolean;

export interface IType {
    name: TypeName;
    is: TypeIs;
    sub: Set<IType>;
}

export interface ITypePresentation {
    name: TypeName;
    is: TypeIs;
    subFor?: TypeName[];
}
