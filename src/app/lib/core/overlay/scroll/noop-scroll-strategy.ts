import { ScrollStrategy } from './scroll-strategy';

export class NoopScrollStrategy implements ScrollStrategy {
    enable() {}
    disable() {}
    attach() {}
}
