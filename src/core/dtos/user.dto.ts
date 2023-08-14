export class CUserDTO {
  private role: string;
  private uuid: string;

  constructor(model: any) {
    this.role = model.role;
    this.uuid = model.uuid;
  }
}
