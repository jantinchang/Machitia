class Schema {
  /**
   * @param validator is a Validation description object
   * @param idSelector  {string=} [not required] is the name of the property in the model that hold the Id of the given entity
   * @param entityTypeId {number=} [not required] is the TypeId of the given entity
   */
  constructor(validator, idSelector, entityTypeId) {
    this.validator = validator;
    this.idSelector = idSelector;
    this.entityTypeId = entityTypeId;
  }

  /**
   *
   * @param {object} model the model to validate
   * @param {*} options
   */
  validate(model, options) {
    return this.validator.validate(model, options);
  }
}

module.exports = Schema;
