export class overlay {
    id: number = 0;
    message: string = '';
    icon: string = '';
    removeable: boolean = false;

    constructor(id: number, message: string, icon: string, removeable: boolean) {
        this.id = id;
        this.message = message;
        this.icon = icon;
        this.removeable = removeable;
    }
}