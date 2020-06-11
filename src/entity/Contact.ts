/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class Contact
 */
export class Contact {
    private readonly title: string;
    private readonly channel: string;
    private readonly value: string;

    constructor(title: string, channel: string, value: string) {
        this.title = title;
        this.channel = channel;
        this.value = value;
    }

    public getTitle() {
        return this.title;
    }

    public getChannel() {
        return this.channel;
    }

    public getValue() {
        return this.value;
    }
}
