
export interface PositionStrategy {
    apply(element: Element): Promise<void>;

    dispose(): void;
}
