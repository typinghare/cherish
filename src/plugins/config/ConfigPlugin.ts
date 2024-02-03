import { Plugin } from '../../core'
import { ConfigExecutor } from './ConfigExecutor'

/**
 * Config plugin.
 */
export class ConfigPlugin extends Plugin {
    public override initExecutors(): void {
        this.registerExecutor(new ConfigExecutor())
    }
}
