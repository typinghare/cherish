import { Plugin } from '../../plugin/Plugin'
import { ConfigExecutor } from './ConfigExecutor'

/**
 * Config plugin.
 */
export class ConfigPlugin extends Plugin {
    public override initExecutors(): void {
        this.registerExecutor(new ConfigExecutor())
    }
}
