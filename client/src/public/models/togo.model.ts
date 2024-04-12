export class TogoPlace {
  constructor(
    public _id?: string,
    public isVisited?: boolean,
    public name?: string,
    public category?: string,
    public cuisine?: string,
    public description?: string,
    public price?: number,
    public location?: string,
    public lastUpdatedWhen?: Date
  ) {}
}
