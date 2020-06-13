/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class Stage
 */
import { Exclude, Expose } from "class-transformer";

export class Stage {
    @Exclude()
    private readonly id: string;

    @Exclude()
    private name: string;

    @Exclude()
    private order: number;

    constructor(name: string, order: number) {
        if(typeof name !== "string") {
            throw new Error("stage name is not a string");
        }
        if(typeof order !== "number") {
            throw new Error("stage order is not a number");
        }

        this.name = name;
        this.order = order;
    }

    @Expose({name: "id"})
    public getId() {
        return this.id;
    }

    @Expose({name: "name"})
    public getName(): string {
        return this.name;
    }

    @Expose({name: "order"})
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
