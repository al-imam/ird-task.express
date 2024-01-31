import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export interface SubCategoryModel extends Model<InferAttributes<SubCategoryModel>, InferCreationAttributes<SubCategoryModel>> {
  id: CreationOptional<number>,
  cat_id: number,
  subcat_id: number,
  subcat_name_bn: string,
  subcat_name_en: string,
  no_of_dua: number,
}

export function getSubCategory(sequelize: Sequelize) {
  return sequelize.define<SubCategoryModel>('SubCategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cat_id: DataTypes.INTEGER,
    subcat_id: DataTypes.INTEGER,
    subcat_name_bn: DataTypes.TEXT,
    subcat_name_en: DataTypes.TEXT,
    no_of_dua: DataTypes.INTEGER,
  }, { timestamps: false });
}
