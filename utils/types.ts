export const templates = ['javascript', 'typescript'] as const;

export type Args = string[];
export type Template = typeof templates[number];
export type RawOptions = {
    git: boolean;
    install: boolean;
    skipPrompts: boolean;
    template?: Template;
};
export type Options = Omit<RawOptions, 'skipPrompts'> & {
    template: Template;
};