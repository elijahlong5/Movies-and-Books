export class Sorter{
  // Reverse is true if the sorter only needs to reverse the list.
  private reversed: boolean;
  private activeSort: string;
  constructor() {
    this.reversed = false;
    this.activeSort = '';
  }
  reverseManager(sortName) {
    if (sortName !== this.activeSort) {
      // Sorting a new way
      this.reversed = false;
      this.activeSort = sortName;
    } else {
      // Sorting the same way, just reversed.
      this.reversed = true;
    }
  }

  sort(listToSort, sortBy){
    /** Can sort a list by:
     * String
     * Boolean
    * */
    // Just return reversed list if that's all that needs to happen.
    this.reverseManager(sortBy);
    if (this.reversed){ return listToSort.reverse(); }

    // Assuming that the list has at least one element in it.
    // Assuming all elements are the same type.
    let sortType = typeof listToSort[0][sortBy];

    // If here, then we've determined we need to sort by a new feature.
    // Sorts string attrs with localeCompare.
    if(sortType === "string") {
      return listToSort.sort(function(a, b) {
        return a[sortBy].localeCompare(b[sortBy]);
      });
    } else if (sortType === 'boolean') {
      return listToSort.sort(function(a, b) {
        return (a[sortBy] === b[sortBy])? 0 : a[sortBy]? -1 : 1;
      });
    }


  }

}

const sorter = new Sorter();
