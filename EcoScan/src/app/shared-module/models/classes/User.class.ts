export class User {
  constructor(
    public userID: string | undefined,
    public firstName: string,
    public lastName: string,
    public pseudo: string,
    public email: string,
    public points: number,
    public isAdmin: boolean = false
  ) {}

  public getIsAdmin(): boolean {
    return this.isAdmin;
  }
  public getPoints(): number {
    return this.points;
  }
  public setPoints(value: number) {
    this.points = value;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(value: string) {
    this.email = value;
  }
  public getFirstName(): string {
    return this.firstName;
  }
  public setFirstName(value: string) {
    this.firstName = value;
  }
  public getLastName(): string {
    return this.lastName;
  }
  public setLastName(value: string) {
    this.lastName = value;
  }
  public getPseudo(): string {
    return this.pseudo;
  }
  public setPseudo(value: string) {
    this.pseudo = value;
  }
  public getUserID(): string {
    return this.userID as string;
  }
  public setUserID(value: string) {
    if (!this.userID) {
      this.userID = value;
    }
  }
}
