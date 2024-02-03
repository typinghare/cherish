import { OptionTemplate } from './OptionTemplate'

/**
 * An option.
 */
export class Option {
    /**
     * Creates an option.
     * @param template The template making this option.
     * @param args The arguments.
     */
    public constructor(
        public readonly template: OptionTemplate,
        public readonly args: string[]
    ) {}
}
