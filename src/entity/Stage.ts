/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class Stage
 */
export class Stage {
    private readonly id: string;
    private name: string;
    private order: number;

    constructor(name: string, order: number) {
        this.name = name;
        this.order = order;
    }

    public getName(): string {
        return this.name;
    }

    public getOrder(): number {
        return this.order;
    }

    public changeOrder(order: number): void {
        this.order = order;
    }

    public rename(name: string): void {
        this.name = name;
    }
}
