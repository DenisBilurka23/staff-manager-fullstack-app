import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Employee.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      departmentId: DataTypes.INTEGER,
      salary: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
