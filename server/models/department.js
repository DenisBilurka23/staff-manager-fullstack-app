import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      models.Department.hasMany(models.Employee, {
        as: "employees",
        foreignKey: "departmentId",
      });
    }
  }

  Department.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};
