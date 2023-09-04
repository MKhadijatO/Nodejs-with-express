class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //   filter() {
  //     let queryString = JSON.stringify(this.queryStr);
  //     queryString = queryString.replace(
  //       /\b(gte|gt|lte|lt)\b/g,
  //       (match) => `$${match}`
  //     );
  //     const queryObj = JSON.parse(queryString);

  //     this.query = this.query.find(queryObj);

<<<<<<< HEAD
        this.query = this.query.find(queryObj);
=======
  //     return this;
  //   }
>>>>>>> 820e81a (Modified code)

  filter() {
    // Create a query object to store the filter criteria
    const queryObj = { ...this.queryStr };

<<<<<<< HEAD
    sort() {
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query.sort('-createdAt');
=======
    // Exclude fields that are not meant for filtering
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Handle numeric fields differently
    const numericFields = ["releaseYear"]; // Add more numeric fields as needed
    for (const key in queryObj) {
      if (queryObj.hasOwnProperty(key)) {
        if (numericFields.includes(key)) {
          // Handle numeric fields
          queryObj[key] = parseInt(queryObj[key]); // Convert the value to an integer
        } else {
          // Handle string fields with case-insensitive search
          queryObj[key] = { $regex: new RegExp(queryObj[key], "i") };
>>>>>>> 820e81a (Modified code)
        }
      }
    }

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      const sortObj = JSON.parse(`{ "${sortBy}": 1 }`); // Convert sortBy to an object
      this.query = this.query.sort(sortObj);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      const fieldsObj = JSON.parse(`{ "${fields}": 1 }`); // Convert fields to an object
      this.query = this.query.select(fieldsObj);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
