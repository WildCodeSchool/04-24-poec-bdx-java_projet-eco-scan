export class User {
    constructor(
        private _userID: string,
        private _name: string,
        private _email: string,
        private _points: number,
        private _isAdmin: true
    ) {}

    public get isAdmin(): true {
        return this._isAdmin;
    }
    public get points(): number {
        return this._points;
    }
    public set points(value: number) {
        this._points = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get userID(): string {
        return this._userID;
    }
}