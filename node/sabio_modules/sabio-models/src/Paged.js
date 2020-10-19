class Paged {
  constructor(data, pageIndex, pagesize, totalCount) {
    this.pageIndex = pageIndex;
    this.pageSize = pagesize;
    this.pagedItems = data;

    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount / pagesize);

    this.hasPreviousPage = this.pageIndex > 0;

    this.hasNextPage = this.pageIndex + 1 < this.totalPages;
  }
}

module.exports = Paged;
