export declare const CategoryService: {
    createCategory: (name: string) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    getCategories: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map