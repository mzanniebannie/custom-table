export class Sort {
  private sortOrder = 1;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  constructor() {}

  public startSort(property: string, order: string, type: string) {
    switch (order) {
      case 'desc':
        this.sortOrder = -1;
        break;
      case 'asc':
        this.sortOrder = 1;
        break;
      default:
        this.sortOrder = 0;
        break;
    }

    return (a: any, b: any) => {
      if (type === 'date') {
        return this.sortData(
          new Date(this.getPropByString(a, property)),
          new Date(this.getPropByString(b, property))
        );
      } else {
        return (
          this.collator.compare(
            this.getPropByString(a, property),
            this.getPropByString(b, property)
          ) * this.sortOrder
        );
      }
    };
  }

  private sortData(a: any, b: any) {
    if (a < b) {
      return -1 * this.sortOrder;
    } else if (a > b) {
      return 1 * this.sortOrder;
    } else {
      return 0 * this.sortOrder;
    }
  }

  getPropByString(obj: any, propString: string) {
    if (!propString) return obj;

    var prop,
      props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];

      var candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
  }

  getNextSort(sort: string): string {
    switch (sort) {
      case 'none':
        return 'asc';
      case 'asc':
        return 'desc';
      case 'desc':
        return 'none';
    }
    return 'none';
  }
}
