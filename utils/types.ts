export const templates: string[] = ['empty', 'nemt'];

export type Args = string[];
export type Template = typeof templates[number];
export type RawOptions = {
    git: boolean;
    install: boolean;
    skipPrompts: boolean;
    template?: Template;
    dirName: string
};
export type Options = Omit<RawOptions, 'skipPrompts'> & {
    template: Template;
};